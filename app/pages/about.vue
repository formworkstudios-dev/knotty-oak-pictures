<script
  setup
  lang="ts"
>
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolledPastFirstScreen = ref(false);

const handleScroll = () => {
  const firstScreen = document.querySelector('.first-screen');
  if (firstScreen) {
    const rect = firstScreen.getBoundingClientRect();
    isScrolledPastFirstScreen.value = rect.bottom <= 0;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div
    class="relative z-[110]"
    :class="{ 'text-black': isScrolledPastFirstScreen, 'text-white': !isScrolledPastFirstScreen }"
  >
    <div class="first-screen relative">
      <AboutHero />
    </div>

    <!-- <AboutInfo /> -->
    <AboutText />
    <AboutText2 />
    <!-- <AboutContent /> -->
    <AboutUs />

  </div>
</template>

<style scoped></style>
