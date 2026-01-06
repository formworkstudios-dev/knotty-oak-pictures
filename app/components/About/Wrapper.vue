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
    class="min-h-screen border-b md:sticky md:top-0"
    :class="bgColor"
    :style="{ zIndex }"
  >
    <slot />
  </div>
</template>

<style scoped></style>
