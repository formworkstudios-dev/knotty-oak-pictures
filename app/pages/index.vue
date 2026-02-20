<script
  setup
  lang="ts"
>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const heroOverlayOpacity = ref(0)

// As the overlay fades in (0 to 1), the text should fade out (1 to 0).
const textOpacity = computed(() => 1 - heroOverlayOpacity.value)

const handleScroll = () => {
  const scrollingEl = document.scrollingElement || document.documentElement
  const scrollY = window.scrollY || scrollingEl.scrollTop || 0
  const viewportHeight = window.innerHeight

  // Calculate opacity based on scrolling through the first viewport height.
  // The fade will be complete when the user has scrolled 80% of the viewport.
  const opacity = Math.min(scrollY / (viewportHeight * 0.8), 1)
  heroOverlayOpacity.value = opacity
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
})
</script>

<template>
  <div>
    <div class="sticky-card">
      <div class="relative z-10">
        <!-- <HomeHero2 :text-opacity="textOpacity" /> -->
        <HomeHero3 />
      </div>
      <!-- This overlay will fade in as the user scrolls down -->
      <div
        class="absolute inset-0 bg-black pointer-events-none"
        :style="{ opacity: heroOverlayOpacity, zIndex: 1 }"
      ></div>
    </div>
    <div
      id="home-content"
      class="sticky-card bg-black"
    >
      <HomeContent />
    </div>
    <div class="sticky-card bg-stone-900">
      <HomeAbout />
    </div>
  </div>
</template>

<style scoped>
.sticky-card {
  position: -webkit-sticky;
  /* For Safari */
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  width: 100%;
}
</style>
