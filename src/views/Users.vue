<template>
    <div>
        <div id="main-content" class="relative w-full min-h-full h-full overflow-y-auto bg-gray-50">
            <main>      
                <div class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
                    <div class="w-full mb-1">
                        <div class="mb-4">
                            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl">Lista de Usuários</h1>
                        </div>                        
                    </div>
                </div>
                <div class="flex flex-col">
                    <div class="overflow-x-auto">
                        <div class="inline-block min-w-full align-middle">
                            <div class="overflow-hidden shadow">
                                <table class="min-w-full divide-y divide-gray-200 table-fixed">
                                    <thead class="bg-gray-100">
                                        <tr>
                                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-400 uppercase">
                                                Nome
                                            </th>
                                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-400 uppercase">
                                                Email
                                            </th>                                            
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y ">
                                        <pre>{{user}}</pre>                        
                                        <tr v-for="user in users" :key="user.id" class="hover:bg-gray-100 dark:hover:bg-gray-200">                         
                                            <td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-400 truncate xl:max-w-xs">
                                                {{ user.name }}
                                            </td>
                                            <td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-400 truncate xl:max-w-xs">
                                                {{ user.email }}
                                            </td>                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>        
        </div>
    </div>
</template>

<script setup>
    import { onMounted, computed } from 'vue'
    import { useTravelRequestStore } from '../store/travelStore'
    import { useUserStore } from '../store/userStore'
    import { useRouter } from 'vue-router'
    import { useI18n } from 'vue-i18n';
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification'

    const toast = useToast()
    const { t } = useI18n();
    const router = useRouter();
    const userStore = useUserStore();
    const travelStore = useTravelRequestStore();  
    const travelRequests = computed(() => travelStore.travelRequests ? travelStore.travelRequests.value : '');
    
    const users = computed(() => userStore.users.value)

    onMounted(async () => {
        await userStore.fetchUsers();
        await travelStore.actionGetTravelRequests();
    });
</script>