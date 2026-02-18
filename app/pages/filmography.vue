<script
  setup
  lang="ts"
>
const introParagraphs = [
  'The friendship and collaboration between Tom Curra and Greg Matkosky began in Pennsylvania, where Tom formed United Studios in the mid-1990s and invited Greg to return home after living and working in Los Angeles for 14 years to collaborate on uniquely visual documentaries that chronicled and celebrated the Commonwealth’s nationally resonant social and cultural history.',
  'In 2004, their collaboration moved to PBS WVIA Public Media, where Tom was hired first as Executive in Charge of Production, and then as CEO, and asked Greg to be Creative Director for Documentary Films. In a 15-year period, they made more than 20 docs, including six feature-length and one giant-screen, that secured both national carriage and international distribution and which received two Emmy Award nominations and won one Emmy and a Cine Golden Eagle award. Their films inspired the creation of an original symphony that musically rendered the historical stories their films cinematically portrayed. Many of their docs have been repurposed into K-12 Pennsylvania history curriculum, and they have been invited to speak at colleges, universities and historical societies about the “making of” their unparalleled body of work.'
]

const filmography = [
  {
    title: 'Stories From The Mines',
    genre: 'Dramatized doc',
    released: '2000',
    tom: 'Producer, EP',
    greg: 'Dir, Writer',
    story: 'Emmy-nominated dramatic reenactments visualize immigrant miners working in early 20th century anthracite coal mines.'
  },
  {
    title: 'Dying Breath',
    genre: 'Cultural doc',
    released: '2003',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'First-person storytelling about old-time miners dying of black-lung disease.'
  },
  {
    title: 'Empty Place At The Table',
    genre: 'Social doc',
    released: '2004',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'Best Social doc, New York Film & Video Awards.'
  },
  {
    title: 'In A Clear Light',
    genre: 'biopic',
    released: '2005',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'Story about William Scranton’s effort to challenge Barry Goldwater’s 1964 presidential campaign rooted in denying passage of the Civil Rights act.'
  },
  {
    title: 'Looking To The River',
    genre: 'environmental',
    released: '2006',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'Feature-length presentation of the history and heritage of the Susquehanna River, the main tributary of the Chesapeake Bay.'
  },
  {
    title: 'The Extraordinary Journey',
    genre: 'Cultural doc',
    released: '2006',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'Feature-length recounting of the Atlantic migration of millions of eastern Europeans to the US in the early 20th century.'
  },
  {
    title: 'The Healing Hero',
    genre: 'Dramatized doc',
    released: '2007',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'Adapted from the stage play about a medal of honor recipient’s incredible WWII experience.'
  },
  {
    title: 'Expedition Chesapeake',
    genre: 'Environmental',
    released: '2007',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'Follow a youth camp’s environmental adventures on a canoe trip on the Chesapeake Bay’s largest tributary.'
  },
  {
    title: 'An Uncommon Conscience',
    genre: 'Biopic',
    released: '2008',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'Biopic charting the career of US Federal judge Max Rosenn and his remarkable judicial vision.'
  },
  {
    title: 'Ubaldo',
    genre: 'Cultural doc',
    released: '2009',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'Shot on location in Italy, the story of a millennium-old cultural tradition celebrated in only two towns in the world, one in Italy and another in the US.'
  },
  {
    title: 'Bread Upon The Water',
    genre: 'Biopic',
    released: '2010',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'A priest’s life of faith and his efforts to embrace the modern world’s challenges to his parishioners.'
  },
  {
    title: 'Paesani',
    genre: 'Cultural doc',
    released: '2011',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'The story of the immigration of Italians to the US in the early 1900s.'
  },
  {
    title: 'Remembering The Sirens',
    genre: 'Cultural doc',
    released: '2011',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'Emmy Award-winning dramatized doc about how jazz evolved from its improvisational roots into the Big-Band sound.'
  },
  {
    title: 'En Pointe',
    genre: 'Biopic',
    released: '2011',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'The story of the founding of the Pennsylvania Ballet and how it galvanized the evolution of ballet in the US.'
  },
  {
    title: 'Camp Victory',
    genre: 'Documentary',
    released: '2012',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'Story about a summer camp for kids with life-threatening physical challenges.'
  },
  {
    title: 'Chocolate Dreams',
    genre: 'Biopic',
    released: '2012',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'Shot on location in Indonesia. How a little chocolate store grew into a $125 million-dollar international candy manufacturer.'
  },
  {
    title: 'Spirit and Speed',
    genre: 'Cultural doc',
    released: '2013',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'The history and heritage of the sport, industry and challenges of thoroughbred horse racing in Pennsylvania.'
  },
  {
    title: 'The Authentic Artist',
    genre: 'Biopic',
    released: '2014',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'Recalls the real-life adventures that formed the inspiration for the work of the great American illustrator.'
  },
  {
    title: 'Little League: A History',
    genre: 'Cultural doc',
    released: '2014',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'Authorized biopic of the creation and evolution of one of America’s great cultural rites-of-passage.'
  },
  {
    title: 'Hearth and Harvest',
    genre: 'Cultural doc',
    released: '2014',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'Feature-length presentation of the story of agriculture in Pennsylvania.'
  },
  {
    title: 'Knoebels',
    genre: 'Biopic',
    released: '2015',
    tom: 'Producer, EP',
    greg: 'Dir, Writer, DP',
    story: 'How 5 generations of one family grew a beloved amusement park from a potato farm they started in 1767.'
  },
  {
    title: 'Expedition Chesapeake',
    genre: 'Environmental',
    released: '2019',
    tom: 'Producer, EP',
    greg: 'Dir, Writer',
    story: 'Giant-screen presentation of the social and cultural history of the largest estuary in North America.'
  }
]
</script>

<template>
  <div class="min-h-screen bg-amber-50 text-stone-900 py-24 md:py-38 px-6">
    <div class="w-full max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold mb-10">Filmography</h1>

      <div class="space-y-6 text-sm leading-relaxed text-stone-800">
        <p
          v-for="(paragraph, index) in introParagraphs"
          :key="index"
        >
          {{ paragraph }}
        </p>
      </div>

      <!-- Mobile layout: cards (no horizontal scrolling) -->
      <div class="mt-12 space-y-6 md:hidden">
        <article
          v-for="row in filmography"
          :key="`${row.released}-${row.title}`"
          class="border border-stone-200 bg-amber-100/30 p-5"
        >
          <h2 class="text-lg font-semibold text-stone-900">
            {{ row.title }}
          </h2>
          <p class="mt-2 text-sm leading-relaxed text-stone-800">
            {{ row.story }}
          </p>

          <div class="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <div class="text-xs uppercase tracking-wide text-stone-600">Genre</div>
              <div class="text-stone-800">{{ row.genre }}</div>
            </div>
            <div>
              <div class="text-xs uppercase tracking-wide text-stone-600">Released</div>
              <div class="text-stone-800">{{ row.released }}</div>
            </div>
            <div>
              <div class="text-xs uppercase tracking-wide text-stone-600">Tom</div>
              <div class="text-stone-800">{{ row.tom }}</div>
            </div>
            <div>
              <div class="text-xs uppercase tracking-wide text-stone-600">Greg</div>
              <div class="text-stone-800">{{ row.greg }}</div>
            </div>
          </div>
        </article>
      </div>

      <!-- Desktop/tablet layout: full table -->
      <div class="mt-12 hidden md:block">
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="border-b border-stone-300">
                <th class="py-3 pr-4 text-left text-xs uppercase tracking-wide text-stone-700">Title</th>
                <th class="py-3 pr-4 text-left text-xs uppercase tracking-wide text-stone-700">Genre</th>
                <th class="py-3 pr-4 text-left text-xs uppercase tracking-wide text-stone-700">Released</th>
                <th class="py-3 pr-4 text-left text-xs uppercase tracking-wide text-stone-700">Tom</th>
                <th class="py-3 pr-4 text-left text-xs uppercase tracking-wide text-stone-700">Greg</th>
                <th class="py-3 text-left text-xs uppercase tracking-wide text-stone-700">The Story</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in filmography"
                :key="`${row.released}-${row.title}`"
                class="border-b border-stone-200 last:border-b-0"
              >
                <td class="py-3 pr-4 align-top text-sm font-medium text-stone-900">{{ row.title }}</td>
                <td class="py-3 pr-4 align-top text-sm text-stone-800">{{ row.genre }}</td>
                <td class="py-3 pr-4 align-top text-sm text-stone-800">{{ row.released }}</td>
                <td class="py-3 pr-4 align-top text-sm text-stone-800">{{ row.tom }}</td>
                <td class="py-3 pr-4 align-top text-sm text-stone-800">{{ row.greg }}</td>
                <td class="py-3 align-top text-sm text-stone-800">{{ row.story }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <NuxtLink
        to="/company-reel"
        class="mt-16 flex justify-center"
      >
        <div class="text-xl text-stone-900 flex items-center gap-2 group">
          View Our Company Reel
          <UIcon
            name="i-mdi-chevron-right"
            class="transition-transform duration-300 group-hover:translate-x-2"
          />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
