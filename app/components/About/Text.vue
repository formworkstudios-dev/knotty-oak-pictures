<script
  setup
  lang="ts"
>

const { reveal } = useScrollReveal()

</script>

<template>
  <AboutWrapper
    bg-color="bg-amber-950"
    :z-index="30"
  >
    <div class="flex flex-col md:flex-row min-h-screen snap-y snap-mandatory overflow-y-auto">
      <!-- Left Column - Text -->
      <div
        class="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-10 md:py-0 h-[50vh] md:h-auto snap-start"
      >
        <div class="flex flex-col">
          <h2
            :ref="reveal"
            class="text-2xl md:text-4xl reveal block !m-0 text-stone-50/80"
          >
            Every great story is a journey – they move you,
          </h2>
          <h2
            :ref="reveal"
            class="text-2xl md:text-4xl reveal reveal-delay-200 block !m-0 text-stone-50/80"
          >
            guiding you through places and possibilities
          </h2>
          <h2
            :ref="reveal"
            class="text-2xl md:text-4xl reveal reveal-delay-400 block !m-0 text-stone-50/80"
          >
            you have never explored.
          </h2>
        </div>
        <svg
          class="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style="opacity:0.04;"
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
                stroke="#fff"
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
      <div class="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 snap-start">
        <div
          class="w-full h-full bg-cover bg-center bg-fixed"
          style="background-image: url('https://picsum.photos/seed/text/1920/1080')"
        ></div>
      </div>
    </div>

  </AboutWrapper>
</template>

<style scoped>
.bg-fixed {
  background-attachment: fixed;
}
</style>
