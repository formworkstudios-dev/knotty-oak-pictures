<script
  setup
  lang="ts"
>

const { reveal } = useScrollReveal()

</script>

<template>
  <AboutWrapper
    bg-color="bg-amber-50"
    :z-index="30"
  >
    <div class="flex flex-col md:flex-row min-h-screen snap-y snap-mandatory overflow-y-auto text-section">
      <!-- Left Column - Text -->
      <div
        class="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-10 md:py-0 h-[50vh] md:h-auto snap-start"
      >
        <div class="flex flex-col">
          <h2
            :ref="reveal"
            class="text-2xl md:text-4xl reveal block !m-0 text-stone-900"
          >
            Rooted in a shared passion for authentic storytelling,
          </h2>
          <h2
            :ref="reveal"
            class="text-2xl md:text-4xl reveal reveal-delay-200 block !m-0 text-stone-900"
          >
            Knotty Oak Pictures grew from two creative minds

          </h2>
          <h2
            :ref="reveal"
            class="text-2xl md:text-4xl reveal reveal-delay-400 block !m-0 text-stone-900"
          >
            chasing the same vision.
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
            src="/desk.jpg"
            alt=""
            class="absolute top-0 left-0 h-full w-auto min-w-full object-cover will-change-transform"
            style="transform: translateX(-0%);"
          />
        </div>
      </div>

    </div>


  </AboutWrapper>
</template>

<style scoped>
.bg-fixed {
  background-attachment: fixed;
}
</style>
