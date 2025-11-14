<script
  setup
  lang="ts"
>
const appConfig = useAppConfig()
const siteName = appConfig.siteName
const siteLogo = appConfig.siteLogo

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 flex justify-center items-center border-b p-3 bg-white/80 backdrop-blur-md z-[120]"
  >
    <div class="absolute left-1/2 transform -translate-x-1/2 z-[130]">
      <NuxtLink
        to="/"
        class="text-lg font-semibold"
      >
        {{ siteLogo ? siteLogo : siteName }}
      </NuxtLink>
    </div>

    <button
      @click="toggleMenu"
      class="ml-auto w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-gray-100 transition-colors z-[130] relative cursor-pointer"
      aria-label="Menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          v-if="!isMenuOpen"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>

  <!-- Full Screen Menu Overlay -->
  <Transition name="slide">
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 bg-white z-[100]"
      @click="closeMenu"
    >
      <div class="h-full flex items-center justify-end pr-16">
        <nav class="flex flex-col gap-6 text-right">
          <NuxtLink
            to="/"
            @click="closeMenu"
            class="text-5xl font-light hover:font-normal transition-all cursor-pointer"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/about"
            @click="closeMenu"
            class="text-5xl font-light hover:font-normal transition-all cursor-pointer"
          >
            About
          </NuxtLink>
          <NuxtLink
            to="/content"
            @click="closeMenu"
            class="text-5xl font-light hover:font-normal transition-all cursor-pointer"
          >
            Content
          </NuxtLink>
        </nav>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
