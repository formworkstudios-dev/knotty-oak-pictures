<script
  setup
  lang="ts"
>
import { useAttrs } from 'vue'

type Props = {
  ariaLabel?: string
  target?: string
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Scroll down'
})

const attrs = useAttrs()

function scrollDownOneViewport(): void {
  if (typeof window === 'undefined') return

  if (props.target) {
    const el = document.querySelector(props.target)
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
  }

  const viewportHeight = window.visualViewport?.height ?? window.innerHeight
  window.scrollBy({ top: viewportHeight, behavior: 'smooth' })
}
</script>

<template>
  <button
    type="button"
    v-bind="attrs"
    :aria-label="ariaLabel"
    :class="[
      'absolute left-1/2 bottom-6 -translate-x-1/2 z-20 text-white cursor-pointer bg-transparent border-0 p-2',
      (attrs as any).class
    ]"
    @click="scrollDownOneViewport"
  >
    <span class="scroll-indicator-icon inline-flex">
      <svg
        class="w-12 h-12 md:w-20 md:h-20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 5 V13"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="butt"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M8 16 L12 20"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="butt"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M16 16 L12 20"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="butt"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    </span>
  </button>
</template>

<style scoped>
.scroll-indicator-icon {
  animation: scrollBounce 1.6s ease-in-out infinite;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6));
}

@keyframes scrollBounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}
</style>
