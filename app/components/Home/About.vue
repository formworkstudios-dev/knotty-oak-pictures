<script
  setup
  lang="ts"
></script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-stone-950 relative z-20 shadow-2xl flex-col gap-10">
    <div class="text-3xl font-bold text-amber-100">[ PHOTO OF TOM & GREG ]</div>
    <Nuxt-Link to="/about">
      <div class="text-xl text-stone-50 flex items-center gap-2 group">
        LEARN ABOUT US
        <UIcon
          name="i-mdi-chevron-right"
          class="transition-transform duration-300 group-hover:translate-x-2"
        />
      </div>
    </Nuxt-Link>
  </div>

</template>

<style scoped></style>
