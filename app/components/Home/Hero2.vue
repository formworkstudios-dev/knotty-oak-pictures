<script
  setup
  lang="ts"
>
import { ref, onMounted, onUnmounted, reactive, nextTick } from 'vue'

// Track nudge offset for each letter (unique per slide/line/index)
const letterOffsets = reactive<Record<string, number>>({})

function handleLetterMouseEnter(slideIdx: number, lineIdx: number, letterIdx: number) {
  const key = `${slideIdx}-${lineIdx}-${letterIdx}`
  letterOffsets[key] = 40
  setTimeout(() => {
    letterOffsets[key] = 0
  }, 400)
}

function getStaggeredSpans(text: string) {
  // Possible delays in ms
  const delays = [100, 150, 200, 250]
  const translates = [-5, -3, 0, 3, 5]
  return text.split('').map((char, i) => {
    // Render spaces as non-breaking spaces
    const displayChar = char === ' ' ? '\u00A0' : char
    const delay = delays[Math.floor(Math.random() * delays.length)]
    const translate = translates[Math.floor(Math.random() * translates.length)]
    return { char: displayChar, delay, translate, i }
  })
}

const slides = [
  {
    lines: [
      'Knotty Oak Pictures began as a dream',
      'shared by two people who believe that authenticity',
      'and imagination are at the heart of every great story.'
    ],
    bg: 'bg-stone-950',
    img: '/agnes.png'
  },
  {
    lines: [
      'Every great story is a journey – they move you,',
      'guiding you through places and possibilities',
      'you have never explored.'
    ],
    bg: 'bg-amber-950',
    img: '/battle.png'
  },
  {
    lines: [
      'Knotty Oak crafts stories to stir the heart,',
      'ignite thought, and create',
      'lasting cinematic experiences.'
    ],
    bg: 'bg-red-950',
    img: '/gold.jpeg'
  }
]

const currentSlide = ref(0)
const previousSlide = ref(0)
const animating = ref(false)
const isFadingOut = ref(false)
let slideTimeout: number | null = null

function nextSlide() {
  isFadingOut.value = true
  previousSlide.value = currentSlide.value
  animating.value = true
  setTimeout(() => {
    isFadingOut.value = false
    currentSlide.value = (currentSlide.value + 1) % slides.length
    setTimeout(() => {
      animating.value = false
      slideTimeout = window.setTimeout(nextSlide, 5200)
    }, 600)
  }, 600)
}

onMounted(() => {
  slideTimeout = window.setTimeout(nextSlide, 5200)
})

onUnmounted(() => {
  if (slideTimeout) window.clearTimeout(slideTimeout)
})
</script>

<template>
  <div
    id="home-hero-bg"
    :class="`min-h-screen flex flex-col items-center justify-center gap-6 w-full transition-colors duration-700 ${slides[currentSlide]?.bg ?? 'bg-stone-950'}`"
    style="position: relative;"
  >
    <transition-group
      name="bg-fade"
      tag="div"
    >
      <div
        v-for="(slide, idx) in slides"
        v-show="idx === currentSlide"
        :key="`bg-${idx}`"
        class="hero-bg-image absolute inset-0 w-full h-full"
        :style="{
          backgroundImage: `linear-gradient(rgba(30, 30, 30, 0.55), rgba(30, 30, 30, 0.55)), url('${slide.img}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0
        }"
      ></div>
    </transition-group>
    <div class="hero-noise-overlay"></div>
    <div class="w-full max-w-3xl flex flex-col items-center justify-center py-16 relative z-10">
      <div class="hero-line-container">
        <transition-group
          v-if="isFadingOut"
          name="letter-fade"
          tag="div"
          :key="`slide-top-out-${previousSlide}`"
          class="hero-line hero-line-top hero-fixed-line hero-absolute"
        >
          <span
            v-for="letter in getStaggeredSpans(slides[previousSlide]?.lines?.[0] ?? '')"
            :key="letter.i"
            class="hero-letter hero-letter-out"
            :style="`animation-delay: ${letter.delay}ms; --letter-from-x: ${letter.translate}px; transform: translateX(calc(var(--letter-from-x, 0) + ${letterOffsets[`${previousSlide}-0-${letter.i}`] || 0}px));`"
            @mouseenter="handleLetterMouseEnter(previousSlide, 0, letter.i)"
          >{{ letter.char }}</span>
        </transition-group>
        <div
          :key="`slide-top-in-${currentSlide}`"
          class="hero-line hero-line-top hero-fixed-line hero-absolute"
        >
          <span
            v-for="letter in getStaggeredSpans(slides[currentSlide]?.lines?.[0] ?? '')"
            :key="letter.i"
            class="hero-letter hero-letter-in"
            :style="`animation-delay: ${letter.delay}ms; --letter-from-x: ${letter.translate}px; transform: translateX(calc(var(--letter-from-x, 0) + ${letterOffsets[`${currentSlide}-0-${letter.i}`] || 0}px));`"
            @mouseenter="handleLetterMouseEnter(currentSlide, 0, letter.i)"
          >{{ letter.char }}</span>
        </div>
      </div>
      <div class="hero-line-container">
        <transition-group
          v-if="isFadingOut"
          name="letter-fade"
          tag="div"
          :key="`slide-mid-out-${previousSlide}`"
          class="hero-line hero-line-mid hero-fixed-line hero-absolute"
        >
          <span
            v-for="letter in getStaggeredSpans(slides[previousSlide]?.lines?.[1] ?? '')"
            :key="letter.i"
            class="hero-letter hero-letter-out"
            :style="`animation-delay: ${letter.delay}ms; --letter-from-x: ${letter.translate}px; transform: translateX(calc(var(--letter-from-x, 0) + ${letterOffsets[`${previousSlide}-1-${letter.i}`] || 0}px));`"
            @mouseenter="handleLetterMouseEnter(previousSlide, 1, letter.i)"
          >{{ letter.char }}</span>
        </transition-group>
        <div
          :key="`slide-mid-in-${currentSlide}`"
          class="hero-line hero-line-mid hero-fixed-line hero-absolute"
        >
          <span
            v-for="letter in getStaggeredSpans(slides[currentSlide]?.lines?.[1] ?? '')"
            :key="letter.i"
            class="hero-letter hero-letter-in"
            :style="`animation-delay: ${letter.delay}ms; --letter-from-x: ${letter.translate}px; transform: translateX(calc(var(--letter-from-x, 0) + ${letterOffsets[`${currentSlide}-1-${letter.i}`] || 0}px));`"
            @mouseenter="handleLetterMouseEnter(currentSlide, 1, letter.i)"
          >{{ letter.char }}</span>
        </div>
      </div>
      <div class="hero-line-container">
        <transition-group
          v-if="isFadingOut"
          name="letter-fade"
          tag="div"
          :key="`slide-bot-out-${previousSlide}`"
          class="hero-line hero-line-bot hero-fixed-line hero-absolute"
        >
          <span
            v-for="letter in getStaggeredSpans(slides[previousSlide]?.lines?.[2] ?? '')"
            :key="letter.i"
            class="hero-letter hero-letter-out"
            :style="`animation-delay: ${letter.delay}ms; --letter-from-x: ${letter.translate}px; transform: translateX(calc(var(--letter-from-x, 0) + ${letterOffsets[`${previousSlide}-2-${letter.i}`] || 0}px));`"
            @mouseenter="handleLetterMouseEnter(previousSlide, 2, letter.i)"
          >{{ letter.char }}</span>
        </transition-group>
        <div
          :key="`slide-bot-in-${currentSlide}`"
          class="hero-line hero-line-bot hero-fixed-line hero-absolute"
        >
          <span
            v-for="letter in getStaggeredSpans(slides[currentSlide]?.lines?.[2] ?? '')"
            :key="letter.i"
            class="hero-letter hero-letter-in"
            :style="`animation-delay: ${letter.delay}ms; --letter-from-x: ${letter.translate}px; transform: translateX(calc(var(--letter-from-x, 0) + ${letterOffsets[`${currentSlide}-2-${letter.i}`] || 0}px));`"
            @mouseenter="handleLetterMouseEnter(currentSlide, 2, letter.i)"
          >{{ letter.char }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth fade transition for background images */
.bg-fade-enter-active,
.bg-fade-leave-active {
  transition: opacity 0.8s cubic-bezier(.77, .2, .32, 1);
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
  height: 100vh;
  pointer-events: none;
}

/* Grainy/noise overlay for hero background */
.hero-noise-overlay {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
  opacity: 0.18;
  background-image: url('https://www.transparenttextures.com/patterns/noise.png');
  background-repeat: repeat;
}

/* Staggered letter animation and nudge */
/* Staggered letter animation and nudge */
.hero-letter {
  opacity: 0;
  filter: blur(8px);
  display: inline-block;
  transform: translateX(var(--letter-from-x, 0));
}

.hero-letter-in {
  animation: letterFadeIn 0.5s cubic-bezier(.77, .2, .32, 1);
  animation-fill-mode: forwards;
}

.hero-letter-out {
  animation: letterFadeOut 0.5s cubic-bezier(.77, .2, .32, 1);
  animation-fill-mode: forwards;
}

.letter-fade-leave-active {
  transition: opacity 0.5s;
}

.letter-fade-leave-to {
  opacity: 0;
}

@keyframes letterFadeIn {
  from {
    opacity: 0;
    filter: blur(8px);
    transform: translateX(var(--letter-from-x, 0));
  }

  to {
    opacity: 1;
    filter: blur(0);
    transform: translateX(0);
  }
}

@keyframes letterFadeOut {
  from {
    opacity: 1;
    filter: blur(0);
    transform: translateX(0);
  }

  to {
    opacity: 0;
    filter: blur(8px);
    transform: translateX(var(--letter-from-x, 0));
  }
}

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
  width: 100vw;
  max-width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* All hero lines: fixed height and font size */
.hero-fixed-line {
  height: 3.5rem;
  line-height: 3.5rem;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
  opacity: 1;
}

@media (max-width: 640px) {
  .hero-fixed-line {
    height: unset;
    line-height: 1.2rem !important;
    font-size: 1.1rem;
    margin-bottom: 0;
    padding: 0.5rem 1rem;
    white-space: normal;
    word-break: break-word;
  }
}

/* Top line: slide in/out from left */
/* Top line: slide in/out from left */
/* .hero-line-top {
  opacity: 0.85;
} */

.hero-line-left-enter-active,
.hero-line-left-leave-active {
  transition: all 0.7s cubic-bezier(.77, .2, .32, 1);
}

.hero-line-left-enter-from {
  opacity: 0;
  transform: translateX(-80px);
}

.hero-line-left-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.hero-line-left-enter-from {
  opacity: 0;
  transform: translateX(-200px);
}

.hero-line-left-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}

.hero-line-right-enter-from {
  opacity: 0;
  transform: translateX(400px);
}

.hero-line-right-leave-to {
  opacity: 0;
  transform: translateX(400px);
}

.hero-line-fade-enter-active,
.hero-line-fade-leave-active {
  transition: opacity 0.7s cubic-bezier(.77, .2, .32, 1);
}

.hero-line-fade-enter-from,
.hero-line-fade-leave-to {
  opacity: 0;
}

.hero-line-fade-enter-to,
.hero-line-fade-leave-from {
  opacity: 1;
}

/* Bottom line: slide in/out from right */
/* Bottom line: slide in/out from right */
.hero-letter {
  opacity: 0;
  filter: blur(8px);
  display: inline-block;
  transform: translateX(var(--letter-from-x, 0));
  color: #fff;
  animation: letterFadeIn 0.5s cubic-bezier(.77, .2, .32, 1) forwards;
}

@keyframes letterFadeIn {
  from {
    opacity: 0;
    filter: blur(8px);
    transform: translateX(var(--letter-from-x, 0));
  }

  60% {
    opacity: 0.7;
    filter: blur(3px);
    transform: translateX(calc(var(--letter-from-x, 0) * 0.3));
  }

  to {
    opacity: 1;
    filter: blur(0);
    transform: translateX(0);
  }
}

.hero-line-right-leave-to {
  opacity: 0;
  transform: translateX(80px);
}
</style>
