<script setup lang="ts">
import { computed, ref } from "vue";
import HouseIcon from "./icons/House.vue";
import LogoutIcon from "./icons/Logout.vue";
import TargetIcon from "./icons/Target.vue";
import DiscordIcon from "./icons/Discord.vue";
import { useUserStore } from "../stores/user";
import OverlayIcon from "./icons/Overlay.vue";
import SlotMachine from "./icons/SlotMachine.vue";
import MenuIcon from "./icons/Menu.vue";
import HelpIcon from "./icons/Help.vue";

const userStore = useUserStore();
const api_url = import.meta.env.VITE_API_URL;
const isLoggedIn = computed(() => userStore.user);

const toggled = ref(false);
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

    <div
      class="flex flex-col md:items-center gap-7 transition-all text-white/80 z-50 fixed left-0 top-[4.5rem] p-4 md:p-0 bg-[#0e0f12] border border-white/5 w-full md:border-none md:bg-transparent md:static md:flex-row md:w-max"
      :class="{ 'md:flex left-[-70rem]': !toggled }"
    >
      <RouterLink
        v-if="isLoggedIn"
        @click="toggled = false"
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
        @click="toggled = false"
        class="flex items-center gap-2 hover:text-white"
      >
        <TargetIcon class="w-5" />
        <span class="text-sm font-medium">Bonushunts</span>
      </RouterLink>

      <RouterLink
        v-if="isLoggedIn"
        to="/hunts"
        @click="toggled = false"
        class="flex items-center gap-2 hover:text-white"
      >
        <HelpIcon class="w-5" />
        <span class="text-sm font-medium">Guess</span>
      </RouterLink>
      <div
        v-if="userStore.user"
        class="flex items-center gap-3 md:border-l md:pl-6 md:border-white/20 md:h-5"
      >
        <img
          width="30"
          class="rounded-full"
          :src="`https://cdn.discordapp.com/avatars/${userStore.user.id}/${userStore.user.avatar}.webp`"
        />
        <button
          @click="userStore.logout()"
          to="/overlays"
          class="flex items-center gap-2 hover:text-red-400 text-red-500"
        >
          <LogoutIcon class="w-5" />
          <span class="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>

    <div class="block md:hidden">
      <button @click="toggled = !toggled" class="flex items-center">
        <MenuIcon class="w-7" />
      </button>
    </div>
  </div>
</template>
