<template>
  <div class="py-24 flex flex-col items-center gap-6">
    <h1 class="text-5xl font-bold reveal-instant">
      Welcome Home
    </h1>
    <p class="text-lg max-w-xl text-center reveal-instant-delayed">
      This is the home hero component with simple CSS animations.
    </p>
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
