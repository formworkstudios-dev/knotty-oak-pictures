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

const letterDelays = [200, 250, 300, 350, 400, 450, 500, 600]

function getStaggeredSpans(text: string) {
  return text.split('').map((char, i) => ({
    char: char === ' ' ? '\u00A0' : char,
    delay: letterDelays[i % letterDelays.length], // Deterministic delay
    i
  }));
}

function shouldBold(slideIdx: number, lineIdx: number): boolean {
  try {
    const text = slides[slideIdx]?.lines?.[lineIdx] ?? ''
    return /\bhuman\b/i.test(text)
  } catch {
    return false
  }
}

const slides = [
  {
    lines: [
      'Knotty Oak grew from two creative minds',
      'chasing one cinematic vision:',
    ],
    bg: 'bg-stone-950',
    img: {
      desktop: '/fixed/tg2-wide-o.webp',
      mobile: '/fixed/tg2-cropped-o.webp'
    }
  },
  {
    lines: [
      'to make films that remind us',
      'what it means to be human.'
    ],
    bg: 'bg-amber-950',
    img: {
      desktop: '/fixed/matt-o.webp',
      mobile: '/fixed/matt-o.webp'
    }
  },
  {
    lines: [

      'Authenticity is our original thought.'
    ],
    bg: 'bg-red-950',
    img: {
      desktop: '/fixed/baseball-o.webp',
      mobile: '/fixed/baseball-o.webp'
    }
  }
]

const currentSlide = ref(0)
const slideState = ref<'fading-in' | 'letters-in' | 'letters-visible' | 'letters-out' | 'fading-out'>('fading-in')
let cycleTimeout: number | null = null


// Timings (ms)
// Background crossfade duration. Keeping this shorter reduces the "gap" before/after text.
const bgFadeMs = 1600;
// Lead-in/out are the intentional "no text" gaps around a background change.
// Set to 0 to eliminate deadspace around the words.
const bgLeadInMs = 0;
const bgLeadOutMs = 0;
// First run: show initial text sooner.
const bgLeadInFirstMs = 0;
let isFirstRun = true
const lettersInAnimationMs = 1300
// With bg lead-in/out set to 0, this sets the per-slide cycle to ~7s total.
const lettersVisibleMs = 3100; // time letters are fully visible before fading out
const lettersOutAnimationMs = 1200

const maxLetterDelayMs = Math.max(...letterDelays)
// Phase duration must cover delay + animation, otherwise the class is removed mid-animation.
const lettersInMs = maxLetterDelayMs + lettersInAnimationMs + 100
const lettersOutMs = maxLetterDelayMs + lettersOutAnimationMs + 100

function runSlideCycle() {
  // 1. Fade in background (no letters)
  slideState.value = 'fading-in';
  const fadeInMs = isFirstRun ? bgLeadInFirstMs : bgLeadInMs
  cycleTimeout = window.setTimeout(() => {
    // 2. Letters fade in
    slideState.value = 'letters-in';
    isFirstRun = false
    cycleTimeout = window.setTimeout(() => {
      // 3. Letters fully visible (no animation, just visible)
      slideState.value = 'letters-visible';
      cycleTimeout = window.setTimeout(() => {
        // 4. Letters fade out
        slideState.value = 'letters-out';
        cycleTimeout = window.setTimeout(() => {
          // 5. Fade out background (no letters)
          slideState.value = 'fading-out';
          cycleTimeout = window.setTimeout(() => {
            currentSlide.value = (currentSlide.value + 1) % slides.length;
            runSlideCycle();
          }, bgLeadOutMs);
        }, lettersOutMs);
      }, lettersVisibleMs);
    }, lettersInMs);
  }, fadeInMs);
}

function ensureAnimationStarts() {
  if (slideState.value !== 'fading-in' && slideState.value !== 'letters-in' && slideState.value !== 'letters-out' && slideState.value !== 'fading-out') {
    slideState.value = 'fading-in';
    runSlideCycle();
  }
}

onMounted(() => {
  runSlideCycle()
  ensureAnimationStarts();
})

onUnmounted(() => {
  if (cycleTimeout) window.clearTimeout(cycleTimeout)
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
        <!-- Desktop Image -->
        <div
          class="hero-bg-image hidden md:block"
          :style="{
            backgroundImage: `linear-gradient(rgba(30,30,30,0.55), rgba(30,30,30,0.55)), url('${slide.img.desktop}')`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0
          }"
        ></div>
        <!-- Mobile Image -->
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

    <!-- Overlay -->
    <div
      class="hero-conical-overlay"
      aria-hidden="true"
    ></div>

    <!-- Desktop lines -->
    <div
      class="w-full max-w-3xl hidden md:flex flex-col items-center justify-end pb-0 pt-0 relative z-10 md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-36"
      :style="{ opacity: textOpacity }"
    >
      <div
        v-for="(line, lineIdx) in (slides[currentSlide]?.lines?.length ?? 0)"
        :key="lineIdx"
        class="hero-line-container"
      >
        <div class="hero-line hero-fixed-line hero-absolute">
          <span
            v-for="letter in getStaggeredSpans(slides[currentSlide]?.lines?.[lineIdx] ?? '')"
            :key="`${currentSlide}-${lineIdx}-${letter.i}`"
            :class="[
              'hero-letter',
              slideState === 'letters-in' && 'hero-letter-in',
              slideState === 'letters-visible' && 'is-visible',
              slideState === 'letters-out' && 'hero-letter-out',
              shouldBold(currentSlide, lineIdx) ? 'font-semibold' : '!font-thin',
              'hero'
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

    <!-- Mobile: centered text with no manual line breaks -->
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
            {{ (slides[currentSlide]?.lines ?? []).join(' ') }}
          </span>
        </div>
      </div>
    </div>

    <SharedScrollDownArrow target="#home-content" />
  </div>
</template>

<style scoped>
/* Background fade */
.bg-fade-enter-active,
.bg-fade-leave-active {
  transition: opacity 1.6s cubic-bezier(.77, .2, .32, 1);
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
  /* Default: fit full image width; letterbox vertically if needed */
  background-size: 100% auto;
}

@media (max-width: 640px) {
  .hero-bg-image {
    /* Mobile: fill the viewport */
    background-size: cover;
  }
}

/* Overlays */
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

/* noise overlay removed */

/* Letter animations */

.hero-letter {
  display: inline-block;
  transform: none;
  /* do not set the gradient per-letter; let the line container provide a single gradient across the whole line */
  opacity: 0;
  filter: blur(8px);
  will-change: opacity, filter;
  /* Chrome fallback to avoid transparent text when parent uses -webkit-text-fill-color: transparent */
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

/* ensure outgoing layer appears above incoming during fade */
.hero-outgoing {
  z-index: 20;
}

/* Lines */
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
  /* apply the warm gradient across the entire line (one gradient spanning all letters) */
  background: linear-gradient(45deg, #FFFBEB 0%, #d6ad60 50%, #FFFBEB 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
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
    background: linear-gradient(45deg, #FFFBEB 0%, #d6ad60 50%, #FFFBEB 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    /* Fallback color for browsers that don't support background-clip/text-fill */
    color: #fff;
  }

  .hero-mobile-visible {
    opacity: 1;
    filter: blur(0);
  }

  .hero-mobile-in {
    animation: letterFadeIn 0.9s cubic-bezier(.77, .2, .32, 1) forwards;
  }

  .hero-mobile-out {
    animation: letterFadeOut 0.9s cubic-bezier(.77, .2, .32, 1) forwards;
  }

  .hero-letter {
    font-size: 1.35rem;
    /* Fallback color for browsers that don't support background-clip/text-fill */
    color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    white-space: normal;
    word-break: break-word;
  }
}
</style>
