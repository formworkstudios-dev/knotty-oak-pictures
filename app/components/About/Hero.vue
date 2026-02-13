<script
  setup
  lang="ts"
>
import { ref, onMounted, onUnmounted } from 'vue'

const gradientCenter = ref(50)
let targetCenter = 50
let heroDiv: HTMLElement | null = null
let heroWrap: HTMLElement | null = null
let mouseHandler: ((e: MouseEvent) => void) | null = null
let animationFrame: number | null = null
let lastMouseTime = Date.now()
let ambientDirection = 1

// overlay opacity controlled by scroll (fade-to-black)
const baseOverlayOpacity = 0.65
const maxOverlayOpacity = 0.95
const heroOverlayOpacity = ref(baseOverlayOpacity)

const bgImage = {
  desktop: '/tom-and-greg-35-years-ago-3.png',
  mobile: '/tom-and-greg-35-years-ago-3-alt.png'
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
      char: char,
      delay: baseNum + Math.floor((Math.random() * 60) - 30),
      i
    }
  })
}

// Word-safe tokenization to avoid breaking words across lines
function getWordTokens(text: string, seed = 0) {
  const delays = [120, 160, 200, 240, 280, 320, 360, 420]
  const words = text.split(' ')
  const tokens: Array<
    | { type: 'word'; letters: Array<{ char: string; delay: number; i: number }> }
    | { type: 'space' }
  > = []
  let letterIndex = 0
  words.forEach((w, wi) => {
    const letters = w.split('').map((char) => {
      const idx = (letterIndex + seed) % delays.length
      const base = delays[idx] ?? delays[0]
      const baseNum = Number(base || delays[0])
      const out = {
        char,
        delay: baseNum + Math.floor((Math.random() * 60) - 30),
        i: letterIndex
      }
      letterIndex++
      return out
    })
    tokens.push({ type: 'word', letters })
    if (wi < words.length - 1) tokens.push({ type: 'space' })
  })
  return tokens
}

const animateEntrance = ref(false)
const isHeroActive = ref(true)

// simple mobile detection so we can render a non-split, line-based reveal on small screens
const isMobile = ref(false)
function updateIsMobile() {
  isMobile.value = (typeof window !== 'undefined') ? window.innerWidth <= 640 : false
}

const handleScroll = () => {
  if (!heroWrap) return
  const rect = heroWrap.getBoundingClientRect()
  const viewportHeight = window.innerHeight || 800

  // Show fixed background/overlay only while the hero section is on screen
  isHeroActive.value = rect.bottom > 0 && rect.top < viewportHeight

  // compute how far the hero has moved up (positive when scrolled past top)
  const scrolledUp = Math.max(0, -rect.top)
  // stronger, more pronounced fade: reach near-full within ~60% of viewport
  const normalized = Math.min(1, scrolledUp / (viewportHeight * 0.6))
  // slight easing so it ramps up
  const eased = Math.pow(normalized, 1.05)
  heroOverlayOpacity.value = Math.min(
    maxOverlayOpacity,
    baseOverlayOpacity + (maxOverlayOpacity - baseOverlayOpacity) * Math.min(1, eased * 1.05)
  )
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
  heroWrap = document.getElementById('about-hero-wrap')
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
  // set initial overlay based on current scroll position
  handleScroll()
  // trigger per-letter entrance after a short tick
  window.setTimeout(() => { animateEntrance.value = true }, 60)
  // set mobile state and listen for resize to toggle rendering mode
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

onUnmounted(() => {
  if (mouseHandler) window.removeEventListener('mousemove', mouseHandler)
  if (animationFrame) cancelAnimationFrame(animationFrame)
  window.removeEventListener('scroll', handleScroll)
  try { window.removeEventListener('resize', updateIsMobile) } catch (e) { }
})
</script>

<template>
  <AboutWrapper
    bg-color="bg-stone-900"
    :z-index="10"
    sticky="never"
  >
    <!-- Keep the hero to a single viewport height -->
    <div
      id="about-hero-wrap"
      class="relative min-h-[100dvh]"
    >
      <!-- Fixed background image (stays put while page scrolls) -->
      <div
        class="fixed inset-0 w-full h-full z-0 pointer-events-none will-change-opacity"
        :style="{ opacity: isHeroActive ? 1 : 0 }"
      >
        <!-- Desktop Image -->
        <div
          class="hidden md:block absolute inset-0 w-full h-full bg-cover bg-center"
          :style="{ backgroundImage: `url('${bgImage.desktop}')` }"
        ></div>
        <!-- Mobile Image -->
        <div
          class="md:hidden absolute inset-0 w-full h-full bg-cover bg-center"
          :style="{ backgroundImage: `url('${bgImage.mobile}')` }"
        ></div>
      </div>

      <!-- Fixed dark overlay (only visible while hero is on screen) -->
      <div
        class="fixed inset-0 z-10 bg-black pointer-events-none about-hero-overlay"
        :style="{ opacity: (isHeroActive ? heroOverlayOpacity : 0) }"
      ></div>

      <!-- Pinned viewport panel: keeps hero text in place while scrolling through the hero wrap -->
      <div
        id="about-hero-bg"
        class="sticky top-0 z-20 flex flex-col items-center justify-center h-[100dvh] px-6 md:px-4 pb-12 md:pb-10 overflow-hidden w-full"
      >
        <h1
          class="!text-4xl lg:!text-5xl text-center relative z-30 cursor-default about-hero-title leading-normal w-full max-w-[68rem] mx-auto"
          :style="`--gc: ${gradientCenter}%; opacity: 0.85;`"
        >
          <template v-if="isMobile">
            <!-- mobile: line-based reveal -->
            <span :class="['block', 'hero-mobile-anim', animateEntrance ? 'hero-mobile-in' : '']">Knotty Oak Pictures is
              rooted in a lifetime friendship and shared love of
              and for filmmaking.</span>
          </template>
          <template v-else>
            <!-- desktop: per-letter randomized entrance (existing behavior) -->
            <span class="block">
              <template
                v-for="(token, ti) in getWordTokens('Knotty Oak Pictures is rooted in a lifetime friendship and shared love of and for filmmaking.', 1)"
                :key="`t1-${ti}`"
              >
                <template v-if="token.type === 'space'">
                  <span class="word-space"> </span>
                </template>
                <template v-else>
                  <span class="word">
                    <span
                      v-for="letter in token.letters"
                      :key="`l1-${letter.i}`"
                      :class="['hero-letter', animateEntrance ? 'hero-letter-in' : '']"
                      :style="{ animationDelay: letter.delay + 'ms' }"
                    >{{ letter.char }}</span>
                  </span>
                </template>
              </template>
            </span>
          </template>
        </h1>

        <SharedScrollDownArrow
          target="#about-text-1"
          class="absolute bottom-6 left-1/2 -translate-x-1/2 z-30"
        />
      </div>
    </div>
  </AboutWrapper>
</template>

<style scoped>
.bg-layer {
  will-change: opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition-property: opacity;
  transition-duration: var(--bg-fade-ms, 1400ms);
  transition-timing-function: ease-in-out;
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

.reveal-instant-delayed-3 {
  animation: fadeUpIn 1s ease-out 0.9s forwards;
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
.hero-mobile-anim {
  display: inline;
  opacity: 0;
  filter: blur(8px);
  will-change: opacity, filter;
  color: #FFFBEB;
}

.hero-mobile-in {
  animation: letterFadeIn 0.9s cubic-bezier(.77, .2, .32, 1) forwards;
}

/* per-letter entrance */
.hero-letter {
  display: inline-block;
  transform: none;
  opacity: 0;
  filter: blur(8px);
  color: #FFFBEB;
}

.hero-letter-in {
  animation: letterFadeIn 1.3s cubic-bezier(.77, .2, .32, 1) forwards;
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
  overflow-wrap: normal;
  word-break: normal;
  hyphens: none;
}

.word {
  display: inline-block;
}

.word-space {
  display: inline-block;
  width: 0.5ch;
}

/* Mobile: make the line-based hero text smaller */
@media (max-width: 640px) {

  .about-hero-title .reveal-instant,
  .about-hero-title .reveal-instant-delayed-1,
  .about-hero-title .reveal-instant-delayed-2,
  .about-hero-title .reveal-instant-delayed-3 {
    font-size: 1.5rem !important;
    line-height: 2rem !important;
  }
}
</style>
