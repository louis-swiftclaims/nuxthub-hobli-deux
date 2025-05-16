<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import type { User } from 'better-auth'

const auth = useAuth()
const toast = useToast()

definePageMeta({
  auth: {
    only: 'admin',
  },
})

const { isImpersonating, startImpersonation } = useImpersonation()

const { data: usersData, refresh } = await useAsyncData('users', async () => {
  const { data } = await auth.client.admin.listUsers({
    query: {
      limit: 100,
      offset: 0,
    },
  })
  return data
})

const users = computed(() => usersData.value?.users ?? [])

const columns: TableColumn<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
  },
]

const roles = ['user', 'admin'] as const
type Role = typeof roles[number]

async function updateUserRole(userId: string, newRole: Role) {
  try {
    await auth.client.admin.setRole({
      userId,
      role: newRole,
    })
    await refresh()
    toast.add({
      title: 'Success',
      description: 'User role updated successfully',
      color: 'success',
    })
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to update user role',
      color: 'error',
    })
  }
}

const handleRefresh = () => {
  refresh()
}
</script>

<template>
  <UContainer>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-semibold">
            User Management
          </h1>
          <UButton
            icon="i-heroicons-arrow-path"
            color="neutral"
            variant="ghost"
            @click="handleRefresh"
          >
            Refresh
          </UButton>
        </div>
      </template>

      <UTable
        :data="users"
        :columns
        :loading="!usersData"
      >
        <template #role-cell="{ row }">
          <UBadge
            :color="row.original.role === 'admin' ? 'error' : 'primary'"
            variant="subtle"
          >
            {{ row.original.role }}
          </UBadge>
        </template>

        <template #createdAt-cell="{ row }">
          {{ new Date(row.original.createdAt).toLocaleDateString() }}
        </template>

        <template #actions-cell="{ row }">
          <div class="flex items-center gap-2">
            <UDropdownMenu
              :items="[
                {
                  label: 'Change Role',
                  icon: 'i-heroicons-user-circle',
                  children: roles.map(role => ({
                    label: role.charAt(0).toUpperCase() + role.slice(1),
                    onClick: () => updateUserRole(row.original.id, role),
                    disabled: role === row.original.role,
                  })),
                },
                {
                  label: 'Impersonate',
                  icon: 'i-heroicons-user',
                  onClick: () => startImpersonation(row.original),
                  disabled: isImpersonating,
                },
              ]"
            >
              <UButton
                color="neutral"
                variant="ghost"
                icon="i-lucide-ellipsis-vertical"
              />
            </UDropdownMenu>
          </div>
        </template>
      </UTable>
    </UCard>
  </UContainer>
</template>
