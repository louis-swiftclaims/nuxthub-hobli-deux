<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const props = defineProps({
  schema: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  fields: {
    type: Array,
    default: () => []
  },
  providers: {
    type: Array,
    default: () => []
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['submit'])
const state = ref({})

const handleSubmit = (event: FormSubmitEvent<any>) => {
  emit('submit', event)
}
</script>

<template>
  <div>
    <div class="mb-4" :class="ui.title || ''">
      <h2 class="text-xl font-semibold">{{ title }}</h2>
      <p class="text-sm text-muted-foreground" :class="ui.description || ''">
        {{ description }}
      </p>
    </div>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="handleSubmit">
      <UFormField 
        v-for="field in fields" 
        :key="field.name"
        :name="field.name"
        :label="field.label"
      >
        <UInput 
          v-model="state[field.name]"
          :type="field.type"
          :placeholder="field.placeholder"
        />
      </UFormField>

      <UButton type="submit" block>
        {{ title }}
      </UButton>
    </UForm>

    <div v-if="providers && providers.length" class="mt-6">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t"></span>
        </div>
        <div class="relative flex justify-center text-xs">
          <span class="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div class="mt-4 grid gap-2">
        <UButton 
          v-for="provider in providers"
          :key="provider.label"
          type="button"
          variant="outline"
          block
          :icon="provider.icon"
          @click="provider.onClick"
        >
          {{ provider.label }}
        </UButton>
      </div>
    </div>
  </div>
</template> 