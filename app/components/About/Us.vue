<script
  setup
  lang="ts"
>
const { reveal } = useScrollReveal()

const team = [
  {
    name: 'Tom',
    role: 'Director & Cinematographer',
    description: 'Passionate storyteller with an eye for capturing authentic moments and emotions.',
    image: 'https://placehold.co/400x400/1e293b/white?text=Tom\'s+Headshot'
  },
  {
    name: 'Greg',
    role: 'Producer & Editor',
    description: 'Creative producer bringing stories to life through innovative editing and production.',
    image: 'https://placehold.co/400x400/1e293b/white?text=Greg\'s+Headshot'
  }
]
</script>

<template>
  <AboutWrapper
    bg-color="bg-orange-600"
    :z-index="40"
  >
    <div class="flex items-center justify-center min-h-screen py-20">
      <div class="max-w-6xl px-8 w-full">
        <h1
          :ref="reveal"
          class="text-5xl font-bold text-center !mb-24 reveal"
        >
          Founders
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div
            v-for="(person, index) in team"
            :key="person.name"
            :ref="reveal"
            :class="['reveal', index === 1 ? 'reveal-delay-200' : '']"
            class="text-center"
          >
            <!-- Photo -->
            <div class="mb-4">
              <img
                :src="person.image"
                :alt="person.name"
                class="w-64 h-64 mx-auto object-cover"
              />
            </div>

            <!-- Name -->
            <h2 class="text-3xl font-bold mb-2">
              {{ person.name }}
            </h2>

            <!-- Role -->
            <p class="text-xl font-semibold mb-4 opacity-90">
              {{ person.role }}
            </p>

            <!-- Description -->
            <p class="text-lg max-w-md mx-auto opacity-80">
              {{ person.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </AboutWrapper>
</template>

<style scoped></style>
