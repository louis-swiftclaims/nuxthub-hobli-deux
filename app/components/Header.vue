<script setup lang="ts">
const { signOut, loggedIn, user } = useAuth()

const headerLinks = computed(() => {
  const isAdmin = user.value?.role === 'admin'
  return [
    {
      label: 'Home',
      to: '/',
    },
    {
      label: 'User',
      to: '/user',
    },
    {
      label: 'Secret',
      to: '/secret',
    },
    {
      label: 'About',
      to: '/about',
    },
    ...(isAdmin ? [
      {
        label: 'Admin',
        to: '/admin',
      }
    ] : []),
  ]
})
</script>
<template>
  <div>
    <UHeader>
      <template #title>
        NuxtHub x BetterAuth
      </template>

      <UNavigationMenu :items="headerLinks" />

      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/atinux/nuxthub-better-auth"
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          target="_blank"
        />
        <UButton v-if="loggedIn" color="neutral" @click="signOut({ redirectTo: '/' })">
          Sign Out
        </UButton>
      </template>

      <template #body>
        <UNavigationMenu :items="headerLinks" orientation="vertical" class="-mx-2.5" />
      </template>
    </UHeader>
  </div>
</template>
