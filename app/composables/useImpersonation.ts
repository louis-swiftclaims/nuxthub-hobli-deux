import type { User } from 'better-auth'

export const useImpersonation = () => {
  const auth = useAuth()
  const toast = useToast()
  const router = useRouter()

  const impersonatedUser = useState<User | null>('impersonated-user', () => null)
  const isImpersonating = computed(() => !!impersonatedUser.value)

  async function startImpersonation(user: User) {
    try {
      await auth.client.admin.impersonateUser({ userId: user.id })
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
      await auth.client.admin.stopImpersonating()
      impersonatedUser.value = null
      toast.add({
        title: 'Success',
        description: 'Impersonation stopped successfully',
        color: 'success',
      })
      router.go(0)
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
