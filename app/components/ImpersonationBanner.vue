<script lang="ts" setup>
const { isImpersonating, impersonatedUser, stopImpersonation } = useImpersonation()
</script>

<template>
  <UAlert
    v-if="isImpersonating && impersonatedUser"
    color="warning"
    variant="soft"
    class="rounded-none"
  >
    <template #title>
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-exclamation-triangle" />
        <span>Impersonating User</span>
      </div>
    </template>
    <template #description>
      <div class="flex items-center gap-2">
        <span>You are currently impersonating</span>
        <UBadge
          color="warning"
          variant="soft"
        >
          {{ impersonatedUser.email }}
        </UBadge>
        <span>Any actions you take will be performed as this user.</span>
      </div>
    </template>
    <template #actions>
      <UButton
        color="warning"
        variant="soft"
        @click="stopImpersonation"
      >
        Stop Impersonating
      </UButton>
    </template>
  </UAlert>
</template>
