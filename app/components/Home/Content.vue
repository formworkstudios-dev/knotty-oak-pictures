<script
  setup
  lang="ts"
>
import { ref, computed } from 'vue'

const items = Array.from({ length: 8 }).map((_, i) => ({ id: i + 1, title: `Item ${i + 1}` }))
const colors = ['#FEF3C7', '#FEE2E2', '#E9D5FF', '#DBEAFE', '#E6FFFA', '#FEF0C7', '#FFF7ED', '#F8FAFC']

const visibleCount = 4
const itemWidthPercent = 25
const maxIndex = Math.max(0, items.length - visibleCount)
// start so the left edge of item 4 (1-based) is aligned to the left of the viewport
const currentIndex = ref(3)

function prev() {
  currentIndex.value = Math.max(0, currentIndex.value - 1)
}

function next() {
  currentIndex.value = Math.min(maxIndex, currentIndex.value + 1)
}

// Shift the track so first visible slide is centered
const trackStyle = computed(() => ({
  // use vw units consistently because items are sized with vw below
  transform: `translateX(-${currentIndex.value * itemWidthPercent}vw)`,
  transition: 'transform 450ms cubic-bezier(.22,.9,.37,1)',
  display: 'flex',
}))
</script>

<template>
  <div class="w-full mx-auto">
    <div class="relative overflow-hidden">
      <!-- buttons -->
      <button
        @click="prev"
        :disabled="currentIndex === 0"
        class="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 disabled:opacity-40"
      >‹</button>

      <button
        @click="next"
        :disabled="currentIndex === maxIndex"
        class="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 disabled:opacity-40"
      >›</button>

      <!-- viewport -->
      <div class="w-full overflow-hidden">
        <!-- track -->
        <div :style="trackStyle">
          <div
            v-for="item in items"
            :key="item.id"
            class="flex-shrink-0"
            :style="{ width: itemWidthPercent + 'vw' }"
          >
            <div
              class="h-screen flex items-center justify-center text-center rounded-lg"
              :style="{ backgroundColor: colors[(item.id - 1) % colors.length], color: '#0f172a' }"
            >
              <div>
                <div class="text-xl font-semibold">{{ item.title }}</div>
                <div class="text-sm opacity-90 mt-2">Description for {{ item.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex[style] {
  will-change: transform;
}
</style>
