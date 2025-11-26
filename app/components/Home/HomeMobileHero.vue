<template>
  <div class="mobile-hero-block md:hidden">
    <transition-group
      name="mobile-line-fade"
      tag="div"
    >
      <div
        v-for="(line, idx) in lines"
        :key="`mobile-line-${idx}`"
        class="mobile-hero-line"
        :style="`animation-delay: ${idx * 350}ms;`"
      >
        {{ line }}
      </div>
    </transition-group>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { defineProps } from 'vue'
const props = defineProps<{ lines: string[] }>()
</script>

<style scoped>
.mobile-hero-block {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1.5rem 1rem 2rem 1rem;
  width: 100vw;
  max-width: 90vw;
  text-align: left;
  z-index: 10;
}

.mobile-hero-line {
  color: #F8F6F0;
  font-family: "Mulish", sans-serif;
  font-weight: 200;
  font-size: 1.7rem;
  line-height: 2.2rem;
  margin-bottom: 0.7rem;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.18);
  word-break: break-word;
  opacity: 0;
  filter: blur(12px);
  animation: mobileLineFadeIn 0.8s cubic-bezier(.77, .2, .32, 1) forwards;
}

@keyframes mobileLineFadeIn {
  from {
    opacity: 0;
    filter: blur(12px);
    transform: translateY(16px);
  }

  60% {
    opacity: 0.7;
    filter: blur(4px);
    transform: translateY(4px);
  }

  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}

.mobile-line-fade-enter-active {
  transition: opacity 0.7s, transform 0.7s;
}

.mobile-line-fade-leave-active {
  transition: opacity 0.4s;
}

.mobile-line-fade-enter-from,
.mobile-line-fade-leave-to {
  opacity: 0;
  transform: translateY(16px);
}

.mobile-line-fade-enter-to,
.mobile-line-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>