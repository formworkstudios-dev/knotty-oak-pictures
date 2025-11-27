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
    <div class="flex flex-col-reverse md:flex-row min-h-screen snap-y snap-mandatory overflow-y-auto">
      <!-- Left Column - Fixed Background Image -->
      <div class="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 snap-start relative">
        <div
          class="w-full h-full bg-cover bg-center bg-fixed"
          style="background-image: url('https://picsum.photos/seed/text2/1920/1080')"
        ></div>
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
      <!-- Right Column - Text -->
      <div
        class="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-10 md:py-0 h-[50vh] md:h-auto snap-start relative"
      >
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
        <div class="flex flex-col">
          <h2
            :ref="reveal"
            class="text-2xl md:text-4xl reveal block !m-0 !pb-0 text-stone-900"
          >
            We blend art and honesty to create films
          </h2>
          <h2
            :ref="reveal"
            class="text-2xl md:text-4xl reveal reveal-delay-200 block !m-0 !pb-0 text-stone-900"
          >
            that inspire reflection and remind us
          </h2>
          <h2
            :ref="reveal"
            class="text-2xl md:text-4xl reveal reveal-delay-400 block !m-0 !pb-0 text-stone-900"
          >
            what it means to be human.
          </h2>
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
