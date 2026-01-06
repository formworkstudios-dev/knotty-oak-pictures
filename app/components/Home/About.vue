<script
  setup
  lang="ts"
>
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-amber-50 relative z-20 shadow-2xl px-4">
    <div class="w-full max-w-5xl mx-auto flex flex-col items-center justify-center gap-10">
      <div class="w-full max-w-3xl mt-20 overflow-hidden h-[54vh] md:h-auto relative">
        <Nuxt-Img
          src="/knotty-oak-office.jpg"
          alt="Tom and Greg 35 years ago"
          class="w-full h-full md:h-auto object-cover object-center shadow-md md:max-h-[60vh]"
        />
        <!-- darken entire image for readability -->
        <div class="absolute inset-0 bg-black/40 md:bg-black/30 pointer-events-none"></div>
        <!-- bottom gradient: transparent to darker black for text legibility -->
        <div
          class="absolute inset-x-0 bottom-0 h-28 md:h-36 pointer-events-none"
          style="background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.0) 100%);"
        ></div>
        <!-- overlay sentence over the image -->
        <div
          class="absolute left-4 right-4 bottom-4 md:left-6 md:right-6 md:bottom-6 text-stone-50 text-base md:text-lg leading-snug md:leading-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] text-center"
        >
          Authenticity and Imagination are at the heart of the stories we tell.
        </div>
      </div>

      <Nuxt-Link to="/about">
        <div class="text-xl text-stone-950 flex items-center gap-2 group">
          LEARN ABOUT US
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
