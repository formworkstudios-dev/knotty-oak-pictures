<script
  setup
  lang="ts"
>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  textOpacity: {
    type: Number,
    default: 1
  }
})

const slides = [
  {
    bg: 'bg-stone-950',
    img: {
      desktop: '/fixed/tg2-wide-o.webp',
      mobile: '/fixed/tg2-cropped-o.webp'
    },
    text: {
      desktop: [
        'Knotty Oak grew from two creative minds',
        'chasing one cinematic vision:'
      ],
      mobile: 'Knotty Oak grew from two creative minds chasing one cinematic vision:'
    }
  },
  {
    bg: 'bg-amber-950',
    img: {
      desktop: '/fixed/matt-o.webp',
      mobile: '/fixed/matt-o.webp'
    },
    text: {
      desktop: [
        'to make films that remind us',
        'what it means to be human.'
      ],
      mobile: 'to make films that remind us what it means to be human.'
    }
  },
  {
    bg: 'bg-red-950',
    img: {
      desktop: '/fixed/baseball-o.webp',
      mobile: '/fixed/baseball-o.webp'
    },
    text: {
      desktop: [
        'Authenticity is our original thought.'
      ],
      mobile: 'Authenticity is our original thought.'
    }
  }
]

const letterDelays = [200, 250, 300, 350, 400, 450, 500, 600]
const lettersInAnimationMs = 1300
const lettersOutAnimationMs = 1200
const lettersVisibleMs = 1600
// Match image fade speed to text fade for a smoother, unified feel.
const bgFadeMs = 1300
// Desktop: small equal lead-in/out around text.
const bgLeadInMs = 200
const bgLeadOutMs = 200
const bgLeadInFirstMs = 200
// Mobile: delay text start by +0.2s and reduce post-text gap by 0.2s.
const mobileBgLeadInMs = 400
const mobileBgLeadOutMs = 0

const maxLetterDelayMs = Math.max(...letterDelays)
const lettersInMs = maxLetterDelayMs + lettersInAnimationMs + 100
const lettersOutMs = maxLetterDelayMs + lettersOutAnimationMs + 100
// Mobile uses a single span (no per-letter delay), so don't include maxLetterDelayMs.
const mobileLettersInMs = lettersInAnimationMs + 100
const mobileLettersOutMs = lettersOutAnimationMs + 100

const currentSlide = ref(0)
const slideState = ref<'fading-in' | 'letters-in' | 'letters-visible' | 'letters-out' | 'fading-out'>('fading-in')
let cycleTimeout: number | null = null
let isFirstRun = true
const isMobile = ref(false)
let resizeHandler: (() => void) | null = null

function getStaggeredSpans(text: string) {
  return text.split('').map((char, i) => ({
    char: char === ' ' ? '\u00A0' : char,
    delay: letterDelays[i % letterDelays.length],
    i
  }))
}

function shouldBold(line: string): boolean {
  return /\bhuman\b/i.test(line)
}

function runSlideCycle() {
  // Step 1: background has just switched; allow it to settle before text
  slideState.value = 'fading-in'
  const fadeInMs = isFirstRun
    ? (isMobile.value ? mobileBgLeadInMs : bgLeadInFirstMs)
    : (isMobile.value ? mobileBgLeadInMs : bgLeadInMs)
  cycleTimeout = window.setTimeout(() => {
    // Step 2: text fades in (desktop per-letter, mobile single span)
    slideState.value = 'letters-in'
    isFirstRun = false
    cycleTimeout = window.setTimeout(() => {
      // Step 3: text fully visible, holding
      slideState.value = 'letters-visible'
      cycleTimeout = window.setTimeout(() => {
        // Step 4: text fades out
        slideState.value = 'letters-out'
        cycleTimeout = window.setTimeout(() => {
          // Step 5: small post-text gap before image transition
          slideState.value = 'fading-out'
          cycleTimeout = window.setTimeout(() => {
            currentSlide.value = (currentSlide.value + 1) % slides.length
            runSlideCycle()
          }, isMobile.value ? mobileBgLeadOutMs : bgLeadOutMs)
        }, isMobile.value ? mobileLettersOutMs : lettersOutMs)
      }, lettersVisibleMs)
    }, isMobile.value ? mobileLettersInMs : lettersInMs)
  }, fadeInMs)
}

function updateIsMobile() {
  if (typeof window === 'undefined') return
  isMobile.value = window.innerWidth <= 640
}

onMounted(() => {
  updateIsMobile()
  resizeHandler = () => updateIsMobile()
  window.addEventListener('resize', resizeHandler)
  runSlideCycle()
})

onUnmounted(() => {
  if (cycleTimeout) window.clearTimeout(cycleTimeout)
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
})
</script>

<template>
  <div
    id="home-hero-bg"
    :class="`min-h-screen flex flex-col items-center justify-center gap-6 w-full overflow-x-hidden transition-colors duration-700 ${slides[currentSlide]?.bg ?? 'bg-stone-950'}`"
    style="position: relative; min-height: 100dvh;"
  >
    <!-- Background images -->
    <transition-group
      name="bg-fade"
      tag="div"
    >
      <div
        v-for="(slide, idx) in slides"
        v-show="idx === currentSlide"
        :key="`bg-${idx}`"
        class="absolute inset-0"
      >
        <div
          class="hero-bg-image hidden md:block"
          :style="{
            backgroundImage: `linear-gradient(rgba(30,30,30,0.55), rgba(30,30,30,0.55)), url('${slide.img.desktop}')`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0
          }"
        ></div>
        <div
          class="hero-bg-image md:hidden"
          :style="{
            backgroundImage: `linear-gradient(rgba(30,30,30,0.55), rgba(30,30,30,0.55)), url('${slide.img.mobile}')`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0
          }"
        ></div>
      </div>
    </transition-group>

    <div
      class="hero-conical-overlay"
      aria-hidden="true"
    ></div>

    <!-- Desktop lines (per-letter animation) -->
    <div
      class="w-full max-w-3xl hidden md:flex flex-col items-center justify-end pb-0 pt-0 relative z-10 md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-36"
      :style="{ opacity: textOpacity }"
    >
      <div
        v-for="(line, lineIdx) in (slides[currentSlide]?.text?.desktop ?? [])"
        :key="`line-${lineIdx}`"
        class="hero-line-container"
      >
        <div class="hero-line hero-fixed-line hero-absolute">
          <span
            v-for="letter in getStaggeredSpans(line)"
            :key="`letter-${currentSlide}-${lineIdx}-${letter.i}`"
            :class="[
              'hero-letter',
              slideState === 'letters-in' && 'hero-letter-in',
              slideState === 'letters-visible' && 'is-visible',
              slideState === 'letters-out' && 'hero-letter-out',
              shouldBold(line) ? 'font-semibold' : '!font-thin'
            ]"
            :style="slideState === 'letters-in'
              ? `animation-delay: ${letter.delay}ms; animation-duration: 1.3s;`
              : slideState === 'letters-out'
                ? `animation-delay: ${letter.delay}ms; animation-duration: 1.2s;`
                : ''"
          >
            {{ letter.char }}
          </span>
        </div>
      </div>
    </div>

    <!-- Mobile text (single span, no per-letter animation) -->
    <div
      class="md:hidden absolute inset-0 z-10 flex items-end justify-center px-6 pb-28 text-center"
      :style="{ opacity: textOpacity }"
    >
      <div class="w-full max-w-sm">
        <div class="hero-mobile-text">
          <span :class="[
            'hero-mobile-anim',
            slideState === 'letters-in' && 'hero-mobile-in',
            slideState === 'letters-visible' && 'hero-mobile-visible',
            slideState === 'letters-out' && 'hero-mobile-out'
          ]">
            {{ slides[currentSlide]?.text?.mobile ?? '' }}
          </span>
        </div>
      </div>
    </div>

    <SharedScrollDownArrow target="#home-content" />
  </div>
</template>

<style scoped>
.bg-fade-enter-active,
.bg-fade-leave-active {
  transition: opacity 1.3s cubic-bezier(.77, .2, .32, 1);
}

.bg-fade-enter-from,
.bg-fade-leave-to {
  opacity: 0;
}

.bg-fade-enter-to,
.bg-fade-leave-from {
  opacity: 1;
}

.hero-bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100dvh;
  pointer-events: none;
  background-size: 100% auto;
}

@media (max-width: 640px) {
  .hero-bg-image {
    background-size: cover;
  }
}

.hero-conical-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: 0.32;
  background: conic-gradient(at 50% 50%,
      rgba(16, 16, 16, 0) 0deg,
      rgba(16, 16, 16, 0.55) 90deg,
      rgba(16, 16, 16, 0.75) 180deg,
      rgba(16, 16, 16, 0.55) 270deg,
      rgba(16, 16, 16, 0));
  mix-blend-mode: multiply;
  pointer-events: none;
}

.hero-letter {
  display: inline-block;
  transform: none;
  opacity: 0;
  filter: blur(8px);
  will-change: opacity, filter;
  color: #fff;
  -webkit-text-fill-color: initial;
}

.hero-letter.is-visible {
  opacity: 1;
  filter: blur(0);
}

.hero-letter-in {
  animation: letterFadeIn 1.3s cubic-bezier(.77, .2, .32, 1) forwards;
  animation-fill-mode: both;
}

.hero-letter-out {
  animation: letterFadeOut 1.2s cubic-bezier(.77, .2, .32, 1) forwards;
  animation-fill-mode: both;
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

@keyframes letterFadeOut {
  from {
    opacity: 1;
    filter: blur(0);
  }

  to {
    opacity: 0;
    filter: blur(8px);
  }
}

.hero-line-container {
  position: relative;
  height: 3.5rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.hero-absolute {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-fixed-line {
  height: 3.5rem;
  line-height: 3.5rem;
  font-size: 2.7rem;
  font-weight: 200 !important;
  text-align: center;
  overflow: visible;
  white-space: nowrap;
  color: #FFFBEB;
  margin-bottom: 0.5rem;
}

@media (max-width:640px) {
  .hero-mobile-text {
    line-height: 2.2rem !important;
    font-size: 1.6rem;
    margin-bottom: 0;
    padding: 0.5rem 1rem;
    white-space: normal;
    word-break: break-word;
  }

  .hero-mobile-anim {
    display: inline;
    opacity: 0;
    filter: blur(8px);
    will-change: opacity, filter;
    color: #FFFBEB;
  }

  .hero-mobile-visible {
    opacity: 1;
    filter: blur(0);
  }

  .hero-mobile-in {
    animation: letterFadeIn 1.3s cubic-bezier(.77, .2, .32, 1) forwards;
  }

  .hero-mobile-out {
    animation: letterFadeOut 1.2s cubic-bezier(.77, .2, .32, 1) forwards;
  }
}
</style>
