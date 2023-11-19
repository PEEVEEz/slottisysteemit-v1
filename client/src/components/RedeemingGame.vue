<script setup lang="ts">
import { ref } from "vue";
import type { IBonus } from "@/types";
import InputCurrency from "./InputCurrency.vue";
import { useToast } from "vue-toast-notification";
import { useHuntsStore } from "@/stores/hunts";

const huntStore = useHuntsStore();

const props = defineProps<{
  onNext: () => void;
  onPrevious: () => void;
  bonus: IBonus;
  hunt_id: string;
}>();

const toast = useToast();
const payout = ref(props.bonus.payout || 0);

const onPrevious = () => {
  if ((props.bonus.payout || 0) !== payout.value) {
    toast.error("You need save payout first!");
    return;
  }

  props.onPrevious();
};
const onSave = () => {
  if (!props.bonus._id) return;
  huntStore.redeemBonus(props.hunt_id, props.bonus._id, payout.value);
};
const onNext = () => {
  if ((props.bonus.payout || 0) !== payout.value) {
    toast.error("You need save payout first!");
    return;
  }

  props.onNext();
};

const handleEnterPress = () => {
  onSave();
  onNext();
};
</script>

<template>
  <div>
    <h1 class="text-center text-2xl mb-5">{{ props.bonus.game_name }}</h1>

    <div class="flex flex-col gap-1">
      <span>Payout</span>

      <InputCurrency
        :enterPressed="handleEnterPress"
        :value="payout"
        v-model="payout"
      />
    </div>

    <div class="flex gap-4 mt-5 mb-3">
      <button class="w-full bg-[#1a1d21] py-1.5 rounded" @click="onPrevious">
        Previous
      </button>
      <button
        :class="{ 'cursor-not-allowed': (props.bonus.payout || 0) === payout }"
        class="w-full bg-[#0094ff] py-1.5 rounded"
        @click="onSave()"
      >
        Save
      </button>
      <button class="w-full bg-[#1a1d21] py-1.5 rounded" @click="onNext">
        Next
      </button>
    </div>
  </div>
</template>
