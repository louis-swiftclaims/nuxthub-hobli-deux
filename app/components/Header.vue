<script setup lang="ts">
const { signOut, loggedIn, user } = useAuth()
const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

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
    <header class="sticky top-0 z-50 w-full border-b bg-background">
      <div class="container flex h-16 items-center justify-between gap-4">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <UIcon name="i-simple-icons-nuxtdotjs" />
          <span class="text-sm font-bold">
            BetterAuth
          </span>
        </div>

        <!-- Navigation Menu - Desktop -->
        <div class="hidden md:block">
          <UNavigationMenu :items="headerLinks" variant="link" />
        </div>

        <!-- Right section -->
        <div class="flex items-center gap-2">
          <!-- Color mode toggle -->
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-moon-20-solid"
            :aria-label="colorMode.preference === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleColorMode"
          />

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
        </div>
      </div>

      <!-- Mobile navigation menu -->
      <UCollapsible class="md:hidden border-t">
        <template #button>
          <div class="container flex h-12 items-center justify-between">
            <span class="text-sm font-medium">Menu</span>
            <UIcon name="i-heroicons-chevron-down-20-solid" class="h-5 w-5" />
          </div>
        </template>
        <div class="container py-4">
          <UNavigationMenu :items="headerLinks" orientation="vertical" class="-mx-2.5" />
        </div>
      </UCollapsible>
    </header>
  </div>
</template>
