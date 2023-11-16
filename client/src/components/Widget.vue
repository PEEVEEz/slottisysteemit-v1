<script setup lang="ts">
import { computed } from "vue";
import { Vue3Marquee } from "vue3-marquee";
import type { IBonus } from "@/stores/hunts";

const props = defineProps<{
  data: { start: number; bonuses: IBonus[] } | undefined;
  colors?: { background?: string; text?: string; text2?: string };
}>();

const winnings = computed(() => {
  return props.data?.bonuses.length
    ? props.data?.bonuses.map((v) => v.payout || 0).reduce((a, b) => a + b)
    : 0;
});

const defaultColors = {
  background: "111827",
  text: "fff",
  text2: "a78bfa",
};

const getColor = (key: "background" | "text" | "text2"): string => {
  if (!props.colors) {
    return `#${defaultColors[key]}`;
  }

  return `#${props.colors[key] || defaultColors[key]}`;
};
</script>
<template>
  <div class="flex flex-col w-[24rem]" :style="{ color: getColor('text') }">
    <div class="flex justify-end">
      <div
        class="w-36 pt-0.5 rounded-t text-center text-sm"
        :style="{ backgroundColor: getColor('background') }"
      >
        START
        <span
          :style="{
            color: getColor('text2'),
          }"
          >{{ props.data?.start ? `${props.data?.start}€` : "-" }}</span
        >
      </div>
    </div>
    <div
      class="flex flex-col h-[12rem] rounded-tl rounded-b pb-1"
      :style="{ backgroundColor: getColor('background') }"
    >
      <div
        class="rounded-t pl-2 border-b border-gray-700/20 py-1 pr-1 flex justify-between items-center"
      >
        <div class="text-lg">Bonustracker</div>

        <div class="flex w-36 gap-2 text-center">
          <div class="text-xs w-1/2 flex flex-col">
            <span class="uppercase">winnings</span>
            <span
              class="text-[0.7rem]"
              :style="{
                color: getColor('text2'),
              }"
              >{{ winnings ? `${winnings}€` : "-" }}</span
            >
          </div>
          <div class="text-xs w-1/2 flex flex-col">
            <span class="uppercase">req avg</span>
            <span
              class="text-[0.7rem]"
              :style="{
                color: getColor('text2'),
              }"
              >-</span
            >
          </div>
        </div>
      </div>
      <Vue3Marquee
        :duration="9"
        v-if="props.data?.bonuses && props.data?.bonuses.length >= 8"
        vertical
        style="height: 100%; width: 100%; align-items: start"
        class="h-10 float-left w-full py-1 text-[0.8rem] px-2 overflow-hidden"
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
        class="float-left w-full py-1 text-[0.8rem] px-2.5 overflow-hidden"
      >
        <div
          class="flex gap-1 justify-between w-full"
          v-for="(v, k) in props.data?.bonuses"
        >
          <div class="w-8">{{ k + 1 }}</div>
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
