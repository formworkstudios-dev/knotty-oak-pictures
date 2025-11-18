<script
  setup
  lang="ts"
></script>

<template>
  <div class="min-h-screen bg-stone-900 text-stone-50 flex flex-col items-center justify-center py-10">
    <h1 class="text-4xl font-bold mb-10 !mb-10">Our Work</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
      <div
        v-for="i in 4"
        :key="i"
        class="flex flex-col items-center"
      >
        <div class="w-full h-48 bg-stone-800 flex items-center justify-center mb-2">
          <span class="text-xl font-semibold">Video {{ i }}</span>
        </div>
        <div class="flex flex-row items-center justify-between w-full mb-6">
          <div class="text-lg font-semibold">Video Title {{ i }}</div>
          <a
            href="#"
            class="ml-4 text-amber-400/50 hover:text-amber-400/80 transition-all ease-in-out duration-200 flex items-center gap-1 hover:underline"
          >
            Watch
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 7l-10 10m0-10h10v10"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
