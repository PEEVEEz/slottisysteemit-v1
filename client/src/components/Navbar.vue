<script setup lang="ts">
import { computed } from "vue";
import HouseIcon from "./icons/House.vue";
import TargetIcon from "./icons/Target.vue";
import DiscordIcon from "./icons/Discord.vue";
import { useUserStore } from "../stores/user";
import OverlayIcon from "./icons/Overlay.vue";
import SlotMachine from "./icons/SlotMachine.vue";

const userStore = useUserStore();
const api_url = import.meta.env.VITE_API_URL;
const isLoggedIn = computed(() => userStore.user);
</script>

<template>
  <div class="pt-5 pb-4 text-white flex justify-between items-center">
    <RouterLink
      to="/"
      class="text-white/90 flex items-center justify-center gap-3 mr-2"
    >
      <SlotMachine class="w-6" />
      <span class="text-2xl uppercase font-semibold">Slottisysteemit</span>
    </RouterLink>

    <div class="flex items-center gap-7 text-white/80">
      <RouterLink
        v-if="isLoggedIn"
        to="/"
        class="flex items-center gap-2 hover:text-white"
      >
        <HouseIcon class="w-5" />
        <span class="text-sm font-medium">Home</span>
      </RouterLink>

      <a
        v-if="!isLoggedIn"
        :href="`${api_url}/auth/login`"
        class="flex items-center gap-2 hover:text-white"
      >
        <DiscordIcon class="w-5" />
        <span class="text-sm font-medium">Login with discord</span>
      </a>

      <RouterLink
        v-if="isLoggedIn"
        to="/hunts"
        class="flex items-center gap-2 hover:text-white"
      >
        <TargetIcon class="w-5" />
        <span class="text-sm font-medium">Bonushunts</span>
      </RouterLink>

      <RouterLink
        v-if="isLoggedIn"
        to="/overlays"
        class="flex items-center gap-2 hover:text-white"
      >
        <OverlayIcon class="w-5" />
        <span class="text-sm font-medium">Overlays</span>
      </RouterLink>
    </div>
  </div>
</template>
