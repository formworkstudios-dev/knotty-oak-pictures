<script
  setup
  lang="ts"
>
const quote = ref("Great films linger in memory long after the credits roll.")
const author = ref("François Truffaut")

// Enable scroll-reveal animation
const { reveal } = useScrollReveal()
</script>

<template>
  <AboutWrapper
    bg-color="bg-blue-600"
    :z-index="20"
  >
    <div class="flex items-center justify-center min-h-screen">
      <div class="text-center max-w-3xl px-8">
        <blockquote
          :ref="reveal"
          class="text-5xl font-light italic mb-6 reveal reveal-slow"
        >
          "{{ quote }}"
        </blockquote>
        <p
          :ref="reveal"
          class="text-xl reveal reveal-delay-200"
        >
          — {{ author }}
        </p>
      </div>
    </div>
  </AboutWrapper>
</template>

<style scoped></style>
