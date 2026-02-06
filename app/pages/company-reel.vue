<script
  setup
  lang="ts"
>
import { ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { onUnmounted } from 'vue'

const videoEl = ref<HTMLVideoElement | null>(null)

function cleanupVideo() {
  const el = videoEl.value

  // Exit fullscreen if this video (or any element) is fullscreen.
  try {
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    }
  } catch {
    // ignore
  }

  try {
    const anyDoc = document as any
    if (anyDoc.webkitFullscreenElement && typeof anyDoc.webkitExitFullscreen === 'function') {
      anyDoc.webkitExitFullscreen()
    }
  } catch {
    // ignore
  }

  if (!el) return

  try { el.pause() } catch { }
  // Unload to release decoder/network and avoid transition glitches.
  try {
    el.removeAttribute('src')
    el.load()
  } catch {
    // ignore
  }
}

onBeforeRouteLeave(() => {
  cleanupVideo()
})

onUnmounted(() => {
  cleanupVideo()
})
</script>

<template>
  <div class="relative min-h-screen bg-black">
    <!-- Wrapper keeps this route in normal document flow so the footer doesn't jump up -->
    <div class="fixed inset-0 w-screen h-[100dvh] bg-black relative pt-16 md:pt-0">
      <video
        ref="videoEl"
        class="w-full h-full object-contain md:object-cover"
        src="https://knotty-oak.s3.us-east-1.amazonaws.com/knotty-oak-trailer-v2.mov"
        autoplay
        loop
        muted
        playsinline
        controls
      ></video>

      <Nuxt-Link
        to="/filmography"
        class="absolute left-0 right-0 bottom-16 flex justify-center z-10"
      >
        <div class="text-xl text-stone-50 flex items-center gap-2 group">
          See Our Filmography
          <UIcon
            name="i-mdi-chevron-right"
            class="transition-transform duration-300 group-hover:translate-x-2"
          />
        </div>
      </Nuxt-Link>
    </div>
  </div>
</template>

<style scoped></style>
