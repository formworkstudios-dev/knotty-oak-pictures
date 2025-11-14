<script setup lang="ts">
const appConfig = useAppConfig()
const siteName = appConfig.siteName
const siteLogo = appConfig.siteLogo
</script>

<template>
  <div class="flex justify-between flex-row border-b p-2 mb-4">
    <div>
      <NuxtLink to="/">{{ siteLogo ? siteLogo : siteName }}</NuxtLink>
    </div>
    <div class="flex gap-8">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
      <NuxtLink to="/contact">Contact</NuxtLink>
      <NuxtLink to="/posts">Blog</NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
