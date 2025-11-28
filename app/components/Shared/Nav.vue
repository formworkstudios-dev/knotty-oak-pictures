<script
  setup
  lang="ts"
>
import { ref, onMounted, onUnmounted } from 'vue'

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

function isEditableFocused() {
  const el = document.activeElement as HTMLElement | null
  if (!el) return false
  const tag = el.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || (el as HTMLElement).isContentEditable) return true
  return false
}

function keyHandler(e: KeyboardEvent) {
  // Ctrl/Cmd+K or 'm' open the menu (unless typing in an input)
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    toggleMenu()
    return
  }
  if (e.key.toLowerCase() === 'm' && !isEditableFocused()) {
    // toggle the menu on 'm' so pressing it again closes the menu
    toggleMenu()
    return
  }
  if (e.key === 'Escape' && isMenuOpen.value) {
    closeMenu()
    return
  }
}

onMounted(() => {
  window.addEventListener('keydown', keyHandler)
})

onUnmounted(() => {
  window.removeEventListener('keydown', keyHandler)
})
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 flex justify-center items-center p-2.5 z-[120] transition-colors"
    :class="{ 'border-b border-stone-700': isMenuOpen, 'border-transparent': !isMenuOpen }"
  >
    <div class="absolute left-1/2 transform -translate-x-1/2 z-[130]">
      <NuxtLink
        to="/"
        @click="closeMenu"
        class="text-lg tracking-wide md:text-2xl font-extralight !text-[#FFFBEB]"
      >
        {{ siteLogo ? siteLogo : siteName }}
      </NuxtLink>
    </div>

    <button
      @click="toggleMenu"
      class="ml-auto w-8 h-8 md:w-10 md:h-10 rounded-full border-1 border-stone-300 bg-stone-700/10 flex items-center justify-center hover:bg-amber-950/30 transition-colors z-[130] relative cursor-pointer p-1.5 md:p-2"
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
          <div class="">
            <NuxtLink
              to="mailto:info@knottyoakpictures.com"
              class="underline hover:no-underline"
            >info@knottyoakpictures.com</NuxtLink>
          </div>
          <div>
            <NuxtLink
              to="tel:+1234567890"
              class="underline hover:no-underline"
            >(123) 456-7890</NuxtLink>
          </div>
          <div>
            <NuxtLink
              to="https://instagram.com/knottyoakpictures"
              target="_blank"
              rel="noopener noreferrer"
              class="underline hover:no-underline"
            >@knottyoakpictures</NuxtLink>
          </div>
          <Nuxtimg src="" />
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