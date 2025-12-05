<script
  setup
  lang="ts"
>
interface Props {
  lines: string[]
  textOpacity: number
  slideState: 'fading-in' | 'visible' | 'fading-out'
}
const props = defineProps<Props>()
</script>

<template>
  <div
    class="w-full flex flex-col items-start justify-center py-8"
    :style="{ opacity: props.textOpacity }"
  >
    <div :class="['mobile-lines',
      props.slideState === 'fading-out' ? 'state-fading-out' : 'state-visible']">
      <p
        v-for="(line, i) in props.lines"
        :key="`${i}-${line}`"
        class="mobile-line"
      >
        {{ line }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Smooth opacity to match bg (0.8s) */
.mobile-lines {
  width: 100%;
  max-width: 24rem;
  margin: 0;
  overflow-x: hidden;
  transition: opacity 0.8s cubic-bezier(.77, .2, .32, 1);
  opacity: 1;
}

.state-fading-out {
  opacity: 0;
}

/* Default and during fading-in/visible stay at 1 */
.state-visible {
  opacity: 1;
}

.mobile-line {
  font-size: 1.25rem;
  /* ~20px */
  line-height: 1.75rem;
  /* ~28px */
  font-weight: 300;
  text-align: left;
  color: #fff;
  margin-bottom: 0.5rem;
  padding: 0 1rem;
}
</style>
