import type { User } from 'better-auth'

export const useImpersonation = () => {
  const { client, session } = useAuth()
  const toast = useToast()

  const impersonatedUser = useState<User | null>('impersonated-user', () => null)
  const isImpersonating = computed(() => !!impersonatedUser.value)

  onMounted(async () => {
    if (session.value?.impersonatedBy) {
      await stopImpersonation()
    }
  })

  async function startImpersonation(user: User) {
    try {
      await client.admin.impersonateUser({ userId: user.id })
      impersonatedUser.value = user
      toast.add({
        title: 'Success',
        description: 'Impersonation started successfully',
        color: 'success',
      })
    } catch (error) {
      toast.add({
        title: 'Error',
        description: 'Failed to start impersonation',
        color: 'error',
      })
    }
  }

  async function stopImpersonation() {
    try {
      await client.admin.stopImpersonating()
      impersonatedUser.value = null
      toast.add({
        title: 'Success',
        description: 'Impersonation stopped successfully',
        color: 'success',
      })
    } catch (error) {
      toast.add({
        title: 'Error',
        description: 'Failed to stop impersonation',
        color: 'error',
      })
    }
  }

  return {
    isImpersonating,
    impersonatedUser,
    startImpersonation,
    stopImpersonation,
  }
} 
