<script setup lang="ts">
import { Vue3Marquee } from "vue3-marquee";

const props = defineProps<{
  data: { start: number; bonuses: any[] } | undefined;
}>();
</script>
<template>
  <div class="flex flex-col w-[24rem]">
    <div class="flex justify-end text-gray-300">
      <div class="bg-gray-900 w-36 pt-0.5 rounded-t text-center text-sm">
        START
        <span class="text-violet-400">{{
          props.data?.start ? `${props.data?.start}€` : "-"
        }}</span>
      </div>
    </div>
    <div class="flex flex-col h-[12rem] bg-gray-900 rounded-tl pb-1">
      <div
        class="rounded-t pl-2 border-b border-gray-700/20 text-white py-1 pr-1 flex justify-between items-center"
      >
        <div class="text-lg">Bonustracker</div>

        <div class="flex w-36 gap-2 text-center">
          <div class="text-xs text-gray-300 w-1/2 flex flex-col">
            <span class="uppercase">winnings</span>
            <span class="text-violet-400 text-[0.7rem]">-</span>
          </div>
          <div class="text-xs text-gray-300 w-1/2 flex flex-col">
            <span class="uppercase">req avg</span>
            <span class="text-violet-400 text-[0.7rem]">-</span>
          </div>
        </div>
      </div>
      <Vue3Marquee
        :duration="9"
        v-if="props.data?.bonuses && props.data?.bonuses.length >= 8"
        vertical
        style="height: 100%; width: 100%; align-items: start"
        class="h-10 text-gray-100 float-left w-full py-0.5 text-[0.8rem] px-2 overflow-hidden"
      >
        <div
          class="flex gap-1 justify-between w-full"
          v-for="(v, k) in props.data?.bonuses"
        >
          <div class="w-10">{{ k + 1 }}</div>
          <div class="w-2/3">{{ v.game_name }}</div>

          <div class="w-3/12 text-end">{{ v.bet }}€</div>
          <div class="w-3/12 text-end">
            {{ v.payout ? `${v.payout}€` : "" }}
          </div>
        </div>
        <div> </div>
      </Vue3Marquee>
      <div
        v-if="props.data?.bonuses && props.data?.bonuses.length <= 7"
        class="text-gray-100 float-left w-full py-0.5 text-[0.8rem] px-2 overflow-hidden"
      >
        <div
          class="flex gap-1 justify-between w-full"
          v-for="(v, k) in props.data?.bonuses"
        >
          <div class="w-10">{{ k + 1 }}</div>
          <div class="w-2/3">{{ v.game_name }}</div>

          <div class="w-3/12 text-end">{{ v.bet }}€</div>
          <div class="w-3/12 text-end">
            {{ v.payout ? `${v.payout}€` : "" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.marquee {
  width: 100%;
}
</style>
