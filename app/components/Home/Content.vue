<script
  setup
  lang="ts"
>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const items = [
  {
    id: 1,
    title: 'Stories From The Mines',
    year: 2001,
    desc: 'Emmy-nominated, nationally distributed feature-length dramatized documentary narrated by Jason Miller. Recounts the struggle between early 20th-century immigrant coal miners and American industrialists. 143 minutes.'
  },
  {
    id: 2,
    title: 'William Warren Scranton: In A Clear Light',
    year: 2004,
    desc: 'Biopic on Pennsylvania’s 38th governor, Democratic presidential candidate, and U.S. Ambassador to the UN. Broadcast statewide on Pennsylvania Public Television. 58 minutes.'
  },
  {
    id: 3,
    title: 'Looking To The River',
    year: 2005,
    desc: 'Nationally distributed feature-length documentary chronicling Pennsylvania’s longest river and its 400-year impact on the cultural and industrial evolution of the mid-Atlantic and the Chesapeake Bay. 97 minutes.'
  },
  {
    id: 4,
    title: 'A Dying Breath',
    year: 2006,
    desc: 'First-person account of how Black Lung Disease followed Pennsylvania coal miners out of the pit and devastated their lives. 58 minutes.'
  },
  {
    id: 5,
    title: 'Gino Merli: The Healing Hero',
    year: 2007,
    desc: 'Docudrama reenacting Medal of Honor recipient Gino Merli’s WWII story. 28 minutes.'
  },
  {
    id: 6,
    title: 'Barbara Weisberger: En Pointe',
    year: 2007,
    desc: 'Biopic about the founder of the Pennsylvania Ballet and the company’s influence on ballet in the United States. Broadcast statewide. 58 minutes.'
  },
  {
    id: 7,
    title: 'The Extraordinary Journey',
    year: 2007,
    desc: 'Feature-length documentary on the one million eastern Europeans who immigrated to Pennsylvania between 1900–1914, reshaping the state’s trajectory. Broadcast statewide. 104 minutes.'
  },
  {
    id: 8,
    title: 'Knoebel’s',
    year: 2015,
    desc: 'Visually rich documentary on the seven-generation history of one of America’s last family-owned amusement parks in central Pennsylvania. 58 minutes.'
  }
]
const colors = ['#FEF3C7', '#FEE2E2', '#E9D5FF', '#DBEAFE', '#E6FFFA', '#FEF0C7', '#FFF7ED', '#F8FAFC']

function splitTitle(title: string) {
  const idx = title.indexOf(':')
  if (idx === -1) return { first: title, rest: '' }
  return { first: title.slice(0, idx + 1), rest: title.slice(idx + 1).trimStart() }
}

const visibleCount = 4
// percent width per item (responsive to container size)
const itemWidthPercent = 100 / visibleCount
const maxIndex = Math.max(0, items.length - visibleCount)
// start so the left edge of item 4 (1-based) is aligned to the left of the viewport
const currentIndex = ref(3)
// dragging state for pointer swipe-to-scroll
const containerRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)
const dragX = ref(0)
const isPotentialScroll = ref(false)

function onPointerDown(e: PointerEvent) {
  // record start positions; don't assume the user intends to drag horizontally
  startX.value = e.clientX
  startY.value = e.clientY
  dragX.value = 0
  isPotentialScroll.value = true
  isDragging.value = false
  // capture pointer only for mouse to avoid interfering with touch scrolling
  try {
    if ((e as any).pointerType === 'mouse') (e.target as HTMLElement)?.setPointerCapture(e.pointerId)
  } catch (err) { }
}

function onPointerMove(e: PointerEvent) {
  // if we haven't decided whether this is a scroll or drag, measure movement
  const dx = Math.abs(e.clientX - startX.value)
  const dy = Math.abs(e.clientY - startY.value)
  if (isPotentialScroll.value) {
    // if vertical movement is dominant, treat as page scroll and bail out
    if (dy > dx && dy > 8) {
      isPotentialScroll.value = false
      isDragging.value = false
      return
    }
    // if horizontal movement dominates, start dragging
    if (dx > 6) {
      isPotentialScroll.value = false
      isDragging.value = true
    }
  }

  if (!isDragging.value) return
  dragX.value = e.clientX - startX.value
}

function onPointerUp(e: PointerEvent) {
  // Always reset the potential scroll state on pointer up.
  isPotentialScroll.value = false

  if (!isDragging.value) {
    try { (e.target as HTMLElement)?.releasePointerCapture(e.pointerId) } catch (err) { }
    return
  }

  isDragging.value = false
  const threshold = 60 // pixels to consider a swipe
  if (dragX.value > threshold) {
    prev()
  } else if (dragX.value < -threshold) {
    next()
  }
  dragX.value = 0
  try { (e.target as HTMLElement)?.releasePointerCapture(e.pointerId) } catch (err) { }
}

// wheel-based navigation disabled to avoid slide changes on page scroll
function onWheel(e: WheelEvent) {
  // intentionally empty - we don't change slides on wheel/scroll to avoid jumping
  return
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

function prev() {
  currentIndex.value = Math.max(0, currentIndex.value - 1)
}

function next() {
  currentIndex.value = Math.min(maxIndex, currentIndex.value + 1)
}

// Shift the track so first visible slide is centered
const trackStyle = computed(() => ({
  // use percent-based translate so layout changes/resizing won't cause jumps
  transform: `translateX(-${currentIndex.value * itemWidthPercent}%)`,
  transition: (suppressTransition.value || isDragging.value) ? 'none' : 'transform 450ms cubic-bezier(.22,.9,.37,1)',
  display: 'flex',
}))

const dragStyle = computed(() => {
  if (!isDragging.value || dragX.value === 0) return {}
  // combine the base percent translate with the current drag offset in px
  return {
    transform: `translateX(calc(-${currentIndex.value * itemWidthPercent}% + ${dragX.value}px))`,
    transition: 'none'
  }
})

// prevent animated jumps when component becomes visible or on container resize
const suppressTransition = ref(false)
let resizeTimeout: number | null = null
let onResize: (() => void) | null = null
let io: IntersectionObserver | null = null
let resyncTimeout: number | null = null
// pause scrolling pixels when this section snaps to top
const pauseRemaining = ref(0)
const PAUSE_PIXELS = 1000
let lastTouchY = 0

function normalizeWheelDelta(e: WheelEvent) {
  // deltaMode: 0=pixel, 1=line, 2=page — convert to approximate pixels
  let delta = e.deltaY || 0
  if (e.deltaMode === 1) delta *= 16
  if (e.deltaMode === 2) delta *= window.innerHeight || 800
  return Math.abs(delta)
}

function onTouchStart(e: TouchEvent) {
  lastTouchY = e.touches?.[0]?.clientY ?? lastTouchY
}

function onTouchMovePause(e: TouchEvent) {
  if (!pauseRemaining.value) return
  const y = e.touches?.[0]?.clientY ?? lastTouchY
  const delta = Math.abs(y - lastTouchY)
  lastTouchY = y
  console.log('[HomeContent] touchmove pause delta=', delta, 'pauseRemainingBefore=', pauseRemaining.value)
  pauseRemaining.value = Math.max(0, pauseRemaining.value - delta)
  e.preventDefault()
  e.stopPropagation()
  console.log('[HomeContent] touchmove pauseRemainingAfter=', pauseRemaining.value)
  if (pauseRemaining.value === 0) removePauseListeners()
}

function onWheelPause(e: WheelEvent) {
  if (!pauseRemaining.value) return
  const delta = normalizeWheelDelta(e)
  console.log('[HomeContent] wheel pause delta=', delta, 'deltaMode=', e.deltaMode, 'pauseBefore=', pauseRemaining.value)
  pauseRemaining.value = Math.max(0, pauseRemaining.value - delta)
  e.preventDefault()
  e.stopPropagation()
  console.log('[HomeContent] wheel pauseRemainingAfter=', pauseRemaining.value)
  if (pauseRemaining.value === 0) removePauseListeners()
}

function enablePauseListeners() {
  pauseRemaining.value = PAUSE_PIXELS
  console.log('[HomeContent] enablePauseListeners — pauseRemaining=', pauseRemaining.value)
  try { window.addEventListener('wheel', onWheelPause as any, { passive: false }) } catch (err) { }
  try { window.addEventListener('touchstart', onTouchStart as any, { passive: true }) } catch (err) { }
  try { window.addEventListener('touchmove', onTouchMovePause as any, { passive: false }) } catch (err) { }
}

function removePauseListeners() {
  try { window.removeEventListener('wheel', onWheelPause as any) } catch (err) { }
  try { window.removeEventListener('touchstart', onTouchStart as any) } catch (err) { }
  try { window.removeEventListener('touchmove', onTouchMovePause as any) } catch (err) { }
}

function checkAndEnablePause() {
  if (!containerRef.value) return
  // if already paused, nothing to do
  if (pauseRemaining.value > 0) return
  const stickyAncestor = containerRef.value?.closest?.('.sticky-card') as HTMLElement | null
  const top = (stickyAncestor ? stickyAncestor.getBoundingClientRect().top : containerRef.value.getBoundingClientRect().top)
  // increase tolerance for pin detection
  if (Math.abs(top) <= 8) {
    console.debug('[HomeContent] scroll fallback detects pinned top=', top)
    enablePauseListeners()
    try { window.removeEventListener('scroll', checkAndEnablePause as any) } catch (err) { }
  }
}

function resyncTrackSnap() {
  // Force the track to snap to the correct pixel transform without animation.
  if (!trackRef.value || !containerRef.value) return
  const containerWidth = containerRef.value.clientWidth
  const px = -(currentIndex.value * (itemWidthPercent / 100) * containerWidth)
  // apply inline styles to snap
  const el = trackRef.value
  el.style.transition = 'none'
  el.style.transform = `translateX(${px}px)`
  // force reflow
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  el.offsetHeight
  if (resyncTimeout) window.clearTimeout(resyncTimeout)
  resyncTimeout = window.setTimeout(() => {
    el.style.transition = ''
    el.style.transform = ''
  }, 60)
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  // wheel-based navigation disabled intentionally (do not attach handler)
  // ensure we catch pointerup globally in case the pointer is released outside the container
  window.addEventListener('pointerup', onPointerUp as any)

  // intersection observer - when the carousel becomes visible, briefly disable transition to avoid jump
  if (containerRef.value && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(async (entries) => {
      for (const entry of entries) {
        if (entry.target === containerRef.value) {
          if (entry.isIntersecting) {
            suppressTransition.value = true
            // force immediate layout/write
            await nextTick()
            // snap track to pixel-accurate position to avoid animated jump
            resyncTrackSnap()
            // Only enable the pause when the carousel is actually pinned to the top
            // determine the top of the nearest sticky ancestor (index.vue provides .sticky-card)
            const stickyAncestor = containerRef.value?.closest?.('.sticky-card') as HTMLElement | null
            const top = (stickyAncestor ? stickyAncestor.getBoundingClientRect().top : (containerRef.value?.getBoundingClientRect().top ?? 9999))
            // increase tolerance to account for fractional layout shifts on some browsers
            if (Math.abs(top) <= 8) {
              console.debug('[HomeContent] pinned to top (top=', top, '); enabling pause — using', stickyAncestor ? 'sticky ancestor' : 'container')
              enablePauseListeners()
            } else {
              console.debug('[HomeContent] intersecting but not pinned (top=', top, ')')
            }
            // re-enable transitions after a short delay
            window.setTimeout(() => { suppressTransition.value = false }, 50)
          } else {
            // leaving view: clear any pending pause and remove wheel/touch blockers
            pauseRemaining.value = 0
            removePauseListeners()
          }
        }
      }
    }, { threshold: 0.01 })
    io.observe(containerRef.value)
  }

  // debounce resize to avoid jumps on resize / scrollbar changes
  onResize = () => {
    suppressTransition.value = true
    if (resizeTimeout) window.clearTimeout(resizeTimeout)
    resizeTimeout = window.setTimeout(() => { suppressTransition.value = false }, 120)
  }
  window.addEventListener('resize', onResize)
  // also resync on resize end to correct any pixel offsets
  const originalOnResize = onResize
  const resizeResync = () => {
    originalOnResize()
    if (resyncTimeout) window.clearTimeout(resyncTimeout)
    resyncTimeout = window.setTimeout(() => {
      resyncTrackSnap()
    }, 160)
  }
  window.addEventListener('resize', resizeResync)
  // also watch scroll as a fallback to know when the sticky element pins to top
  window.addEventListener('scroll', checkAndEnablePause, { passive: true })
})



onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  if (containerRef.value) {
    try { containerRef.value.removeEventListener('wheel', onWheel as any) } catch (e) { }
  }
  window.removeEventListener('pointerup', onPointerUp as any)
  if (onResize) window.removeEventListener('resize', onResize)
  if (io && containerRef.value) io.disconnect()
  if (resyncTimeout) window.clearTimeout(resyncTimeout)
  if (resizeTimeout) window.clearTimeout(resizeTimeout)
  // ensure any temporary pause listeners are removed
  removePauseListeners()
  try { window.removeEventListener('scroll', checkAndEnablePause as any) } catch (err) { }
})
</script>

<template>
  <div class="w-full mx-auto bg-stone-950">
    <div class="relative overflow-hidden">
      <!-- debug badge: shows remaining pause pixels when active -->
      <div
        v-if="pauseRemaining > 0"
        class="pause-badge fixed top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm"
        style="z-index:9999;"
      >
        Pause: {{ Math.max(0, Math.round(pauseRemaining)) }}px
      </div>
      <!-- buttons -->
      <button
        @click="prev"
        :disabled="currentIndex === 0"
        aria-label="Previous"
        class="absolute left-3 top-1/2 -translate-y-1/2 z-50 bg-stone-900/70 hover:bg-stone-900/80 text-white disabled:opacity-40 shadow-lg nav-circle cursor-pointer disabled:cursor-not-allowed border w-8 h-8 md:w-10 md:h-10 p-1.5 md:p-2 rounded-full"
      >
        <UIcon
          name="i-mdi-chevron-left"
          class="uiicon"
          aria-hidden="true"
        />
      </button>

      <button
        @click="next"
        :disabled="currentIndex === maxIndex"
        aria-label="Next"
        class="absolute right-3 top-1/2 -translate-y-1/2 z-50 bg-stone-900/70 hover:bg-stone-900/80 text-white disabled:opacity-40 shadow-lg nav-circle cursor-pointer disabled:cursor-not-allowed border w-8 h-8 md:w-10 md:h-10 p-1.5 md:p-2 rounded-full"
      >
        <UIcon
          name="i-mdi-chevron-right"
          class="uiicon"
          aria-hidden="true"
        />
      </button>

      <!-- viewport -->

      <div
        class="w-full overflow-hidden"
        ref="containerRef"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
      >
        <!-- track -->
        <div
          ref="trackRef"
          :style="[trackStyle, dragStyle]"
          class="track flex"
        >
          <div
            v-for="item in items"
            :key="item.id"
            class="carousel-item"
            :style="{ '--item-basis': itemWidthPercent + '%' }"
            tabindex="0"
          >
            <div
              class="carousel-inner h-screen flex items-center justify-center text-center relative overflow-hidden"
              :style="{
                backgroundImage: `url('https://picsum.photos/seed/${item.id}/1200/800')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }"
            >
              <!-- dark overlay sits above the image; becomes lighter on hover -->
              <div class="overlay absolute inset-0 pointer-events-none"></div>

              <!-- top header overlay: stone-950 -> transparent to improve text contrast -->
              <div class="header-overlay absolute left-0 right-0 top-0 pointer-events-none"></div>

              <!-- bottom title with year (white text); description appears on hover -->
              <div class="absolute left-4 top-4 text-center pt-20 z-20 align-middle w-full items-center">
                <div class="carousel-title text-xl md:text-2xl font-thin text-white leading-tight">
                  <template v-if="splitTitle(item.title).rest">
                    <span class="title-line-1">{{ splitTitle(item.title).first }}</span>
                    <br />
                    <span class="title-line-2">{{ splitTitle(item.title).rest }}</span>
                  </template>
                  <template v-else>
                    {{ item.title }}
                  </template>
                </div>
                <div class="text-sm md:text-base text-white/80 mt-1">{{ item.year }}</div>
                <div class="desc mt-4 text-base md:text-md text-white/90 mx-auto px-4">
                  {{ item.desc }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex[style] {
  will-change: transform;
}

/* carousel sizing and hover expand */
.track {
  display: flex;
  align-items: stretch;
  gap: 0;
}

.carousel-item {
  flex: 0 0 var(--item-basis);
  transition: flex-basis 320ms cubic-bezier(.22, .9, .37, 1);
  margin: 0;
  padding: 0;
}

.carousel-item:hover {
  flex-basis: 33% !important;
}

.carousel-inner {
  transition: transform 220ms ease;
  border-radius: 0 !important;
  overflow: hidden;
  /* prevent subpixel gaps by promoting to its own layer */
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* dark overlay over the image; lighter on hover for reveal */
.overlay {
  background: rgba(0, 0, 0, 0.46);
  transition: opacity 240ms ease, background-color 240ms ease;
  z-index: 10;
}

.carousel-item:hover .overlay {
  background: rgba(0, 0, 0, 0.18);
}

/* ensure nav buttons are circular */
.nav-circle {
  /* sizing controlled by utility classes on the button (w-8 h-8 md:w-10 md:h-10) */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
}

.nav-arrow {
  display: inline-block;
  font-size: 20px;
  line-height: 1;
  transform: translateY(-1px);
}

/* UIcon sizing inside nav buttons */
.uiicon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.uiicon svg {
  width: 20px;
  height: 20px;
}

@media (min-width: 768px) {
  .uiicon svg {
    width: 24px;
    height: 24px;
  }
}

.carousel-item {
  cursor: pointer;
}

.nav-circle:disabled {
  cursor: not-allowed;
}

/* sticky overlay that shows current title while carousel is visible */
.sticky-title {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 60;
}

/* pause badge */
.pause-badge {
  font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  pointer-events: none;
}

/* description reveal on hover: hidden by default, fades/slides up on hover */
.desc {
  opacity: 0;
  transform: translateY(8px);
  max-height: 0;
  overflow: hidden;
  transition: opacity 220ms ease, transform 220ms ease, max-height 280ms ease;
  pointer-events: none;
  max-width: 56ch;
  /* limit description width to avoid stretching on hover */
  width: min(92%, 56ch);
  text-align: center;
}

.carousel-item:hover .desc {
  opacity: 1;
  transform: translateY(0);
  max-height: 10rem;
  pointer-events: auto;
}

.carousel-item:focus-within .desc {
  opacity: 1;
  transform: translateY(0);
  max-height: 12rem;
  pointer-events: auto;
}

/* constrain titles so long names wrap without pushing layout */
.carousel-title {
  max-width: 48ch;
  width: min(92%, 48ch);
  margin: 0 auto;
  overflow-wrap: anywhere;
  hyphens: auto;
}

/* header overlay to darken the top area behind text for better contrast */
.header-overlay {
  height: min(400px, 33vh);
  background: linear-gradient(180deg, rgba(15, 23, 24, 0.96) 0%, rgba(15, 23, 24, 0.7) 30%, rgba(15, 23, 24, 0.0) 100%);
  z-index: 12;
  /* above image, below text (text z-20) */
}

/* title line tweaks when we split on ':' */
.title-line-1,
.title-line-2 {
  display: inline-block;
}

.title-line-1 {
  margin-bottom: 0.15rem;
}

.title-line-2 {
  display: block;
}
</style>
