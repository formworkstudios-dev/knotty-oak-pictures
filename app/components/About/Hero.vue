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
})

onUnmounted(() => {
  if (mouseHandler) window.removeEventListener('mousemove', mouseHandler)
  if (animationFrame) cancelAnimationFrame(animationFrame)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <AboutWrapper
    bg-color="bg-stone-900"
    :z-index="10"
  >
    <div
      id="about-hero-bg"
      class="relative flex items-start justify-start min-h-screen pb-10 pl-10"
    >
      <!-- fade-to-black overlay controlled by scroll -->
      <div
        class="absolute inset-0 bg-black pointer-events-none about-hero-overlay"
        :style="{ opacity: heroOverlayOpacity }"
      ></div>
      <!-- Full background image with transparency, matching Text.vue -->
      <div
        class="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed opacity-40 z-0 pointer-events-none"
        style="background-image: url('/bg.webp')"
      ></div>

      <h1
        class="text-6xl text-left self-end relative z-10 cursor-default"
        :style="`background: linear-gradient(45deg, #FFFBEB 0%, #d6ad60 ${gradientCenter}% , #FFFBEB 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; opacity: 0.85;`"
      >


        <span class="block reveal-instant">What began as a shared love for honest, imaginative storytelling grew into
          Knotty Oak Pictures.</span>
        <span class="block reveal-instant-delayed-1">very project we take on is a chance to tell something true — with
          heart, with beauty,</span>
        <span class="block reveal-instant-delayed-2">and with purpose. Human
          experience.</span>
      </h1>
    </div>
  </AboutWrapper>
</template>

<style scoped>
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
</style>
