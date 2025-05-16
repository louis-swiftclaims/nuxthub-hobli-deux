<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  auth: {
    only: 'guest',
    redirectUserTo: '/user',
  },
})

const auth = useAuth()
const toast = useToast()

const fields = [
  {
    name: 'email',
    type: 'text' as const,
    label: 'Email',
    placeholder: 'Enter your email',
    required: true
  }, {
    name: 'password',
    label: 'Password',
    type: 'password' as const,
    placeholder: 'Enter your password'
  }
]

const providers = [
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    onClick: () => {
      auth.signIn.social({ provider: 'github', callbackURL: '/user' })
    }
  }
]

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
  try {
    const { data, error } = await auth.signIn.email({
      email: payload.data.email,
      password: payload.data.password,
    })
    console.log('User', data)
    if (data) {
      toast.add({
        title: 'Successfully signed in',
        color: 'success',
      })
      await navigateTo('/user')
    } else {
      toast.add({
        title: error.message,
        color: 'error',
      })
    }
  } catch (error: any) {
    toast.add({
      title: error.message,
      color: 'error',
    })
  }
}

/* async function signIn() {
  if (loading.value) return
  loading.value = true
  const { error } = await auth.signIn.email({
    email: email.value,
    password: password.value,
  })
  if (error) {
    toast.add({
      title: error.message,
      color: 'error',
    })
  } else {
    await navigateTo('/user')
    toast.add({
      title: `You have been signed in!`,
    })
  }
  loading.value = false
}

async function signUp() {
  if (loading.value) return
  loading.value = true
  const { error } = await auth.signUp.email({
    email: email.value,
    password: password.value,
    name: name.value,
  })
  if (error) {
    toast.add({
      title: error.message,
      color: 'error',
    })
  } else {
    toast.add({
      title: `You have been signed up!`,
    })
    await navigateTo('/user')
  }
  loading.value = false
} */
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema
        title="Login"
        description="Enter your credentials to access your account."
        icon="i-lucide-user"
        :fields
        :providers
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>
