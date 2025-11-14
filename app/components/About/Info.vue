<script
  setup
  lang="ts"
>
const InfoText = ref("Our Information")
const quote = ref("The only thing that counts is truth, emotion, and humanity.")
const author = ref("Pierre-Auguste Renoir")
</script>

<template>
  <AboutWrapper
    bg-color="bg-blue-600"
    :z-index="20"
  >
    <div class="flex items-center justify-center min-h-screen">
      <div class="text-center max-w-3xl px-8">
        <blockquote class="text-5xl font-light italic mb-6">
          "{{ quote }}"
        </blockquote>
        <p class="text-xl">
          — {{ author }}
        </p>
      </div>
    </div>
  </AboutWrapper>
</template>

<style scoped></style>
