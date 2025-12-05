<script
  setup
  lang="ts"
>
import { ref, onMounted, onUnmounted } from 'vue'

const slides = [
  {
    lines: [
      'Knotty Oak Pictures began as a dream',
      'shared by two people who believe that authenticity',
      'and imagination are at the heart of every great story.'
    ],
    img: '/agnes.png'
  },
  {
    lines: [
      'Every great story is a journey – they move you,',
      'guiding you through places and possibilities',
      'you have never explored.'
    ],
    img: '/battle.png'
  },
  {
    lines: [
      'Knotty Oak crafts stories to stir the heart,',
      'ignite thought, and create',
      'lasting cinematic experiences.'
    ],
    img: '/gold.jpeg'
  }
]

const currentSlide = ref(0)
const animating = ref(false)
let slideTimeout: number | null = null

function nextSlide() {
  animating.value = true
  console.log('Current Slide Before:', currentSlide.value) // Debugging reactivity
  setTimeout(() => {
    animating.value = false
    currentSlide.value = (currentSlide.value + 1) % slides.length
    console.log('Current Slide After:', currentSlide.value) // Debugging reactivity
    slideTimeout = window.setTimeout(nextSlide, 5200)
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
    :class="`min-h-screen flex flex-col items-center justify-center gap-6 w-full transition-colors duration-700`"
    :style="{
      backgroundImage: `url('${slides[currentSlide]?.img}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative'
    }"
  >
    <div class="hero-noise-overlay"></div>
    <div class="w-full max-w-3xl flex flex-col items-center justify-center py-16 relative z-10">
      <div class="hero-line-container">
        <transition
          name="hero-line-left"
          mode="out-in"
        >
          <div
            v-if="!animating"
            :key="`slide-top-${currentSlide}`"
            class="hero-line hero-line-top hero-fixed-line hero-absolute"
          >
            {{ slides[currentSlide]?.lines?.[0] ?? '' }}
          </div>
        </transition>
      </div>
      <div class="hero-line-container">
        <transition
          name="hero-line-fade"
          mode="out-in"
        >
          <div
            v-if="!animating"
            :key="`slide-mid-${currentSlide}`"
            class="hero-line hero-line-mid hero-fixed-line hero-absolute"
          >
            {{ slides[currentSlide]?.lines?.[1] ?? '' }}
          </div>
        </transition>
      </div>
      <div class="hero-line-container">
        <transition
          name="hero-line-right"
          mode="out-in"
        >
          <div
            v-if="!animating"
            :key="`slide-bot-${currentSlide}`"
            class="hero-line hero-line-bot hero-fixed-line hero-absolute"
          >
            {{ slides[currentSlide]?.lines?.[2] ?? '' }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Grainy/noise overlay for hero background */
.hero-noise-overlay {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
  opacity: 0.18;
  background-image: url('/noise.svg');
  background-repeat: repeat;
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
  /* font-weight: 600; */
  margin-bottom: 0.5rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
.hero-line-bot {
  opacity: 1;
}

.hero-line-right-enter-active,
.hero-line-right-leave-active {
  transition: all 0.7s cubic-bezier(.77, .2, .32, 1);
}

.hero-line-right-enter-from {
  opacity: 0;
  transform: translateX(200px);
}

.hero-line-right-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.hero-line-right-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.hero-line-right-leave-to {
  opacity: 0;
  transform: translateX(80px);
}
</style>
