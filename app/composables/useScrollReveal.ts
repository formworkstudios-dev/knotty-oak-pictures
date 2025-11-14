// Composable for scroll-reveal animations
// Usage: const { reveal } = useScrollReveal()

import type { ComponentPublicInstance } from "vue";

export const useScrollReveal = () => {
  const elements = ref<Set<Element>>(new Set());
  let observer: IntersectionObserver | null = null;

  const reveal = (el: Element | ComponentPublicInstance | null) => {
    if (!el || !import.meta.client) return;

    // Handle Vue component instances
    const element = "$el" in el ? el.$el : el;
    if (!(element instanceof Element)) return;

    elements.value.add(element);

    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
              // Optionally unobserve after revealing (set once: true)
              // observer?.unobserve(entry.target)
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );
    }

    observer.observe(element);
  };

  onBeforeUnmount(() => {
    observer?.disconnect();
    elements.value.clear();
  });

  return { reveal };
};
