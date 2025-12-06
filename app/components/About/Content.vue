<script
  setup
  lang="ts"
>
import { ref, onMounted, onUnmounted } from 'vue'

const ContentText = ref("Our Work")

// Array of image URLs
const images = [
  'https://picsum.photos/seed/1/1920/1080',
  'https://picsum.photos/seed/2/1920/1080',
  'https://picsum.photos/seed/3/1920/1080',
  'https://picsum.photos/seed/4/1920/1080'
]

const currentImageIndex = ref(0)

// Auto-transition every 3 seconds
let interval: ReturnType<typeof setInterval>
let io: IntersectionObserver | null = null

// two-finger swipe state (for horizontal navigation)
const twoFingerActive = ref(false)
const touchStartX = ref(0)
const touchStartY = ref(0)
const touchDeltaX = ref(0)
const touchCooldown = ref(false)

function onTwoTouchStart(e: TouchEvent) {
  if (e.touches && e.touches.length === 2 && !touchCooldown.value) {
    const t0 = e.touches[0]
    const t1 = e.touches[1]
    if (t0 && t1) {
      twoFingerActive.value = true
      const x = (t0.clientX + t1.clientX) / 2
      const y = (t0.clientY + t1.clientY) / 2
      touchStartX.value = x
      touchStartY.value = y
      touchDeltaX.value = 0
    } else {
      twoFingerActive.value = false
    }
  } else {
    twoFingerActive.value = false
  }
}

function onTwoTouchMove(e: TouchEvent) {
  if (!twoFingerActive.value || !e.touches || e.touches.length !== 2) return
  const t0 = e.touches[0]
  const t1 = e.touches[1]
  if (!t0 || !t1) return
  const x = (t0.clientX + t1.clientX) / 2
  const y = (t0.clientY + t1.clientY) / 2
  touchDeltaX.value = x - touchStartX.value
}

function onTwoTouchEnd(e: TouchEvent) {
  if (!twoFingerActive.value) return
  const dx = touchDeltaX.value
  const absDx = Math.abs(dx)
  const threshold = 40
  if (absDx > threshold) {
    if (dx < 0) {
      // swipe left -> next
      currentImageIndex.value = (currentImageIndex.value + 1) % images.length
    } else {
      // swipe right -> prev
      currentImageIndex.value = (currentImageIndex.value - 1 + images.length) % images.length
    }
    touchCooldown.value = true
    window.setTimeout(() => { touchCooldown.value = false }, 300)
  }
  twoFingerActive.value = false
  touchDeltaX.value = 0
}

function onWheel(e: WheelEvent) {
  // Handle horizontal trackpad two-finger swipes which emit wheel events (deltaX)
  if (touchCooldown.value) return
  const dx = e.deltaX
  const absDx = Math.abs(dx)
  // Require a minimum horizontal delta and that horizontal movement dominates vertical
  const threshold = 40
  if (absDx > threshold && absDx > Math.abs(e.deltaY)) {
    if (dx > 0) {
      // scroll left-to-right -> next
      currentImageIndex.value = (currentImageIndex.value + 1) % images.length
    } else {
      // scroll right-to-left -> prev
      currentImageIndex.value = (currentImageIndex.value - 1 + images.length) % images.length
    }
    touchCooldown.value = true
    window.setTimeout(() => { touchCooldown.value = false }, 300)
  }
}

onMounted(() => {
  interval = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length
  }, 5000)

  // IntersectionObserver: activate reveal animations when elements enter viewport
  if ('IntersectionObserver' in window) {
    const targets = Array.from(document.querySelectorAll('.reveal')) as HTMLElement[]
    io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement
        if (entry.isIntersecting) {
          el.classList.add('active')
          // If we only need to reveal once, unobserve
          io?.unobserve(el)
        }
      }
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
    })
    targets.forEach(t => io?.observe(t))
  }
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
  if (io) {
    io.disconnect()
    io = null
  }
})
</script>

<template>
  <AboutWrapper
    bg-color="bg-stone-900"
    :z-index="40"
  >
    <div
      class="relative min-h-screen overflow-hidden snap-y snap-mandatory overflow-y-auto"
      @touchstart.passive="onTwoTouchStart"
      @touchmove.passive="onTwoTouchMove"
      @touchend.passive="onTwoTouchEnd"
      @touchcancel.passive="onTwoTouchEnd"
      @wheel.passive="onWheel"
    >
      <!-- Transitioning Background Images -->
      <TransitionGroup name="fade">
        <div
          v-for="(image, index) in images"
          :key="index"
          v-show="currentImageIndex === index"
          class="absolute inset-0 bg-cover bg-center bg-fixed"
          :style="{ backgroundImage: `url('${image}')` }"
        ></div>
      </TransitionGroup>

      <!-- Dark overlay above background images to improve text contrast -->
      <div
        class="absolute inset-0 z-5 pointer-events-none"
        style="background: rgba(0, 0, 0, 0.45);"
      ></div>

      <!-- Content Overlay -->
      <div class="relative z-10 flex items-center justify-center min-h-screen snap-start">
        <h1
          class="text-4xl md:text-6xl font-bold text-white text-center leading-tight px-4 reveal reveal-fade reveal-slow"
        >
          <span class="block font-bold pb-2">Our Lens is focused on a single purpose:</span>
          <span class="block">Channeling original thought from our hearts,</span>
          <span class="block">giving the audience a sense of place<br /> within a shared human experience.</span>
        </h1>
      </div>
    </div>
  </AboutWrapper>
</template>

<style scoped></style>
