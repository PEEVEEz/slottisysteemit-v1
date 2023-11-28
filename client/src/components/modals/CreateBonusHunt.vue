<script setup lang="ts">
import { ref } from "vue";
import Modal from "../Modal.vue";
import InputText from "../InputText.vue";
import InputCurrency from "../InputCurrency.vue";

const name = ref("");
const start = ref(0);

const emit = defineEmits<{
  (e: "confirm", name: string, start: number): void;
  (e: "cancel"): void;
}>();
</script>
<template>
  <Modal>
    <h1 class="text-center text-2xl mb-4">New bonushunt</h1>
    <!-- <slot /> -->

    <div class="flex flex-col gap-4 flex-1">
      <div class="flex flex-col gap-1">
        <span>Name</span>
        <InputText :value="name" v-model="name" />
      </div>

      <div class="flex flex-col gap-1">
        <span>Start</span>
        <InputCurrency :value="start" v-model="start" />
      </div>
    </div>

    <div class="mt-12 flex gap-5">
      <button
        @click="emit('cancel')"
        class="bg-red-500/40 w-1/3 py-2 text-white rounded text-sm font-medium"
      >
        Cancel
      </button>

      <button
        @click="emit('confirm', name, start)"
        class="bg-[#0094ff]/40 w-full py-2 text-white rounded text-sm font-medium"
      >
        Create
      </button>
    </div>
  </Modal>
</template>
