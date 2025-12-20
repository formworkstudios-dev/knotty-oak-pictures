<script
  setup
  lang="ts"
>
const team = [
  {
    name: 'Tom Currà',
    role: 'President & Executive Producer',
    description: 'Tom is a storyteller and executive producer who enjoys delivering exceptional documentary, television, and film projects through creative vision, careful management, and collaboration.',
    image: '/tom.webp'
  },
  {
    name: 'Greg Matkosky',
    role: 'Director & Cinematographer',
    description: 'Greg is an award-winning filmmaker with nearly 40 years of global experience directing and shooting commercial, documentary, Giant-Screen, and corporate film productions.',
    image: '/greg-bio.jpg'
  }
]
</script>

<template>
  <AboutWrapper
    bg-color="bg-stone-900"
    :z-index="50"
  >
    <div class="flex items-center justify-center min-h-screen py-20 pt-36">
      <div class="max-w-6xl px-8 w-full text-white">
        <h1 class="text-5xl font-bold text-center !mb-18">
          Our Story
        </h1>

        <div class="flex flex-col md:flex-row gap-10 max-w-3xl mx-auto">
          <!-- Tom Currà: default alignment -->
          <div class="flex-1 flex flex-col items-center md:items-center">
            <div class="mb-4 flex-shrink-0">
              <img
                src="/tom.webp"
                alt="Tom Currà"
                class="w-full md:w-72 h-[400px] md:h-[400px] mx-0 md:mx-auto object-cover shadow-lg"
              />
            </div>
            <div
              class="mx-0 md:mx-auto flex-1 flex flex-col justify-start pt-1 md:pt-0 text-center"
              style="max-width: 288px;"
            >
              <h2 class="text-3xl font-bold !mb-1 text-center">Tom Currà</h2>
              <p class="text-xl font-semibold mb-4 opacity-50 text-center">President & Executive Producer</p>
              <p class="text-lg opacity-80 text-center">Tom is a storyteller and executive producer who enjoys
                delivering
                exceptional documentary, television, and film projects through creative vision, careful management, and
                collaboration.</p>
            </div>
          </div>

          <!-- Greg Matkosky: right-aligned image flush with edge, bio below image -->
          <div class="flex-1 flex flex-col items-center md:items-end justify-center">
            <div class="mb-4 flex-shrink-0 w-full flex justify-end items-center">
              <img
                src="/greg-bio.jpg"
                alt="Greg Matkosky"
                class="w-full md:w-72 h-[400px] md:h-[400px] object-cover object-center shadow-lg"
                style="margin-right:0;"
              />
            </div>
            <div
              class="mx-0 md:mx-0 flex-1 flex flex-col justify-start pt-1 md:pt-0 items-center text-center"
              style="max-width: 288px;"
            >
              <h2 class="text-3xl font-bold !mb-1 text-center">Greg Matkosky</h2>
              <p class="text-xl font-semibold mb-4 opacity-50 text-center">Director & Cinematographer</p>
              <p class="text-lg opacity-80 text-center">Greg is an award-winning filmmaker with nearly 40 years of
                global experience
                directing and shooting commercial, documentary, Giant-Screen, and corporate film productions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AboutWrapper>
</template>

<style scoped></style>
