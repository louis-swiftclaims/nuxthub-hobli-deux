<script lang="ts" setup>
const { isImpersonating, impersonatedUser, stopImpersonation } = useImpersonation()
</script>

<template>
  <Callout v-if="isImpersonating && impersonatedUser" class="rounded-none">
    <div class="flex items-center justify-between text-sm">
      <span>
        Impersonating user:
        {{ impersonatedUser.email }}
      </span>
      <UButton label="Stop Impersonating" size="xs" @click="stopImpersonation" />
    </div>
  </Callout>
</template>
