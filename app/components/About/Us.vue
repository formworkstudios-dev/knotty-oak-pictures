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
    image: '/greg.webp'
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

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto">
          <div
            v-for="(person, index) in team"
            :key="person.name"
            class="text-left md:text-center"
          >
            <!-- Photo -->
            <div class="mb-4 flex-shrink-0">
              <img
                :src="person.image"
                :alt="person.name"
                class="w-full md:w-72 h-[200px] md:h-[400px] mx-0 md:mx-auto object-cover shadow-lg"
              />
            </div>

            <!-- Name & Text -->
            <div
              class="mx-0 md:mx-auto flex-1 flex flex-col justify-start pt-1 md:pt-0"
              style="max-width: 288px;"
            >
              <h2 class="text-3xl font-bold !mb-1">
                {{ person.name }}
              </h2>
              <!-- Role -->
              <p class="text-xl font-semibold mb-4 opacity-50">
                {{ person.role }}
              </p>
              <!-- Description -->
              <p class="text-lg opacity-80">
                {{ person.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AboutWrapper>
</template>

<style scoped></style>
