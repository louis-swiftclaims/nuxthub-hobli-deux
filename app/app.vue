<script setup lang="ts">
useSeoMeta({
  title: 'NuxtHub x BetterAuth',
  description: 'NuxtHub x BetterAuth - Demo of using BetterAuth with NuxtHub',
  ogImage: '/og.png',
  twitterImage: '/og.png',
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />
    <main class="flex-1">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
  </UApp>
</template>
