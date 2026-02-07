<script
  setup
  lang="ts"
>

import { ref, onMounted, onUnmounted } from 'vue'

const { reveal } = useScrollReveal()

const isMobile = ref(false)

let mediaQueryList: MediaQueryList | null = null

const updateIsMobile = () => {
  // Tailwind `md` breakpoint is 768px
  isMobile.value = !(mediaQueryList?.matches ?? false)
}

onMounted(() => {
  mediaQueryList = window.matchMedia('(min-width: 768px)')
  updateIsMobile()

  if (typeof mediaQueryList.addEventListener === 'function') {
    mediaQueryList.addEventListener('change', updateIsMobile)
  } else {
    // Safari < 14
    mediaQueryList.addListener(updateIsMobile)
  }
})

onUnmounted(() => {
  if (!mediaQueryList) return

  if (typeof mediaQueryList.removeEventListener === 'function') {
    mediaQueryList.removeEventListener('change', updateIsMobile)
  } else {
    mediaQueryList.removeListener(updateIsMobile)
  }
})

</script>

<template>
  <AboutWrapper
    bg-color="bg-amber-50"
    :z-index="108"
    id="about-text-1"
  >
    <div class="flex flex-col md:flex-row min-h-screen snap-y snap-mandatory overflow-y-auto text-section">
      <!-- Left Column - Text -->
      <div
        class="w-full md:w-1/2 flex flex-col justify-center items-center md:items-end text-center md:justify-center md:text-right px-6 md:px-10 py-10 md:py-0 h-[50vh] md:h-auto snap-start "
      >
        <div class="flex flex-col items-center md:items-end">
          <h2
            v-if="isMobile"
            :ref="reveal"
            class="!text-4xl md:!text-5xl max-w-sm md:max-w-none !leading-normal reveal block !m-0 text-stone-900"
          >
            This collaboration enriches our films with 40 years of <span class="font-medium">telling stories
              cinematically</span>.
          </h2>
          <h2
            v-else
            :ref="reveal"
            class="text-3xl md:!text-4xl  md:max-w-none !leading-normal reveal block !m-0 text-stone-900 !max-w-[20ch] break-keep whitespace-normal"
          >
            This collaboration enriches our films with 40 years of
          </h2>
          <h2
            v-if="!isMobile"
            :ref="reveal"
            class="text-3xl md:!text-4xl max-w-lg md:max-w-none !leading-normal reveal reveal-delay-200 block !m-0 text-stone-900 break-keep whitespace-normal"
          >
            <span class="font-medium text-4xl">telling stories cinematically</span>.
          </h2>
        </div>
        <svg
          class="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style="opacity:0.06;"
        >
          <defs>
            <pattern
              id="grid-tight"
              width="4"
              height="4"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 4 0 L 0 0 0 4"
                fill="none"
                stroke="#000"
                stroke-opacity="0.08"
                stroke-width="0.2"
              />
            </pattern>
          </defs>
          <rect
            width="200"
            height="200"
            fill="url(#grid-tight)"
          />
        </svg>
      </div>

      <!-- Right Column - Fixed Background Image -->
      <!-- Right Column - Fixed Background Image -->
      <div class="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 snap-start">
        <div class="relative h-full w-full overflow-hidden">
          <img
            src="/about-2a.png"
            alt=""
            class="absolute top-0 left-0 h-full w-auto min-w-full object-cover will-change-transform"
            style="transform: translateX(-0%);"
          />
        </div>
      </div>

    </div>

    <SharedScrollDownArrow
      v-if="!isMobile"
      target="#about-text-2"
      class="hidden md:block !text-white"
    />


  </AboutWrapper>
</template>

<style scoped>
.bg-fixed {
  background-attachment: fixed;
}
</style>
