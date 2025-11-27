<script
  setup
  lang="ts"
>
import { ref, onMounted, onUnmounted } from 'vue'

// nudge behavior removed — keep animations to opacity + blur only

function getStaggeredSpans(text: string) {
  const delays = [100, 150, 200, 250, 300, 350, 400]
  return text.split('').map((char, i) => ({
    char: char === ' ' ? '\u00A0' : char,
    delay: delays[Math.floor(Math.random() * delays.length)],
    i
  }))
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
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0
        }"
      ></div>
    </transition-group>

    <!-- Overlays -->
    <div
      class="hero-conical-overlay"
      aria-hidden="true"
    ></div>
    <div
      class="hero-noise-overlay"
      aria-hidden="true"
    ></div>

    <!-- Desktop lines -->
    <div class="w-full max-w-3xl hidden md:flex flex-col items-center justify-center py-16 relative z-10">
      <div
        v-for="(line, lineIdx) in 3"
        :key="lineIdx"
        class="hero-line-container"
      >
        <!-- Outgoing letters -->
        <transition-group
          v-if="isFadingOut"
          name="letter-fade"
          tag="div"
          :key="`slide-${lineIdx}-out-${previousSlide}`"
          class="hero-line hero-fixed-line hero-absolute hero-outgoing"
        >
          <span
            v-for="letter in getStaggeredSpans(slides[previousSlide]?.lines?.[lineIdx] ?? '')"
            :key="letter.i"
            class="hero-letter hero-letter-out font-extralight hero"
            :style="`animation-delay: ${letter.delay}ms;`"
          >
            {{ letter.char }}
          </span>
        </transition-group>

        <!-- Incoming letters -->
        <div
          :key="`slide-${lineIdx}-in-${currentSlide}`"
          class="hero-line hero-fixed-line hero-absolute"
        >
          <span
            v-for="letter in getStaggeredSpans(slides[currentSlide]?.lines?.[lineIdx] ?? '')"
            :key="letter.i"
            class="hero-letter hero-letter-in !font-thin hero"
            :style="`animation-delay: ${letter.delay}ms;`"
          >
            {{ letter.char }}
          </span>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <HomeMobileHero :lines="slides[currentSlide]?.lines ?? []" />
  </div>
</template>

<style scoped>
/* Background fade */
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

.hero-noise-overlay {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3;
  opacity: 0.22;
  background-image: url('https://www.transparenttextures.com/patterns/noise.png'), url('https://assets.codepen.io/1468070/noise.svg');
  background-repeat: repeat, repeat;
  background-size: auto, cover;
  mix-blend-mode: overlay;
  filter: contrast(1.12) saturate(0.95) brightness(0.95);
  pointer-events: none;
}

/* Letter animations */
.hero-letter {
  opacity: 0;
  filter: blur(8px);
  display: inline-block;
  /* no horizontal transform — we animate only opacity and blur */
  transform: none;
  color: #F8F6F0;
}

.hero-letter-in {
  animation: letterFadeIn 0.5s cubic-bezier(.77, .2, .32, 1) forwards;
}

.hero-letter-out {
  animation: letterFadeOut 0.5s cubic-bezier(.77, .2, .32, 1) forwards;
  opacity: 1;
}

@keyframes letterFadeIn {
  0% {
    opacity: 0;
    filter: blur(8px);
  }

  60% {
    opacity: 0.7;
    filter: blur(3px);
  }

  100% {
    opacity: 1;
    filter: blur(0);
  }
}

@keyframes letterFadeOut {
  0% {
    opacity: 1;
    filter: blur(0);
  }

  60% {
    opacity: 0.5;
    filter: blur(4px);
  }

  100% {
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
  color: #F8F6F0;
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
    white-space: normal;
    word-break: break-word;
  }
}
</style>
