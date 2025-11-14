<!-- 
  REVEAL ANIMATION EXAMPLES
  Copy this pattern to any component for instant reveals
-->

<script
  setup
  lang="ts"
>
import { ref, onMounted } from 'vue'

const show = ref(false)

onMounted(() => {
  // Small delay ensures CSS transition fires
  setTimeout(() => show.value = true, 50)
})
</script>

<template>
  <div class="space-y-8 p-8">

    <!-- Example 1: Basic fade-up reveal -->
    <h2 :class="['reveal', { active: show }]">
      Basic Reveal (fade up)
    </h2>

    <!-- Example 2: Zoom reveal -->
    <h2 :class="['reveal-zoom', { active: show }]">
      Zoom Reveal
    </h2>

    <!-- Example 3: Slide from left -->
    <h2 :class="['reveal-slide-left', { active: show }]">
      Slide from Left
    </h2>

    <!-- Example 4: Slide from right -->
    <h2 :class="['reveal-slide-right', { active: show }]">
      Slide from Right
    </h2>

    <!-- Example 5: Staggered reveals with delays -->
    <div class="flex gap-4">
      <div :class="['reveal', { active: show }]">First</div>
      <div :class="['reveal reveal-delay-100', { active: show }]">Second</div>
      <div :class="['reveal reveal-delay-200', { active: show }]">Third</div>
      <div :class="['reveal reveal-delay-300', { active: show }]">Fourth</div>
    </div>

    <!-- Example 6: Fast reveal -->
    <h2 :class="['reveal-zoom reveal-fast', { active: show }]">
      Fast Zoom (0.4s)
    </h2>

    <!-- Example 7: Slow reveal -->
    <h2 :class="['reveal reveal-slow', { active: show }]">
      Slow Reveal (1s)
    </h2>

  </div>
</template>

<!--
  USAGE PATTERN:
  
  1. Import reactive ref and onMounted:
     import { ref, onMounted } from 'vue'
  
  2. Create state variable:
     const show = ref(false)
  
  3. Trigger on mount:
     onMounted(() => {
       setTimeout(() => show.value = true, 50)
     })
  
  4. Add reveal class + active binding:
     :class="['reveal-zoom', { active: show }]"
  
  AVAILABLE CLASSES:
  - reveal (fade up)
  - reveal-fade (just fade)
  - reveal-zoom (scale up)
  - reveal-slide-left
  - reveal-slide-right
  
  MODIFIERS:
  - reveal-fast (0.4s)
  - reveal-slow (1s)
  - reveal-delay-100 through reveal-delay-500
-->
