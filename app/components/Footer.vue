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
  <UFooter :items="footerLinks" />
</template>
