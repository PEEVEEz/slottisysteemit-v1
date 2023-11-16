<script setup lang="ts">
import { ref } from "vue";
import ArrowLeft from "./icons/ArrowLeft.vue";
import { useHuntsStore } from "@/stores/hunts";
import InputCurrency from "./InputCurrency.vue";
import ArrowRight from "./icons/ArrowRight.vue";

const props = defineProps<{ hunt: { bonuses: any[]; _id: string } }>();
const huntStore = useHuntsStore();

const findIndex = props.hunt.bonuses.findIndex((v) => !v.payout);
const index = ref(findIndex === -1 ? 0 : findIndex);
const payout = ref(props.hunt.bonuses[index.value].payout || 0);

const handleNextAndPreviousClick = (value: number) => {
  const hunt = props.hunt;

  if (!hunt.bonuses) return;
  if (index.value + value < 0) return;
  if (index.value + value > hunt.bonuses?.length) return;

  if (value == +1) {
    var currentBonus = hunt.bonuses[index.value];
    if (!currentBonus || !currentBonus._id) return;

    var currentPayout = currentBonus.payout;
    if (!currentPayout || (currentPayout && currentPayout !== payout.value)) {
      huntStore.redeemBonus(hunt._id, currentBonus._id, payout.value);
    }
  }

  payout.value =
    hunt.bonuses[hunt.bonuses?.length === 1 ? index.value : index.value + value]
      .payout || 0;

  if (index.value + value < hunt.bonuses.length) {
    index.value = index.value + value;
  }
};
</script>

<template>
  <div class="flex flex-col items-center mb-4 gap-3 text-white">
    <div class="flex gap-10 items-center">
      <button
        @click="handleNextAndPreviousClick(-1)"
        class="flex items-center"
        :class="{ 'text-white/30': index <= 0 }"
      >
        <ArrowLeft class="w-8" />
        <span class="ml-[-0.4rem]"></span>
      </button>

      <div class="flex flex-col gap-4 items-center">
        {{
          props.hunt.bonuses && props.hunt.bonuses[index]
            ? props.hunt.bonuses[index].game_name
            : "Invalid index " + index
        }}

        <InputCurrency :value="payout" v-model="payout" />
      </div>

      <button @click="handleNextAndPreviousClick(1)" class="flex items-center">
        <span class="text-sm font-semibold">ENTER</span>
        <ArrowRight class="w-8" />
      </button>
    </div>
  </div>
</template>
