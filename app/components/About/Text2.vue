<script
  setup
  lang="ts"
>
const { reveal } = useScrollReveal()

</script>

<template>
  <AboutWrapper
    bg-color="bg-orange-950"
    :z-index="30"
  >
    <div class="flex flex-col-reverse md:flex-row min-h-screen snap-y snap-mandatory overflow-y-auto">
      <!-- Left Column - Fixed Background Image -->
      <div class="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 snap-start">
        <div
          class="w-full h-full bg-cover bg-center bg-fixed"
          style="background-image: url('https://picsum.photos/1920/1080')"
        ></div>
      </div>

      <!-- Right Column - Text -->
      <div
        class="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-10 md:py-0 h-[50vh] md:h-auto snap-start"
      >
        <div class="flex flex-col">
          <h2
            :ref="reveal"
            class="text-2xl md:text-4xl reveal block !m-0 !pb-0 text-stone-50/80"
          >
            Knotty Oak crafts stories to stir the heart,
          </h2>
          <h2
            :ref="reveal"
            class="text-2xl md:text-4xl reveal reveal-delay-200 block !m-0 !pb-0 text-stone-50/80"
          >
            ignite thought, and create
          </h2>
          <h2
            :ref="reveal"
            class="text-2xl md:text-4xl reveal reveal-delay-400 block !m-0 !pb-0 text-stone-50/80"
          >
            lasting cinematic experiences.
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
