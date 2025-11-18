<script setup>
onMounted(async () => {
  await nextTick()

  const els = Array.from(document.querySelectorAll('.intersect'))
  els.forEach((el, i) => (el.dataset.ioIndex = i))

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return

        const i = Number(entry.target.dataset.ioIndex || 0)
        const delay = 300 + i * 200

        setTimeout(() => {
          entry.target.classList.add('animate-delay')
        }, delay)

        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.3 }
  )

  els.forEach(el => observer.observe(el))
})
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <header>
      <SharedNav />
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer>
      <SharedFooter />
    </footer>
  </UApp>
</template>

<style>
.animate-delay {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: animate-delay;
}

@keyframes animate-delay {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.intersect {
  display: inline-block;
  opacity: 0;
  transform: translateY(10px);
}
</style>
