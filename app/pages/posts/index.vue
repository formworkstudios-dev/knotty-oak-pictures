<template>
    <UContainer>
        <div class="flex flex-col gap-6">
            <h1>Posts</h1>
            <div class="flex flex-col gap-4">
                <NuxtLink v-for="post in posts" :key="post.path" :to="post.path">
                    <h2>{{ post.title }}</h2>
                    <p>{{ post.description }}</p>
                </NuxtLink>
            </div>
        </div>
    </UContainer>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('posts-list', () => {
    return queryCollection('posts')
        .order('date', 'DESC')
        .select('title', 'path', 'description')
        .all()
})

</script>
