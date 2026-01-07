<script
  setup
  lang="ts"
>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const root = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!root.value) return
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.value = true
          // Once visible, we can stop observing
          if (observer) {
            observer.unobserve(entry.target)
            observer.disconnect()
            observer = null
          }
        }
      })
    },
    { threshold: 0.12 }
  )
  observer.observe(root.value)
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<template>
  <div
    ref="root"
    :class="{ 'footer--visible': visible }"
    class="footer-anim bg-amber-50 border-t border-stone-200 p-2.5 text-sm text-stone-700 flex flex-col md:flex-row items-center justify-center w-full gap-2 md:gap-4"
  >
    <span class="text-sm text-stone-700">&copy; Knotty Oak Pictures {{ new Date().getFullYear() }}</span>
    <span class="hidden md:inline-block text-sm">|</span>
    <div class="flex flex-row items-center justify-center gap-3">
      <NuxtLink
        to="/privacy"
        class="text-sm text-stone-700 hover:text-stone-900 transition-colors"
      >Privacy</NuxtLink>
      <span class="text-sm">|</span>
      <NuxtLink
        to="/tos"
        class="text-sm text-stone-700 hover:text-stone-900 transition-colors"
      >Terms</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.footer-anim {
  transform: translateY(18px);
  opacity: 0;
  transition: transform 520ms cubic-bezier(.22, .9, .36, 1), opacity 420ms ease;
}

.footer-anim.footer--visible {
  transform: translateY(0);
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {

  .footer-anim,
  .footer-anim.footer--visible {
    transition: none;
    transform: none;
    opacity: 1;
  }
}
</style>
