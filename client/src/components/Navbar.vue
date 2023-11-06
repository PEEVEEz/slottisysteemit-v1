<script setup lang="ts">
import { useUserStore } from "../stores/user";
const userStore = useUserStore();

const api_url = import.meta.env.VITE_API_URL;
</script>

<template>
  <div class="pt-5 pb-4 text-white flex justify-between items-center">
    <h1 class="text-3xl font-medium">Slottisysteemit</h1>

    <div>
      <a
        :href="`${api_url}/auth/login`"
        v-if="!userStore.user"
        class="bg-[#0094ff] px-4 py-1.5 rounded"
      >
        Login with discord
      </a>

      <RouterLink
        to="/dashboard"
        class="bg-[#0094ff] px-4 py-1.5 rounded"
        v-else
        >Dashboard</RouterLink
      >
    </div>
  </div>
</template>
