<template>
  <div class="flex flex-wrap max-w-screen-lg m-auto mt-10">
    <div 
      v-for="travelRequest in travelRequests"
      :key="travelRequest.id"
      class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
    </div>
  </div>
</template>

<script setup>
  import { onMounted, computed } from 'vue'
  import { useTravelRequestStore } from '../store/travelStore'
  import { useAuthStore } from '../store/authStore'
  
  const authStore = useAuthStore();
  const travelStore = useTravelRequestStore();  
  const travelRequests = computed(() => travelStore.travelRequests ? travelStore.travelRequests.value : '');

  onMounted(async () => {
    await travelStore.actionGetTravelRequests();    
  });
</script>
