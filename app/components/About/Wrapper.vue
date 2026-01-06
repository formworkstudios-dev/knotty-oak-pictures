<script
  setup
  lang="ts"
>
const props = withDefaults(
  defineProps<{
    bgColor?: string,
    zIndex?: number,
    sticky?: 'always' | 'desktop' | 'never'
  }>(),
  {
    sticky: 'desktop'
  }
)
</script>

<template>
  <div
    class="relative min-h-screen border-b"
    :class="[
      props.bgColor,
      props.sticky === 'always'
        ? 'sticky top-0'
        : props.sticky === 'desktop'
          ? 'md:sticky md:top-0'
          : ''
    ]"
    :style="{ zIndex: props.zIndex }"
  >
    <slot />
  </div>
</template>

<style scoped></style>
