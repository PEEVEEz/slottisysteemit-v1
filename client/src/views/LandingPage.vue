<script setup lang="ts">
import Widget from "../components/Widget.vue";
import Navbar from "../components/Navbar.vue";
import { useUserStore } from "@/stores/user";

import Footer from "@/components/Footer.vue";

const userStore = useUserStore();

const api_url = import.meta.env.VITE_API_URL;
</script>

<template>
  <div class="mx-auto max-w-7xl flex flex-col h-full sm:px-0 px-3">
    <Navbar />
    <div
      class="mt-36 flex sm:justify-between gap-5 flex-col sm:flex-row flex-1"
    >
      <div class="flex flex-col gap-3.5">
        <div class="text-5xl text-white max-w-lg font-medium">
          Save Time with slot streaming tools
        </div>

        <div class="text-zinc-400 text-sm max-w-md">
          Elevate your slot streaming with "slottisysteemit" and start saving
          time. Streamers, optimize your bonus hunting adventures, track your
          wins, and engage your audience more efficiently. Join the slot
          streaming revolution today
        </div>

        <div class="flex mt-2 max-w-md gap-6 text-white">
          <button class="bg-[#0094ff] w-1/2 py-2 rounded">Support us</button>

          <a
            v-if="!userStore.user"
            :href="`${api_url}/auth/login`"
            class="bg-[#1a1d21] w-1/2 py-2 rounded text-center"
          >
            Login with discord
          </a>
          <RouterLink
            v-else
            class="bg-[#1a1d21] w-1/2 py-2 rounded text-center"
            to="/dashboard"
          >
            Dashboard
          </RouterLink>
        </div>
      </div>

      <div class="flex justify-center sm:block">
        <Widget
          :data="{
            start: 500,
            bonuses: [
              { game_name: 'Example game', bet: 2.4, payout: 300 },
              { game_name: 'Example game 2', bet: 2.4 },
            ],
          }"
          class="pointer-events-none select-none opacity-60 shadow-2xl shadow-zinc-300/10"
        />
      </div>
    </div>

    <Footer />
  </div>
</template>
