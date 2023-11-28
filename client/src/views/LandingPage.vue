<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import { useUserStore } from "@/stores/user";
import HuntTracker from "../components/widgets/HuntTracker.vue";

const userStore = useUserStore();

const api_url = import.meta.env.VITE_API_URL;
</script>

<template>
  <div class="flex flex-col h-full">
    <div
      class="md:mt-32 mt-24 flex sm:justify-between gap-5 flex-col sm:flex-row flex-1"
    >
      <div class="flex flex-col gap-3.5">
        <div class="text-4xl text-white max-w-lg font-medium">
          Elevate Your Casino Streaming Experience
        </div>

        <div class="text-zinc-400 text-sm max-w-md">
          Ready to revolutionize your casino slot streaming journey? Look no
          further! Join the SlottiSysteemit community today and unlock a world
          of elite tools and features designed to take your content to the next
          level.
        </div>

        <div class="flex mt-2 max-w-md gap-6 text-white">
          <button class="bg-[#0094ff] w-1/2 py-2 rounded">Support us</button>

          <a
            v-if="!userStore.user"
            :href="`${api_url}/auth/login`"
            class="bg-[#1a1d21]/50 w-1/2 py-2 rounded text-center"
          >
            Login with discord
          </a>
          <RouterLink
            v-else
            class="bg-[#1a1d21]/50 w-1/2 py-2 rounded text-center"
            to="/"
          >
            Features
          </RouterLink>
        </div>
      </div>

      <div class="flex justify-center sm:block">
        <HuntTracker
          :data="{
            start: 500,
            reqavg: 100,
            bonuses: [
              { game_name: 'Example game', bet: 2.5, payout: 250 },
              { game_name: 'Example game 2', bet: 2.5 },
            ],
          }"
          class="pointer-events-none select-none opacity-80 shadow-2xl shadow-zinc-300/10"
        />

        <!-- <div
          class="w-[25rem] h-[15rem] relative"
          :style="{
            background: `url(
                  'https://cdn.discordapp.com/attachments/1158163856825253949/1176961693272784926/image.png?ex=6570c5fe&is=655e50fe&hm=5644831709f547f7b6c7f671242fcd3517abe7b4eebd4787251a9a3be67ff3e0&'
                )
                `,
            backgroundSize: '115%',
            backgroundPosition: 'center',
          }"
        ></div> -->
      </div>
    </div>

    <Footer />
  </div>
</template>
