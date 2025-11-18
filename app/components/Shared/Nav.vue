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
    class="fixed top-0 left-0 right-0 flex justify-center items-center border-b p-3 bg-stone-950/50 backdrop-blur-md z-[120]"
  >
    <div class="absolute left-1/2 transform -translate-x-1/2 z-[130]">
      <NuxtLink
        to="/"
        class="text-lg font-semibold !text-[#FFFBEB]"
      >
        {{ siteLogo ? siteLogo : siteName }}
      </NuxtLink>
    </div>

    <button
      @click="toggleMenu"
      class="ml-auto w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-stone-300 bg-stone-700 flex items-center justify-center hover:bg-stone-600 transition-colors z-[130] relative cursor-pointer p-1.5 md:p-2"
      aria-label="Menu"
    >
      <span class="block w-4 h-4 md:w-5 md:h-5 relative">
        <span :class="[
          'absolute left-0 w-4 h-0.5 md:w-5 md:h-0.5 bg-stone-300 transition-all duration-300',
          isMenuOpen ? 'top-2 md:top-2.5 rotate-45' : 'top-1'
        ]"></span>
        <span :class="[
          'absolute w-4 h-0.5 md:w-5 md:h-0.5 bg-stone-300 transition-all duration-300 top-2 md:top-2.5',
          isMenuOpen ? 'left-[-32px] opacity-0' : 'left-0'
        ]"></span>
        <span :class="[
          'absolute left-0 w-4 h-0.5 md:w-5 md:h-0.5 bg-stone-300 transition-all duration-300',
          isMenuOpen ? 'top-2 md:top-2.5 -rotate-45' : 'top-3 md:top-4'
        ]"></span>
      </span>
    </button>
  </div>

  <Transition name="slide">
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 bg-stone-950 z-[100]"
      @click="closeMenu"
    >
      <div class="h-full flex flex-col items-end justify-center pr-6 md:pr-16">
        <nav class="flex flex-col gap-6 text-right max-w-xs w-full ml-auto">
          <NuxtLink
            to="/"
            @click="closeMenu"
            class="text-white"
          >
            <span
              class="inline-block text-4xl md:text-5xl font-light hover:font-normal transition-all cursor-pointer relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-[#FFFBEB] before:opacity-0 before:transition-all hover:before:opacity-100 hover:before:-translate-x-2"
            >
              Home
            </span>
          </NuxtLink>

          <NuxtLink
            to="/about"
            @click="closeMenu"
            class="text-white"
          >
            <span
              class="inline-block text-4xl md:text-5xl font-light hover:font-normal transition-all cursor-pointer relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-[#FFFBEB] before:opacity-0 before:transition-all hover:before:opacity-100 hover:before:-translate-x-2"
            >
              About
            </span>
          </NuxtLink>

          <NuxtLink
            to="/content"
            @click="closeMenu"
            class="text-white"
          >
            <span
              class="inline-block text-4xl md:text-5xl font-light hover:font-normal transition-all cursor-pointer relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-[#FFFBEB] before:opacity-0 before:transition-all hover:before:opacity-100 hover:before:-translate-x-2"
            >
              Content
            </span>
          </NuxtLink>
        </nav>
        <div
          class="flex flex-col border-t border-stone-700 pt-6 mt-6 text-sm text-mono text-stone-300 space-y-1.5 max-w-content text-right font-mono"
        >
          <div class=""> <a
              href="mailto:info@knottyoakpictures.com"
              class="underline"
            >info@knottyoakpictures.com</a></div>
          <div> <a
              href="tel:+1234567890"
              class="underline"
            >(123) 456-7890</a></div>
          <div> <a
              href="https://instagram.com/knottyoakpictures"
              target="_blank"
              class="underline"
            >@knottyoakpictures</a></div>

        </div>
      </div>
      <div
        class="flex flex-col border-t border-stone-700 pt-6 mt-6 text-xs text-stone-300 text-right space-y-1 max-w-xs w-full ml-auto"
      >
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