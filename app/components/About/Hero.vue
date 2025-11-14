<script
  setup
  lang="ts"
>
const HeroText = ref("We are Knotty Oak Pictures")

</script>

<template>
  <AboutWrapper
    bg-color="bg-stone-900"
    :z-index="10"
  >
    <div class="flex items-center justify-center min-h-screen">
      <h1>
        {{ HeroText }}
      </h1>
    </div>
  </AboutWrapper>
</template>

<style scoped></style>
