
<template>
    <div class="h-full">
        <Navbar />
        <div class="flex w-full h-full">
            <div class="w-[250px] h-full sidebar" style="background-color: rgb(31 41 55 / var(--tw-bg-opacity, 1));">
                <SideBar />
            </div>
            <main class="min-h-full flex-1">
                <router-view />
            </main>
        </div>
    </div>
</template>


<script setup>
import Navbar from '../../components/GlobalComponents/Navbar.vue';
import SideBar from '../../components/GlobalComponents/Sidebar.vue'
</script>
