<script
  setup
  lang="ts"
>
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

onMounted(() => {
  interval = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length
  }, 5000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <AboutWrapper
    bg-color="bg-yellow-600"
    :z-index="40"
  >
    <div class="relative min-h-screen overflow-hidden snap-y snap-mandatory overflow-y-auto">
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

      <!-- Content Overlay -->
      <div class="relative z-10 flex items-center justify-center min-h-screen snap-start">
        <h1 class="text-6xl font-bold text-white drop-shadow-lg intersect">
          {{ ContentText }}
        </h1>
      </div>
    </div>
  </AboutWrapper>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.bg-fixed {
  background-attachment: fixed;
}
</style>
