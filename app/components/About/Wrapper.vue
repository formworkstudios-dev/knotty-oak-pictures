<script
  setup
  lang="ts"
>
defineProps<{
  bgColor?: string,
  zIndex?: number
}>()
</script>

<template>
  <div
    class="sticky top-0 min-h-screen border-b"
    :class="bgColor"
    :style="{ zIndex }"
  >
    <slot />
  </div>
</template>

<style scoped></style>
