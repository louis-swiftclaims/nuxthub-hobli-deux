<script lang="ts" setup>
const { isImpersonating, impersonatedUser, stopImpersonation } = useImpersonation()
</script>

<template>
  <UBanner
    v-if="isImpersonating && impersonatedUser"
    icon="i-heroicons-user-circle"
    :title="`Impersonating ${impersonatedUser.email}`"
    :actions="[
      {
        label: 'Stop Impersonating',
        onClick: stopImpersonation,
      }
    ]"
  />
</template>
