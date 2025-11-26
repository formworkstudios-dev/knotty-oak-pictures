<script
  setup
  lang="ts"
>
import { ref } from 'vue'

const tabs = [
  'Stories From The Mines',
  'Looking To The River',
  'Remembering The Sirens',
  'Paesani',
]
const activeTab = ref(0)

</script>

<template>

  <div class="flex flex-col h-screen min-h-screen bg-amber-50 relative">
    <div
      id="content"
      class="flex items-center justify-center relative z-10 flex-1"
    >
      <div
        v-if="activeTab === 0"
        class="text-3xl font-bold text-stone-900 h-full w-full border-2 flex-1 bg-red-100 flex items-center justify-center"
      >
        Stories From The Mines
      </div>
      <div
        v-else-if="activeTab === 1"
        class="text-3xl font-bold text-stone-900 h-full w-full border-2 flex-1 bg-blue-100 flex items-center justify-center"
      >
        Looking To The River
      </div>
      <div
        v-else-if="activeTab === 2"
        class="text-3xl font-bold text-stone-900 h-full w-full border-2 flex-1 bg-green-100 flex items-center justify-center"
      >
        Remembering The Sirens
      </div>
      <div
        v-else-if="activeTab === 3"
        class="text-3xl font-bold text-stone-900 h-full w-full border-2 flex-1 bg-stone-200 flex items-center justify-center"
      >
        Paesani
      </div>
    </div>
    <div
      class="tab-container h-[72px] flex items-start leading-tight justify-between px-8 absolute bottom-0 w-full z-30"
    >
      <button
        v-for="(tab, idx) in tabs"
        :key="tab"
        @click="activeTab = idx"
        class="flex-1 mx-2 px-4 py-2 text-lg text-stone-700 font-semibold rounded-none text-left bg-transparent border-none"
      >
        <span
          class="inline-block border-t-2 border-stone-400 text-xl"
          :class="activeTab === idx ? 'border-stone-900' : 'border-stone-400'"
        >{{ tab }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.tab-container button:hover span {
  /* border-color: #a16207; */
  /* Tailwind amber-700 */
  cursor: pointer;
}
</style>
