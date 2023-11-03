<script setup lang="ts">
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

userStore.init();
</script>
<template>
  <div class="bg-[#1a1d21] h-full w-72 py-2 md:flex flex-col gap-5 hidden">
    <!-- Head  -->
    <div class="text-white text-2xl uppercase font-semibold text-center mt-2">
      Slottisysteemit
    </div>

    <!-- Items -->

    <div class="flex flex-col gap-2 px-2 text-white flex-1">
      <RouterLink
        to="/dashboard"
        class="px-2.5 py-2 rounded flex gap-2 items-center hover:bg-black/10"
        ><i class="bx bxs-dashboard"></i>Home</RouterLink
      >
      <RouterLink
        to="/dashboard/hunts"
        class="px-2.5 py-2 rounded flex gap-2 items-center hover:bg-black/10"
        ><i class="bx bx-target-lock"></i>Bonushunts</RouterLink
      >
    </div>

    <div
      class="flex items-center px-4 mb-2 gap-2 justify-between"
      v-if="userStore.user"
    >
      <div class="flex gap-2 items-center">
        <img
          class="w-9 rounded-full"
          :src="`https://cdn.discordapp.com/avatars/${userStore.user.id}/${userStore.user.avatar}.webp`"
          alt="pfp"
        />
        <span class="text-white font-medium">{{
          userStore.user.global_name
        }}</span>
      </div>

      <button @click="userStore.logout">
        <i class="bx bx-log-out-circle text-xl text-red-500"></i>
      </button>
    </div>
  </div>
</template>
