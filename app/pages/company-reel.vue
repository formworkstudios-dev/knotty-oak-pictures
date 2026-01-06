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

async function enterFullscreen() {
  const el = videoEl.value
  if (!el) return

  // Prefer standard Fullscreen API where available
  try {
    const anyEl = el as any
    if (typeof el.requestFullscreen === 'function') {
      await el.requestFullscreen()
      return
    }
    if (typeof anyEl.webkitRequestFullscreen === 'function') {
      await anyEl.webkitRequestFullscreen()
      return
    }
  } catch {
    // fall through to iOS video fullscreen
  }

  // iOS Safari: video element fullscreen
  try {
    const anyEl = el as any
    if (typeof anyEl.webkitEnterFullscreen === 'function') {
      anyEl.webkitEnterFullscreen()
    }
  } catch {
    // no-op
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
    <div class="fixed inset-0 w-screen h-[100dvh] bg-black">
      <button
        type="button"
        class="md:hidden absolute top-4 right-4 z-10 bg-black/60 text-white text-sm px-3 py-2"
        @click="enterFullscreen"
      >
        Full screen
      </button>
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
    </div>
  </div>
</template>

<style scoped></style>
