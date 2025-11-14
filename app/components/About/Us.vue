<script
  setup
  lang="ts"
>
const UsText = ref("Meet The Team")
</script>

<template>
  <AboutWrapper
    bg-color="bg-orange-600"
    :z-index="40"
  >
    <div class="flex items-center justify-center min-h-screen">
      <h1>
        {{ UsText }}
      </h1>
    </div>
  </AboutWrapper>
</template>

<style scoped></style>
