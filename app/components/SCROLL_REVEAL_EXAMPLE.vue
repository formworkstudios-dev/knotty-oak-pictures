<script
  setup
  lang="ts"
>
const { reveal } = useScrollReveal()
</script>

<template>
  <div class="space-y-16 p-8">

    <!-- This appears on scroll -->
    <div
      :ref="reveal"
      class="reveal"
    >
      <h2 class="text-4xl font-bold">This reveals when scrolled into view</h2>
    </div>

    <!-- Multiple elements with stagger -->
    <div class="grid grid-cols-3 gap-4">
      <div
        :ref="reveal"
        class="reveal reveal-delay-100"
      >
        <div class="p-8 bg-blue-500 text-white">Box 1</div>
      </div>
      <div
        :ref="reveal"
        class="reveal reveal-delay-200"
      >
        <div class="p-8 bg-green-500 text-white">Box 2</div>
      </div>
      <div
        :ref="reveal"
        class="reveal reveal-delay-300"
      >
        <div class="p-8 bg-red-500 text-white">Box 3</div>
      </div>
    </div>

    <!-- Slide from left -->
    <div
      :ref="reveal"
      class="reveal-slide-left"
    >
      <p class="text-2xl">I slide in from the left</p>
    </div>

    <!-- Slide from right -->
    <div
      :ref="reveal"
      class="reveal-slide-right"
    >
      <p class="text-2xl">I slide in from the right</p>
    </div>

    <!-- Zoom -->
    <div
      :ref="reveal"
      class="reveal-zoom"
    >
      <h3 class="text-3xl">I zoom in</h3>
    </div>

  </div>
</template>

<!--
  USAGE:
  
  1. Import the composable (auto-imported in Nuxt):
     const { reveal } = useScrollReveal()
  
  2. Add :ref="reveal" to any element you want to animate on scroll
  
  3. Add reveal class (from main.css):
     - reveal (fade up)
     - reveal-fade (just fade)
     - reveal-zoom (scale)
     - reveal-slide-left
     - reveal-slide-right
  
  4. Optional modifiers:
     - reveal-fast / reveal-slow
     - reveal-delay-100 through reveal-delay-500
-->
