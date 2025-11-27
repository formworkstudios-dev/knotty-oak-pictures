<script
  setup
  lang="ts"
>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const heroOverlayOpacity = ref(0)

// As the overlay fades in (0 to 1), the text should fade out (1 to 0).
const textOpacity = computed(() => 1 - heroOverlayOpacity.value)

const handleScroll = () => {
  const scrollY = window.scrollY
  const viewportHeight = window.innerHeight

  // Calculate opacity based on scrolling through the first viewport height.
  // The fade will be complete when the user has scrolled 80% of the viewport.
  const opacity = Math.min(scrollY / (viewportHeight * 0.8), 1)
  heroOverlayOpacity.value = opacity
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <div class="sticky-card">
      <HomeHero2 :text-opacity="textOpacity" />
      <!-- This overlay will fade in as the user scrolls down -->
      <div
        class="absolute inset-0 bg-black pointer-events-none"
        :style="{ opacity: heroOverlayOpacity }"
      ></div>
    </div>
    <div class="sticky-card bg-black">
      <HomeContent />
    </div>
    <div class="sticky-card bg-stone-900">
      <HomeAbout />
    </div>
  </div>
</template>

<style scoped>
.sticky-card {
  position: -webkit-sticky; /* For Safari */
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
}
</style>
