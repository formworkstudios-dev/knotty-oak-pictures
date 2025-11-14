<script
  setup
  lang="ts"
>
const TextContent = ref("Our Story")
const description = ref("We are a creative studio dedicated to bringing your vision to life through stunning visuals and compelling narratives.")
</script>

<template>
  <AboutWrapper
    bg-color="bg-green-600"
    :z-index="30"
  >
    <div class="flex flex-row min-h-screen">
      <!-- Left Column - Text -->
      <div class="w-1/2 flex flex-col justify-center px-16">
        <div>
          <h1 class="text-4xl font-bold mb-4">
            {{ TextContent }}
          </h1>
          <p class="text-lg">
            {{ description }}
          </p>
        </div>
      </div>

      <!-- Right Column - Fixed Background Image -->
      <div class="w-1/2 h-screen sticky top-0">
        <div
          class="w-full h-full bg-cover bg-center bg-fixed"
          style="background-image: url('https://picsum.photos/1920/1080')"
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
