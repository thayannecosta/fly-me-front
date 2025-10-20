<template>
  <div class="flex flex-wrap px-6 py-6 bg-red-700s">
    <div class="flex justify-between w-full">
      <CardDashboard title="Usuários Cadastrados" :quantity="usersCount" :date="getToday()"/>
      <CardDashboard title="Viagens Solicitadas" :quantity="travelCount" :date="getToday()"/>
      <CardDashboard title="Viagens Aprovadas" :quantity="approvedCount" :date="getToday()"/>
    </div>

    <div class="w-full mt-10 bg-white block sm:flex items-center justify-between lg:mt-10">
      <div class="w-full">
          <div class="flex justify-between items-center w-full">
              <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl">{{t('title')}}</h1>
              <select @change="filterRequests()" v-model="filterForm.status" class="w-[300px] bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ">
                <option value="" selected>{{ t('filterByStatus')}}</option>
                <option value="approved">{{t('approved')}}</option>
                <option value="pending">{{t('pending')}}</option>
                <option value="cancelled">{{t('cancelled')}}</option>
                <option value="rejected">{{ t('rejected')}}</option>
              </select>
          </div>          
      </div>
    </div>

    <div class="flex flex-col w-full mt-10">
      <div class="overflow-x-auto">
          <div class="inline-block min-w-full align-middle">
              <div class="overflow-hidden shadow">
                  <table class="min-w-full divide-y divide-gray-200 table-fixed">
                      <thead class="bg-gray-100">
                          <tr>
                              <th scope="col" class="p-4 text-xs font-medium text-left text-gray-400 uppercase">
                                  {{t('name')}}
                              </th>
                              <th scope="col" class="p-4 text-xs font-medium text-left text-gray-400 uppercase">
                                  {{ t('destination') }}
                              </th>
                              <th scope="col" class="p-4 text-xs font-medium text-left text-gray-400 uppercase">
                                  {{ t('departureDate') }}
                              </th>
                              <th scope="col" class="p-4 text-xs font-medium text-left text-gray-400 uppercase">
                                  {{ t('returnDate') }}
                              </th>
                              <th scope="col" class="p-4 text-xs font-medium text-left text-gray-400 uppercase">
                                  {{ t('status') }}
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
                                  {{formatDate( travel.travel_request.departure_date )}}
                              </td>
                              <td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-400 truncate xl:max-w-xs">
                                  {{ formatDate(travel.travel_request.return_date) }}
                              </td>
                              <td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-400 truncate xl:max-w-xs">
                                  {{ t(travel.travel_request.status) }}
                              </td>                                                          
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n';
  import { useTravelRequestStore } from '../store/travelStore'
  import { useAuthStore } from '../store/authStore'
  import { useUserStore } from '../store/userStore'
  import CardDashboard from '../components/GlobalComponents/CardDashboard.vue';

  const filterForm = ref({
      status: '',
      departure_date:'',
      return_date:'',
      destination:''
  })
  
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const travelStore = useTravelRequestStore();  
  
  const travelRequests = computed(() => travelStore.travelRequests ? travelStore.travelRequests.value : '');
  const usersCount = computed(() => userStore.usersCount || '');
  const travelCount = computed(() => travelStore.travelCount || '');
  const approvedCount = computed(() => travelStore.approvedTravelCount || '0')
  const { t } = useI18n();

  const formatDate = (date) => {
      const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
  }

  async function filterRequests(){
      await travelStore.actionFilterTravelRequests(filterForm.value);
  }

  const getToday = () => {
    const today = new Date()
    const dateFormated = today.toLocaleDateString('pt-BR')
    return dateFormated
  }
  onMounted(async () => {
    await travelStore.actionGetTravelRequests();
    await userStore.fetchUsers()
    await userStore.totalUsersCount()
  });
</script>