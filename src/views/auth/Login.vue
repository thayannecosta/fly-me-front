<template>
  <div>
    <main class="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <form
        @submit.prevent="submitLogin"
        class="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Login</h2>
        <label class="block mb-2 text-gray-700 dark:text-gray-200">{{ t('email') }}</label>
        <input
          type="email"
          v-model="email"
          class="w-full p-2 mb-4 border rounded"
          required
        />
        <label class="block mb-2 text-gray-700 dark:text-gray-200">{{ t('password') }}</label>
        <input
          type="password"
          v-model="password"
          class="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
          :disabled="loading"
        >
          <svg
            v-if="loading"
            class="w-5 h-5 mr-2 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span>{{ loading ? t('loading') + '...' : t('login') }}</span>
        </button>

        <p v-if="error" class="text-red-500 text-center mt-3">{{ error }}</p>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../store/authStore'


const { t } = useI18n()
const email = ref('admin@mail.com')
const password = ref('admin123')
const toast = useToast()
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()


const submitLogin = async () => {
  loading.value = true  
  try {
    const response = await authStore.login({
      email: email.value,
      password: password.value 
    });
    
    if(response){
      toast.success(t('loginSuccess'))
      router.push('/dashboard')
    }
  } catch (error) {
    toast.error(t('loginError'))
  } finally {
    loading.value = false
  }
}
</script>


