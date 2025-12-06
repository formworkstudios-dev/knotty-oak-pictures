<script
  setup
  lang="ts"
>
import { ref, onMounted, onUnmounted } from 'vue'

const gradientCenter = ref(50)
let targetCenter = 50
let heroDiv: HTMLElement | null = null
let mouseHandler: ((e: MouseEvent) => void) | null = null
let animationFrame: number | null = null
let lastMouseTime = Date.now()
let ambientDirection = 1

// overlay opacity controlled by scroll (fade-to-black)
const heroOverlayOpacity = ref(0)
// Crossfade background images among three assets
const bgImages = [
  '/tom-and-greg-35-years-ago.png',
  '/tom-and-greg-35-years-ago-2.png',
  '/tom-and-greg-35-years-ago-3.png'
]
const bgCurrent = ref(0)
const bgNext = ref(1)
const bgFrontIsA = ref(true)
// Slightly longer fade and interval to improve perceived smoothness
const bgFadeMs = 1400
const bgIntervalMs = 5200
let bgTimer: number | null = null
const isBgFading = ref(false)

function preloadBgImages(urls: string[]) {
  if (typeof window === 'undefined') return
  urls.forEach((u) => {
    const img = new Image()
    img.src = u
  })
}

function startBgCrossfade() {
  if (bgTimer) return
  // Preload all images to avoid flicker at loop boundaries
  preloadBgImages(bgImages)

  const cycle = () => {
    if (isBgFading.value) {
      // In rare cases, ensure we schedule next cycle anyway
      bgTimer = window.setTimeout(cycle, bgIntervalMs)
      return
    }
    isBgFading.value = true

    // Prepare next index and ensure the back layer shows the upcoming image BEFORE toggling
    const nextIdx = (bgCurrent.value + 1) % bgImages.length
    bgNext.value = nextIdx

    // Trigger crossfade by flipping which layer is front
    bgFrontIsA.value = !bgFrontIsA.value

    // After fade completes, commit current index and prime the following next image
    window.setTimeout(() => {
      bgCurrent.value = nextIdx
      bgNext.value = (bgCurrent.value + 1) % bgImages.length
      isBgFading.value = false
      // Schedule next cycle using setTimeout to avoid setInterval drift/glitch at wrap
      bgTimer = window.setTimeout(cycle, bgIntervalMs)
    }, bgFadeMs)
  }

  // Kick off first cycle using timeout to align timing precisely
  bgTimer = window.setTimeout(cycle, bgIntervalMs)
}

// per-letter entrance animation (like Home/Hero2)
function getStaggeredSpans(text: string, seed = 0) {
  const delays = [120, 160, 200, 240, 280, 320, 360, 420]
  // deterministic-ish per seed by rotating delays
  return text.split('').map((char, i) => {
    const idx = (i + seed) % delays.length
    const base = delays[idx] ?? delays[0]
    const baseNum = Number(base || delays[0])
    return {
      char: char === ' ' ? '\u00A0' : char,
      delay: baseNum + Math.floor((Math.random() * 60) - 30),
      i
    }
  })
}

const animateEntrance = ref(false)

// simple mobile detection so we can render a non-split, line-based reveal on small screens
const isMobile = ref(false)
function updateIsMobile() {
  isMobile.value = (typeof window !== 'undefined') ? window.innerWidth <= 640 : false
}

const handleScroll = () => {
  if (!heroDiv) return
  const rect = heroDiv.getBoundingClientRect()
  const viewportHeight = window.innerHeight || 800
  // compute how far the hero has moved up (positive when scrolled past top)
  const scrolledUp = Math.max(0, -rect.top)
  // stronger, more pronounced fade: reach near-full within ~60% of viewport
  const normalized = Math.min(1, scrolledUp / (viewportHeight * 0.6))
  // slight easing so it ramps up
  const eased = Math.pow(normalized, 1.05)
  heroOverlayOpacity.value = Math.min(0.95, eased * 1.05)
}

function animateGradient() {
  // If mouse hasn't moved for 2 seconds, animate ambient motion
  if (Date.now() - lastMouseTime > 2000) {
    targetCenter += ambientDirection * 0.5
    if (targetCenter > 80) ambientDirection = -1
    if (targetCenter < 20) ambientDirection = 1
  }
  gradientCenter.value += (targetCenter - gradientCenter.value) * 0.25
  if (Math.abs(targetCenter - gradientCenter.value) > 0.1 || Date.now() - lastMouseTime > 2000) {
    animationFrame = requestAnimationFrame(animateGradient)
  } else {
    gradientCenter.value = targetCenter
    animationFrame = null
  }
}

onMounted(() => {
  heroDiv = document.getElementById('about-hero-bg')
  mouseHandler = (e: MouseEvent) => {
    lastMouseTime = Date.now()
    if (!heroDiv) return
    const rect = heroDiv.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = Math.max(0, Math.min(100, Math.round((x / rect.width) * 100)))
    targetCenter = percent
    if (!animationFrame) animateGradient()
  }
  window.addEventListener('mousemove', mouseHandler)
  if (!animationFrame) animateGradient()
  window.addEventListener('scroll', handleScroll)
  // trigger per-letter entrance after a short tick
  window.setTimeout(() => { animateEntrance.value = true }, 60)
  // set mobile state and listen for resize to toggle rendering mode
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
  // start background crossfade cycle
  startBgCrossfade()
})

onUnmounted(() => {
  if (mouseHandler) window.removeEventListener('mousemove', mouseHandler)
  if (animationFrame) cancelAnimationFrame(animationFrame)
  window.removeEventListener('scroll', handleScroll)
  try { window.removeEventListener('resize', updateIsMobile) } catch (e) { }
  if (bgTimer) {
    clearTimeout(bgTimer)
    bgTimer = null
  }
})
</script>

<template>
  <AboutWrapper
    bg-color="bg-stone-900"
    :z-index="10"
  >
    <div
      id="about-hero-bg"
      class="relative flex items-start justify-start min-h-screen px-4 py-4 md:pb-10 md:pl-10 overflow-x-hidden w-full"
    >
      <!-- fade-to-black overlay controlled by scroll -->
      <div
        class="absolute inset-0 bg-black pointer-events-none about-hero-overlay"
        :style="{ opacity: heroOverlayOpacity }"
      ></div>
      <!-- Full background image with transparency, matching Text.vue -->
      <!-- Crossfading background images -->
      <div class="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40 will-change-opacity">
        <!-- Layer A -->
        <div
          class="absolute inset-0 w-full h-full bg-cover bg-center bg-layer"
          :style="{
            backgroundImage: `url('${bgImages[bgCurrent]}')`,
            opacity: bgFrontIsA ? 1 : 0,
            transition: `opacity ${bgFadeMs}ms ease-in-out`,
            transitionDelay: bgFrontIsA ? '0ms' : '80ms'
          }"
        ></div>
        <!-- Layer B -->
        <div
          class="absolute inset-0 w-full h-full bg-cover bg-center bg-layer"
          :style="{
            backgroundImage: `url('${bgImages[bgNext]}')`,
            opacity: bgFrontIsA ? 0 : 1,
            transition: `opacity ${bgFadeMs}ms ease-in-out`,
            transitionDelay: bgFrontIsA ? '80ms' : '0ms'
          }"
        ></div>
      </div>

      <h1
        class="!text-6xl text-left self-end relative z-10 cursor-default about-hero-title leading-normal"
        :style="`--gc: ${gradientCenter}%; opacity: 0.85;`"
      >
        <template v-if="isMobile">



          <!-- mobile: render three line-based reveals (no per-letter split) -->
          <span class="block reveal-instant">Knotty Oak Pictures grew from a forged friendship,</span>
          <span class="block reveal-instant-delayed-1"> the love for filmmaking,</span>
          <span class="block reveal-instant-delayed-2">and life over thirty years.</span>
        </template>
        <template v-else>
          <!-- desktop: per-letter randomized entrance (existing behavior) -->
          <span class="block">
            <template
              v-for="letter in getStaggeredSpans('Knotty Oak Pictures grew from a forged friendship,', 1)"
              :key="`l1-${letter.i}`"
            >
              <span
                :class="['hero-letter', animateEntrance ? 'hero-letter-in' : '']"
                :style="{ animationDelay: letter.delay + 'ms' }"
              >{{ letter.char }}</span>
            </template>
          </span>

          <span class="block">
            <template
              v-for="letter in getStaggeredSpans('the love for filmmaking, and life over 30 years.', 2)"
              :key="`l2-${letter.i}`"
            >
              <span
                :class="['hero-letter', animateEntrance ? 'hero-letter-in' : '']"
                :style="{ animationDelay: letter.delay + 200 + 'ms' }"
              >{{ letter.char }}</span>
            </template>
          </span>

          <!-- <span class="block">
            <template
              v-for="letter in getStaggeredSpans('and life over 30 years.', 3)"
              :key="`l3-${letter.i}`"
            >
              <span
                :class="['hero-letter', animateEntrance ? 'hero-letter-in' : '']"
                :style="{ animationDelay: letter.delay + 420 + 'ms' }"
              >{{ letter.char }}</span>
            </template>
          </span> -->
        </template>
      </h1>
    </div>
  </AboutWrapper>
</template>

<style scoped>
.bg-layer {
  will-change: opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.reveal-instant {
  animation: fadeUpIn 1s ease-out forwards;
  opacity: 0;
}

.reveal-instant-delayed-1 {
  animation: fadeUpIn 1s ease-out 0.3s forwards;
  opacity: 0;
}

.reveal-instant-delayed-2 {
  animation: fadeUpIn 1s ease-out 0.6s forwards;
  opacity: 0;
}

@keyframes fadeUpIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.about-hero-overlay {
  transition: opacity 260ms ease;
  will-change: opacity;
}

/* mobile reveal lines: render gradient-clipped text on the span (not the parent) */
.reveal-instant,
.reveal-instant-delayed-1,
.reveal-instant-delayed-2 {
  background: linear-gradient(45deg, #FFFBEB 0%, #d6ad60 var(--gc), #FFFBEB 100%);
  -webkit-background-clip: text;
  background-clip: text;
  /* fallback color for browsers without text-fill */
  color: #fff;
  -webkit-text-fill-color: transparent;
}

/* per-letter entrance */
.hero-letter {
  display: inline-block;
  transform: none;
  opacity: 0;
  filter: blur(8px);
  /* gradient on each letter to satisfy Chrome */
  background: linear-gradient(45deg, #FFFBEB 0%, #d6ad60 var(--gc), #FFFBEB 100%);
  -webkit-background-clip: text;
  background-clip: text;
  /* fallback and Chrome gradient text */
  color: #fff;
  -webkit-text-fill-color: transparent;
}

.hero-letter-in {
  animation: letterFadeIn 0.5s cubic-bezier(.77, .2, .32, 1) forwards;
}

@keyframes letterFadeIn {
  from {
    opacity: 0;
    filter: blur(8px);
  }

  to {
    opacity: 1;
    filter: blur(0);
  }
}

/* Constrain title width and wrap to avoid horizontal overflow */
.about-hero-title {
  max-width: 48ch;
  width: min(92vw, 48ch);
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
}

/* Mobile: make the line-based hero text smaller */
@media (max-width: 640px) {

  .about-hero-title .reveal-instant,
  .about-hero-title .reveal-instant-delayed-1,
  .about-hero-title .reveal-instant-delayed-2 {
    font-size: 0.95rem !important;
    line-height: 1.25rem !important;
  }
}
</style>
