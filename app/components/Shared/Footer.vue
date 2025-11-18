<script
  setup
  lang="ts"
></script>

<template>
  <div
    class="bg-black border-t border-stone-800 p-4 text-sm text-stone-400 flex flex-col md:flex-row items-center justify-center w-full gap-4"
  >
    <span class="text-sm text-stone-400">&copy; Knotty Oak Pictures {{ new Date().getFullYear() }}</span>
    <span class="hidden md:inline-block text-sm">|</span>
    <NuxtLink
      to="/privacy"
      class="text-sm text-stone-400 hover:text-stone-300 transition-colors"
    >Privacy</NuxtLink>
    <span class="hidden md:inline-block text-sm">|</span>
    <NuxtLink
      to="/tos"
      class="text-sm text-stone-400 hover:text-stone-300 transition-colors"
    >Terms</NuxtLink>
  </div>
</template>

<style scoped></style>
