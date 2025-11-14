# Reveal Animation System

Simple, fast, reusable CSS-based reveal animations. No libraries needed.

## Quick Start

```vue
<script setup lang="ts">
import { ref, onMounted } from "vue";

const show = ref(false);
onMounted(() => {
  setTimeout(() => (show.value = true), 50);
});
</script>

<template>
  <h1 :class="['reveal-zoom', { active: show }]">I will zoom in!</h1>
</template>
```

## Available Classes

### Base Animations

- `reveal` - Fade up (default, 0.6s)
- `reveal-fade` - Just fade, no movement
- `reveal-zoom` - Scale from 0.9 to 1
- `reveal-slide-left` - Slide in from left
- `reveal-slide-right` - Slide in from right

### Speed Modifiers

- `reveal-fast` - 0.4s duration
- `reveal-slow` - 1s duration
- (default is 0.6s)

### Delay Modifiers (for staggered animations)

- `reveal-delay-100` - 0.1s delay
- `reveal-delay-200` - 0.2s delay
- `reveal-delay-300` - 0.3s delay
- `reveal-delay-400` - 0.4s delay
- `reveal-delay-500` - 0.5s delay

## Examples

### Basic Zoom

```vue
<h1 :class="['reveal-zoom', { active: show }]">
  Zoom In!
</h1>
```

### Fast Slide

```vue
<div :class="['reveal-slide-left reveal-fast', { active: show }]">
  Fast slide from left
</div>
```

### Staggered List

```vue
<div :class="['reveal', { active: show }]">First</div>
<div :class="['reveal reveal-delay-100', { active: show }]">Second</div>
<div :class="['reveal reveal-delay-200', { active: show }]">Third</div>
```

### Multiple Elements, One State

```vue
<script setup>
const show = ref(false);
onMounted(() => setTimeout(() => (show.value = true), 50));
</script>

<template>
  <h1 :class="['reveal-zoom', { active: show }]">Title</h1>
  <p :class="['reveal reveal-delay-200', { active: show }]">
    Subtitle appears after
  </p>
  <button :class="['reveal reveal-delay-400', { active: show }]">
    Button last
  </button>
</template>
```

## How It Works

1. Elements start with `opacity: 0` and a transform (e.g., `translateY(20px)`)
2. When `.active` class is added, they transition to `opacity: 1` and `transform: none`
3. CSS handles the animation smoothly
4. You control timing with the reactive `show` variable

## Customization

All classes are in `app/assets/css/main.css`. Modify:

- Duration: change `0.6s` values
- Easing: change `ease-out` to `ease-in-out`, `cubic-bezier()`, etc.
- Distance: change `translateY(20px)` values
- Add new animations by copying the pattern

## See Full Examples

Check `app/components/REVEAL_EXAMPLES.vue` for all animation types in action.
