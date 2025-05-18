<script setup lang="ts">
const footerLinks = [
  {
    label: 'Source code',
    to: 'https://github.com/atinux/nuxthub-better-auth',
    target: '_blank',
  },
  {
    label: 'NuxtHub',
    to: 'https://hub.nuxt.com',
    target: '_blank',
  },
  {
    label: 'Better Auth',
    to: 'https://better-auth.com',
    target: '_blank',
  },
  {
    label: 'Nuxt UI Pro',
    to: 'https://ui.nuxt.com/pro',
    target: '_blank',
  },
]
</script>

<template>
  <footer class="w-full border-t bg-background py-6 mt-10">
    <div class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
      <p class="text-sm text-muted-foreground">
        © {{ new Date().getFullYear() }} BetterAuth. All rights reserved.
      </p>
      <nav class="flex gap-4 sm:gap-6">
        <ULink 
          v-for="link in footerLinks" 
          :key="link.label" 
          :to="link.to" 
          :target="link.target"
          class="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          {{ link.label }}
        </ULink>
      </nav>
    </div>
  </footer>
</template>
