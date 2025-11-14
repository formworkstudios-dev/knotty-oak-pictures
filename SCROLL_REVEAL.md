# Scroll-Triggered Reveal System

Fast, scalable scroll animations using native Intersection Observer API.

## Quick Start

```vue
<script setup lang="ts">
const { reveal } = useScrollReveal();
</script>

<template>
  <!-- This element reveals when scrolled into view -->
  <div :ref="reveal" class="reveal">
    <h2>I appear when you scroll to me!</h2>
  </div>
</template>
```

## How It Works

1. **Intersection Observer** watches when elements enter viewport
2. When element is ~10% visible, adds `.active` class
3. CSS transitions handle the animation (fast, GPU-accelerated)
4. **No JavaScript animations** = smooth 60fps performance

## Usage Pattern

### 1. Import the composable

```vue
<script setup lang="ts">
const { reveal } = useScrollReveal();
</script>
```

### 2. Add `:ref="reveal"` to any element

```vue
<div :ref="reveal" class="reveal">
  Content here
</div>
```

### 3. Use any reveal class (from main.css)

- `reveal` - Fade up (default)
- `reveal-fade` - Just fade
- `reveal-zoom` - Scale up
- `reveal-slide-left` - Slide from left
- `reveal-slide-right` - Slide from right

### 4. Optional modifiers

- `reveal-fast` - 0.25s duration
- `reveal-slow` - 0.8s duration
- `reveal-delay-100` through `reveal-delay-500` - Stagger timing

## Examples

### Staggered Cards

```vue
<div class="grid grid-cols-3 gap-4">
  <div :ref="reveal" class="reveal">Card 1</div>
  <div :ref="reveal" class="reveal reveal-delay-100">Card 2</div>
  <div :ref="reveal" class="reveal reveal-delay-200">Card 3</div>
</div>
```

### Alternating Sides

```vue
<div :ref="reveal" class="reveal-slide-left">From left</div>
<div :ref="reveal" class="reveal-slide-right">From right</div>
```

### Fast Zoom

```vue
<div :ref="reveal" class="reveal-zoom reveal-fast">
  Fast entrance!
</div>
```

## Performance

✅ **GPU-accelerated** - Uses CSS transforms  
✅ **Lazy** - Only observes elements you specify  
✅ **Lightweight** - No external libraries (~40 lines of code)  
✅ **Smart** - Automatically cleans up on component unmount  
✅ **Efficient** - Single observer for all elements

## When to Use What

| Element Location                        | Use This                                 |
| --------------------------------------- | ---------------------------------------- |
| **Above fold** (always visible on load) | CSS instant animation (`reveal-instant`) |
| **Below fold** (scroll to see)          | Scroll reveal (`:ref="reveal"`)          |

## Live Example

See `app/components/SCROLL_REVEAL_EXAMPLE.vue` for working examples.

## Customization

Edit trigger point in `app/composables/useScrollReveal.ts`:

```ts
{
  threshold: 0.1,           // 10% of element visible
  rootMargin: '0px 0px -50px 0px'  // Trigger 50px before entering
}
```
