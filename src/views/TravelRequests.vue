<template>
    <div>
        <div id="main-content" class="relative w-full min-h-full h-full overflow-y-auto bg-gray-50">
            <main>      
                <div class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
                    <div class="w-full mb-1">
                        <div class="mb-4">
                            <nav class="flex mb-5" aria-label="Breadcrumb">
                                
                            </nav>
                            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl">Solicitações de Viagens</h1>
                        </div>
                        <div class="sm:flex">
                            <div class="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0">
                                <form class="lg:pr-3" action="#" method="GET">
                                <label for="users-search" class="sr-only">Search</label>
                                <div class="relative mt-1 lg:w-64 xl:w-96">
                                    <input type="text" name="email" id="users-search" class="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:placeholder-gray-400" placeholder="Search for users">
                                </div>
                                </form>                
                            </div>
                            <div class="flex items-center ml-auto space-x-2 sm:space-x-3">
                                <button @click="callFormTravelRequest()" class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto ">
                                    <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                    Solicitar Viagem
                                </button>
                            </div>
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
                                                Solicitante
                                            </th>
                                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-400 uppercase">
                                                Destino
                                            </th>
                                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-400 uppercase">
                                                Ida
                                            </th>
                                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-400 uppercase">
                                                Volta
                                            </th>
                                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-400 uppercase">
                                                Status
                                            </th>
                                            <th scope="col" class="p-4 text-xs text-center font-medium text-left text-gray-400 uppercase">
                                                Ações
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y ">                        
                                        <tr v-for="travel in travelRequests" :key="travel.id" class="hover:bg-gray-100 dark:hover:bg-gray-200">                         
                                            <td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-400 truncate xl:max-w-xs">
                                                {{ travel.travel_request.user.name }}
                                            </td>
                                            <td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-400 truncate xl:max-w-xs">
                                                {{ travel.travel_request.destination }}
                                            </td>
                                            <td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-400 truncate xl:max-w-xs">
                                                {{ travel.travel_request.departure_date }}
                                            </td>
                                            <td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-400 truncate xl:max-w-xs">
                                                {{ travel.travel_request.return_date }}
                                            </td>
                                            <td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-400 truncate xl:max-w-xs">
                                                {{ travel.travel_request.status }}
                                            </td>                            
                                            <td class="flex justify-center p-4 space-x-2 whitespace-nowrap">
                                                <button 
                                                    type="button"
                                                    @click="callFormTravelRequest(travel.travel_request.id)"
                                                    data-modal-target="edit-user-modal"
                                                    data-modal-toggle="edit-user-modal"
                                                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-400 rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300">
                                                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                                    Editar
                                                </button>
                                                <button
                                                    type="button"
                                                    data-modal-target="cancel-solicitation-modal"
                                                    data-modal-toggle="cancel-solicitation-modal"
                                                    @click="SetNewStatus"
                                                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                                                    :disabled="!canCancel(travel)"
                                                    :class="[
                                                        'inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900',
                                                        canCancel(travel)
                                                        ? 'bg-red-600 text-white hover:bg-red-800'
                                                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                                    ]">
                                                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                                    Cancelar Solicitação 
                                                    <!-- userStore.userLogged.permissions.name -->
                                                </button>
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
    
    const router = useRouter();
    const userStore = useUserStore();
    const travelStore = useTravelRequestStore();  
    const travelRequests = computed(() => travelStore.travelRequests ? travelStore.travelRequests.value : '');
    
    onMounted(async () => {
        await userStore.actionGetMe();
        await travelStore.actionGetTravelRequests();
    });
    const canCancel = (travel) => {
        const user = userStore.userLogged
        const permissions = user.permissions
        let status = travel.travel_request.status

        if (!user) return false
        
        if (!permissions?.some(p => p.name === 'god') && status === 'cancelled' ) return false
        
        if (permissions?.some(p => p.name === 'god') && status !== 'cancelled' ) return true

        return status === 'pending'
    }
    function callFormTravelRequest(id) {
        if(id){
            router.push(`/travel-request/edit/${id}`);
        }else{
            router.push('/travel-request/new');
        }
    }
</script>