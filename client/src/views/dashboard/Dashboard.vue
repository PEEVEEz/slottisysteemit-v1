<script setup lang="ts">
import Toast from "primevue/toast";
import Sidebar from "../../components/Sidebar.vue";
</script>
<template>
  <div class="flex h-full w-full">
    <Toast />
    <Sidebar />
    <RouterView />
  </div>
</template>
