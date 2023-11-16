<script setup lang="ts">
import { ref } from "vue";
import Modal from "../Modal.vue";
import InputCurrency from "../InputCurrency.vue";

const props = defineProps<{
  bet: number;
}>();

const bet = ref(props.bet);

const emit = defineEmits<{
  (e: "confirm", bet: number): void;
  (e: "cancel"): void;
}>();
</script>
<template>
  <Modal>
    <h1 class="text-center text-2xl mb-4">Edit bonus</h1>
    <!-- <slot /> -->

    <div class="flex flex-col gap-4 flex-1">
      <div class="flex flex-col gap-1">
        <span>Bet</span>
        <InputCurrency :value="bet" v-model="bet" />
      </div>
    </div>

    <div class="mt-12 flex gap-5">
      <button
        @click="emit('cancel')"
        class="bg-red-500 w-1/3 py-2 text-white rounded text-sm font-medium"
      >
        Cancel
      </button>

      <button
        @click="emit('confirm', bet)"
        class="bg-[#0094ff] w-full py-2 text-white rounded text-sm font-medium"
      >
        Update
      </button>
    </div>
  </Modal>
</template>
