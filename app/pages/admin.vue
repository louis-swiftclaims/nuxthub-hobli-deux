<script lang="ts" setup>
const auth = useAuth()

definePageMeta({
  auth: {
    only: 'admin',
  },
})

const { data: users } = await useAsyncData('users', () => {
  return auth.client.admin.listUsers({
    query: {
      limit: 10,
      offset: 0,
    },
  })
})
</script>

<template>
  <div>
    <h1>Admin</h1>
    <pre>{{ users }}</pre>
  </div>
</template>
