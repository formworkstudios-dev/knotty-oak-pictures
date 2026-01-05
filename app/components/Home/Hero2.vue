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

function getStaggeredSpans(text: string) {
  const delays = [200, 250, 300, 350, 400, 450, 500, 600];
  return text.split('').map((char, i) => ({
    char: char === ' ' ? '\u00A0' : char,
    delay: delays[i % delays.length], // Deterministic delay
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
    img: '/tom-and-greg-35-years-ago-2.png'
  },
  {
    lines: [
      'to create films that remind us',
      'what it means to be human.'
    ],
    bg: 'bg-amber-950',
    img: '/slide2.jpg'
  },
  {
    lines: [

      'Authenticity is our original thought.'
    ],
    bg: 'bg-red-950',
    img: '/little.png'
  }
]

const currentSlide = ref(0)
const slideState = ref<'fading-in' | 'letters-in' | 'letters-visible' | 'letters-out' | 'fading-out'>('fading-in')
let cycleTimeout: number | null = null


// Timings (ms)
const bgFadeMs = 2700;
const lettersInMs = 900; // covers staggered delays and animation
const lettersVisibleMs = 4100; // time letters are fully visible before fading out
const lettersOutMs = 700;

function runSlideCycle() {
  // 1. Fade in background (no letters)
  slideState.value = 'fading-in';
  cycleTimeout = window.setTimeout(() => {
    // 2. Letters fade in
    slideState.value = 'letters-in';
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
          }, bgFadeMs);
        }, lettersOutMs);
      }, lettersVisibleMs);
    }, lettersInMs);
  }, bgFadeMs);
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
    :class="`min-h-screen flex flex-col items-center justify-center gap-6 w-full transition-colors duration-700 ${slides[currentSlide]?.bg ?? 'bg-stone-950'}`"
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
        class="hero-bg-image"
        :style="{
          backgroundImage: `linear-gradient(rgba(30,30,30,0.55), rgba(30,30,30,0.55)), url('${slide.img}')`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0
        }"
      ></div>
    </transition-group>

    <!-- Overlay -->
    <div
      class="hero-conical-overlay"
      aria-hidden="true"
    ></div>

    <!-- Desktop lines -->
    <div
      class="w-full max-w-3xl hidden md:flex flex-col items-center justify-center py-16 relative z-10"
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

    <!-- Mobile: render only on small screens and keep above overlays -->
    <div
      class="md:hidden absolute left-4 bottom-4 z-10 !pb-20"
      :style="{ opacity: textOpacity }"
    >
      <HomeMobileHero
        :lines="slides[currentSlide]?.lines ?? []"
        :text-opacity="textOpacity"
        :slide-state="slideState as any"
      />
    </div>

    <SharedScrollDownArrow />
  </div>
</template>

<style scoped>
/* Background fade */
.bg-fade-enter-active,
.bg-fade-leave-active {
  transition: opacity 2.7s cubic-bezier(.77, .2, .32, 1);
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
  width: 100vw;
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
  width: 100vw;
  height: 100vh;
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
  width: 100vw;
  max-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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
  overflow: hidden;
  white-space: nowrap;
  /* apply the warm gradient across the entire line (one gradient spanning all letters) */
  background: linear-gradient(45deg, #FFFBEB 0%, #d6ad60 50%, #FFFBEB 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

@media (max-width:640px) {
  .hero-fixed-line {
    height: unset;
    line-height: 1.2rem !important;
    font-size: 1.1rem;
    margin-bottom: 0;
    padding: 0.5rem 1rem;
    white-space: normal;
    word-break: break-word;
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
