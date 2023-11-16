<script setup lang="ts">
import { useUserStore } from "../stores/user";
import SlotMachine from "./icons/SlotMachine.vue";
import DashboardIcon from "./icons/Dashboard.vue";
import DiscordIcon from "./icons/Discord.vue";

const userStore = useUserStore();

const api_url = import.meta.env.VITE_API_URL;
</script>

<template>
  <div class="pt-5 pb-4 text-white flex justify-between items-center">
    <div class="text-white/90 flex items-center justify-center gap-3 mr-2">
      <SlotMachine class="w-6" />
      <span class="text-2xl uppercase font-semibold">Slottisysteemit</span>
    </div>

    <div>
      <a
        :href="`${api_url}/auth/login`"
        v-if="!userStore.user"
        class="flex items-center gap-2 text-white/80 hover:text-white"
      >
        <DiscordIcon class="w-5" />
        <span class="font-medium">Login with discord</span>
      </a>

      <div v-else class="flex items-center gap-7 text-white/80">
        <RouterLink
          to="/dashboard"
          class="flex items-center gap-2 hover:text-white"
        >
          <DashboardIcon class="w-5" />
          <span class="text-sm font-medium">Dashboard</span>
        </RouterLink>

        <RouterLink to="/" class="flex items-center gap-2 hover:text-white">
          <DiscordIcon class="w-5" />
          <span class="text-sm font-medium">Discord</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
