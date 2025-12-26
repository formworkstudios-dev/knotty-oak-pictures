<script
  setup
  lang="ts"
>
const items = [
  // previously last two items moved to the front
  {
    id: 1,
    title: 'Expedition Chesapeake',
    year: '',
    image: '/panel/ship.jpg',
    desc: 'Expedition Chesapeake is a giant-screen journey of discovery that follows Emmy-Award winning wildlife biologist and conservationist Jeff Corwin as he navigates on, above and below the bay’s astonishingly diverse environment and celebrates the human history that has imbued this body of water with a soul. <strong>IMAX theaters nationally.</strong>',
    length: ''
  },
  {
    id: 2,
    title: 'Ubaldo',
    year: '',
    image: '/panel/ubaldo-full.webp',
    desc: 'Shot on location in Italy. A cinematic rendition of the nearly millennium-old epic Italian cultural festival “La Festa Dei Ceri”, and its recreation in a small town in the United States. <strong>Nationally distributed</strong>.',
    length: '57 minutes'
  },
  {
    id: 3,
    title: 'Remembering The Sirens',
    year: '',
    image: '/panel/sirens.webp',
    desc: '<strong>Emmy Award winning</strong> and <strong>nationally distributed</strong> film narrated by Leon Redbone that explores the early history of Jazz legends Tommy and Jimmy Dorsey and how their musical vision catalyzed Jazz from its improvisational roots into the Big Band sound.',
    length: '57 minutes'
  },
  {
    id: 4,
    title: 'Little League: A History',
    year: '',
    image: '/panel/little.webp',
    desc: '<strong>Nationally distributed</strong> and presented on ESPN during the Little League World Series broadcast. Narrated by Vin Scully, this documentary is the authorized cinematic biography of one of America’s iconic institutions. Shot on location in Japan.',
    length: '57 minutes'
  },

  {
    id: 5,
    title: 'Frank Schoonover: The Authentic Artist',
    year: '',
    image: '/panel/frank.webp',
    desc: 'A <strong>Cine Golden Eagle winner</strong> that recounts the creative adventures of the master American illustrator. Shot in the wilderness environs of northern Quebec Province and Wyoming’s Bighorn Mountains.',
    length: '57 minutes'
  },
  {
    id: 6,
    title: 'An Empty Place At The Table',
    year: '',
    image: '/panel/table.webp',
    desc: 'Susan Sarandon narrates this New York Film and Video Festival winner for <strong>Best Social Documentary</strong> about an art exhibit that memorializes women and children murdered in acts of domestic violence. <strong>Nationally distributed</strong>.',
    length: '28 minutes'
  },
  {
    id: 7,
    title: 'Stories From The Mines',
    year: 2001,
    image: '/panel/mines.webp',
    desc: '<strong>Nationally distributed</strong>, 2001 feature-length <strong>Emmy-nominated</strong> dramatized documentary narrated by Academy Award winner Jason Miller that presents the epic struggle between early 20th century immigrant coal miners and American industrialists.',
    length: '143 minutes'
  },
  {
    id: 8,
    title: 'Hearth & Harvest',
    year: '',
    image: '/panel/harvest.webp',
    desc: '<strong>Feature-length</strong> visual tone poem that blends the story of agricultural heritage with contemporary issues that challenge farmers. Broadcast throughout Pennsylvania on the Pennsylvania Public Television network.',
    length: '86 minutes'
  },
  {
    id: 9,
    title: 'Spirit & Speed',
    year: '',
    image: '/panel/spirit.webp',
    desc: 'A behind-the-scenes look at the sport, art, industry and controversies of thoroughbred horse racing. Broadcast throughout Pennsylvania on the Pennsylvania Public Television network.',
    length: '57 minutes'
  },
  {
    id: 10,
    title: 'The Healing Hero',
    year: '',
    image: '/panel/healing.webp',
    desc: '<strong>Docudrama</strong> that reenacts Medal of Honor recipient Gino Merli’s amazing story of one night during World War II when he killed 51 German soldiers.',
    length: '28 minutes'
  },
  {
    id: 11,
    title: 'Fit Club',
    year: '',
    image: '/panel/fit.png',
    desc: 'Short film about the competitive martial artist and wrestling coach Matt Marcinek, who was born with cerebral palsy but has defined his life by a commitment to excellence.',
    length: ''
  },

  // {
  //   id: 3,
  //   title: 'Looking to the River',
  //   year: '',
  //   image: '',
  //   desc: 'Description'
  // },

  // remaining items

  // {
  //   id: 7,
  //   title: 'Paesani',
  //   year: '',
  //   image: '/italian.png',
  //   desc: 'An intimate portrait of Italian-American roots, traditions, and the ties that bind families across generations.'
  // },

  // {
  //   id: 8,
  //   title: 'Chocolate Dreams',
  //   year: '',
  //   image: '',
  //   desc: 'Description'
  // },

  // move Little League & Ubaldo to the end and remove images (black bg)
];
</script>

<template>
  <div class="min-h-screen bg-stone-900 text-stone-50 flex flex-col items-center justify-center py-32 md:py-38 px-6 ">
    <h1 class="text-4xl font-bold mb-10 pb-10">Our Work</h1>
    <div class="flex flex-col gap-8 w-full max-w-4xl">
      <div
        v-for="movie in items"
        :key="`${movie.id}-${movie.title}`"
        class="flex flex-row items-start gap-6 py-4"
      >
        <div class="w-1/3 h-48 bg-stone-800 flex items-center justify-center">
          <img
            :src="movie.image"
            alt="movie.title"
            class="object-cover h-full w-full"
          />
        </div>
        <div class="flex flex-col w-2/3">
          <h2 class="text-lg font-semibold">{{ movie.title }}</h2>
          <p
            class="text-sm mt-2"
            v-html="movie.desc"
          ></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  object-fit: cover;
}
</style>
