<template>
    <div>
        <nav class="z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div class="px-3 py-3 lg:px-5 lg:pl-3">
                <div class="flex items-center justify-between">
                    <div class="flex items-center justify-start">
                            <a href="/dashboard" class="flex items-center space-x-3 rtl:space-x-reverse">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8" width="60" height="60" viewBox="0 0 64 64">
                                    <path d="M2 32 L50 2 L42 32 L60 38 L42 44 L50 62 Z" fill="#1DA1F2"/>
                                    </svg>
                                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FlyMe</span>
                            </a>
                    </div>
                    <div class="flex items-center">
                        <div class="hidden mr-3 -mb-1 sm:block">
                            <span><template shadowrootmode="closed"><div class="widget widget-lg"><a class="btn" href="https://github.com/themesberg/flowbite-admin-dashboard" rel="noopener" target="_blank" aria-label="Star themesberg/flowbite-admin-dashboard on GitHub"><svg viewBox="0 0 16 16" width="16" height="16" class="octicon octicon-star" aria-hidden="true"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path></svg>&nbsp;<span>Star</span></a><a class="social-count" href="https://github.com/themesberg/flowbite-admin-dashboard/stargazers" rel="noopener" target="_blank" aria-label="2600 stargazers on GitHub">2,600</a></div></template></span>
                        </div>                    
                        <div class="flex items-center ml-3">
                            <div>
                                <button type="button" @click="toogleNavMenu" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                                    <svg class="mx-auto mb-1 text-gray-500 w-7 h-7 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>
                            <div 
                                v-if="openNavMenu"
                                class="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow" 
                                style="position: absolute; margin-top: 200px; margin-left: -150px;" 
                                data-popper-placement="bottom"
                            >
                                <div class="px-4 py-3" role="none">
                                    <p class="text-sm text-gray-700" role="none">
                                        {{ user.name }}
                                    </p>
                                    <p class="text-sm font-medium text-gray-700 truncate" role="none">
                                        {{user.email}}
                                    </p>
                                </div>
                                <ul class="py-1" role="none">
                                    <li>
                                        <a @click="logout"  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">{{ t('logout') }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="flex items-center ml-3">
                            <button 
                                @click="toggleDropdown"
                                class="flex items-center space-x-1 px-3 py-2 border rounded bg-gray-800 text-gray-100 hover:bg-gray-500"
                            >
                                <span>{{ currentLanguageLabel }}</span>
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                            </button>
                            <div
                                v-if="showDropdown"
                                class="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow" 
                                style="position: absolute; margin-top: 200px; " 
                            >
                                <ul>
                                <li v-for="lang in languages" :key="lang.code">
                                    <button
                                    @click="setLanguage(lang.code)"
                                    class="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                    {{ lang.label }}
                                    </button>
                                </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '../../store/authStore'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store/userStore'

const { locale, t } = useI18n();
const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()
const userStore = useUserStore()
let openNavMenu = ref(false);

const user = computed(() => userStore.userLogged)

const showDropdown = ref(false)
const toggleDropdown = () => (showDropdown.value = !showDropdown.value)

const languages = [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' },
    { code: 'es', label: 'Español' }
]


const toogleNavMenu = () => {
    openNavMenu.value = !openNavMenu.value
}

const logout = async () => {
    try {
        const response = await authStore.logout()
        if(response){
            toast.warning(t('logoutSuccess'))
            router.push('/login')
        }
    } catch (error) {
        toast.error(t('logoutError'))
    }
}

const currentLanguageLabel = computed(() => {
    const lang = languages.find(l => l.code === locale.value)
    return lang ? lang.label : ''
});

const setLanguage = (code) => {
    locale.value = code
    showDropdown.value = false
}

    onMounted(async () => {
    await userStore.actionGetMe()
})
</script>