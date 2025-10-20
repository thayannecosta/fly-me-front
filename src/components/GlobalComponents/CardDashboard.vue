<template>
    <div class="w-[32%] items-center justify-between bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <div class="w-full px-4 py-6">
            <h3 class="text-base font-normal text-gray-500 dark:text-gray-400">{{ title }}</h3>
            <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">{{ quantity }}</span>
            <p class="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
              {{ t('lastUpdated') }}: {{ date }}
            </p>
        </div>
        
    </div>
</template>
    
<script setup>
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    const props = defineProps({
        title: String,
        quantity: String,
        date: String,
    })
</script>