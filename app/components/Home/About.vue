<script
  setup
  lang="ts"
>
import { ref, onMounted, onUnmounted } from 'vue'

const rootEl = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!rootEl.value) return

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (!entry) return
      if (entry.isIntersecting) {
        isVisible.value = true
        // If we only need to animate once, unobserve after visible
        if (observer && entry.target) observer.unobserve(entry.target)
      }
    },
    {
      root: null,
      rootMargin: '0px 0px -15% 0px',
      threshold: 0.15
    }
  )

  observer.observe(rootEl.value)
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <div
    ref="rootEl"
    class="h-screen flex items-center justify-center bg-stone-950 relative z-20 shadow-2xl flex-col gap-10 fade-in-section"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="w-full max-w-3xl pt-20">
      <Nuxt-Img
        src="/tom-and-greg-35-years-ago-2.png"
        alt="Tom and Greg 35 years ago"
        class="w-full h-auto object-cover shadow-md"
        style="max-height: 60vh;"
      />
    </div>
    <Nuxt-Link to="/about">
      <div class="text-xl text-stone-50 flex items-center gap-2 group">
        LEARN ABOUT US
        <UIcon
          name="i-mdi-chevron-right"
          class="transition-transform duration-300 group-hover:translate-x-2"
        />
      </div>
    </Nuxt-Link>
  </div>

</template>

<style scoped>
.fade-in-section {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 700ms cubic-bezier(.77, .2, .32, 1),
    transform 700ms cubic-bezier(.77, .2, .32, 1);
  will-change: opacity, transform;
}

.fade-in-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
