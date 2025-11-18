<script
  setup
  lang="ts"
>
import { ref, onMounted, onUnmounted } from 'vue'


const gradientCenter = ref(35)
let targetCenter = 35
let heroDiv: HTMLElement | null = null
let mouseHandler: ((e: MouseEvent) => void) | null = null
let animationFrame: number | null = null
let lastMouseTime = Date.now()
let ambientDirection = 1

function animateGradient() {
  // If mouse hasn't moved for 2 seconds, animate ambient motion
  if (Date.now() - lastMouseTime > 1200) {
    targetCenter += ambientDirection * 1.2
    if (targetCenter > 60) ambientDirection = -1
    if (targetCenter < 10) ambientDirection = 1
  }
  gradientCenter.value += (targetCenter - gradientCenter.value) * 0.35
  if (Math.abs(targetCenter - gradientCenter.value) > 0.1 || Date.now() - lastMouseTime > 1200) {
    animationFrame = requestAnimationFrame(animateGradient)
  } else {
    gradientCenter.value = targetCenter
    animationFrame = null
  }
}

onMounted(() => {
  heroDiv = document.getElementById('home-hero-bg')
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
})

onUnmounted(() => {
  if (mouseHandler) window.removeEventListener('mousemove', mouseHandler)
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <div
    id="home-hero-bg"
    class="min-h-screen flex flex-col items-center justify-center gap-6 bg-stone-900 w-full"
  >
    <h1
      class="text-5xl font-bold reveal-instant"
      :style="`background: linear-gradient(45deg, #FFFBEB 0%, #d6ad60 ${gradientCenter}% , #d6ad60 ${gradientCenter + 15}%, #FFFBEB 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; opacity: 0.85;`"
    >
      Welcome to Knotty Oak Pictures
    </h1>
  </div>
</template>

<style scoped>
.reveal-instant {
  animation: fadeUpIn 0.4s ease-out forwards;
}

.reveal-instant-delayed {
  animation: fadeUpIn 0.4s ease-out 0.2s forwards;
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
</style>
