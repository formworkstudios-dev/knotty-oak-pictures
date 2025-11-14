<script
  setup
  lang="ts"
>
// For hero (always in view), just use instant CSS animation
</script>

<template>
  <AboutWrapper
    bg-color="bg-stone-900"
    :z-index="10"
  >
    <div class="flex items-center justify-center min-h-screen">
      <h1 class="text-6xl font-bold text-white reveal-instant">
        We are Knotty Oak Pictures
      </h1>
    </div>
  </AboutWrapper>
</template>

<style scoped>
.reveal-instant {
  animation: fadeUpIn 2s ease-out forwards;
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
