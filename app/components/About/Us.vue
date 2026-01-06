<script
  setup
  lang="ts"
>
const team = [
  {
    name: 'Tom Currà',
    role: 'President & Executive Producer',
    description: 'Tom Curra was CEO of PBS’s WVIA Public Media, where he served as executive producer for the studio’s film and television production, which include 11 Emmy nominations and four awards.',
    image: '/tom.webp'
  },
  {
    name: 'Greg Matkosky',
    role: 'Director & Cinematographer',
    description: 'Greg Matkosky is an Emmy and Cine Golden Eagle Award-winning writer/director with nearly 40 years experience in national commercial, international documentary, giant-screen and corporate production across five continents. He received his BA in journalism from Penn State and has an MFA in cinematography from AFI.',
    image: '/greg-bio.jpg'
  }
]
</script>

<template>
  <AboutWrapper
    id="us"
    bg-color="bg-amber-50"
    :z-index="110"
    class="border-t border-stone-200"
  >
    <div class="flex items-center justify-center min-h-screen py-20 pt-36">
      <div class="max-w-6xl px-8 w-full text-black">
        <h1 class="text-5xl font-bold text-center !mb-12">
          About Us
        </h1>

        <div class="flex flex-col md:flex-row gap-10 max-w-3xl mx-auto">
          <!-- Tom Currà: default alignment -->
          <div class="flex-1 flex flex-col items-center md:items-center">
            <div class="mb-4 flex-shrink-0">
              <img
                src="/tom.webp"
                alt="Tom Currà"
                class="w-full md:w-80 h-[400px] md:h-[400px] mx-0 md:mx-auto object-cover shadow-lg"
              />
            </div>
            <div
              class="mx-0 md:mx-auto flex-1 flex flex-col justify-start pt-1 md:pt-0 text-center"
              style="max-width: 330px;"
            >
              <h2 class="text-3xl font-bold !mb-1 text-center">Tom Currà</h2>
              <p class="text-xl font-semibold mb-4 opacity-50 text-center">President & Executive Producer</p>
              <p class="text-lg !font-light opacity-80 text-center">Tom served as the President and CEO of PBS/NPR’s WVIA Public
                Media, where he acted as executive producer
                for the studio’s film and television production,
                which include 11 Emmy nominations and four awards, and two Cine Golden Eagle awards.</p>
            </div>
          </div>

          <!-- Greg Matkosky: right-aligned image flush with edge, bio below image -->
          <div class="flex-1 flex flex-col items-center md:items-end justify-center">
            <div class="mb-4 flex-shrink-0 w-full flex justify-end items-center">
              <img
                src="/greg-bio.jpg"
                alt="Greg Matkosky"
                class="w-full md:w-80 h-[400px] md:h-[400px] object-cover object-center shadow-lg"
                style="margin-right:0;"
              />
            </div>
            <div
              class="mx-0 md:mx-0 flex-1 flex flex-col justify-start pt-1 md:pt-0 items-center text-center"
              style="max-width: 330px;"
            >
              <h2 class="text-3xl font-bold !mb-1 text-center">Greg Matkosky</h2>
              <p class="text-xl font-semibold mb-4 opacity-50 text-center">Director & Cinematographer</p>
              <p class="text-lg !font-light opacity-80 text-center">Greg is an Emmy and Golden
                Eagle Award-winning writer/director with nearly 40
                years experience in national commercial,
                international documentary, giant-screen and
                corporate production across five continents. He
                received his BA in journalism from Penn State
                and has an MFA in cinematography from AFI.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AboutWrapper>
</template>

<style scoped></style>
