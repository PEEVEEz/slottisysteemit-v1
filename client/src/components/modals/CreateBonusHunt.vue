<script setup lang="ts">
import { ref } from "vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import { VueFinalModal } from "vue-final-modal";

const name = ref("");
const start = ref(0);

const emit = defineEmits<{
  (e: "confirm", name: string, start: number): void;
  (e: "cancel"): void;
}>();
</script>
<template>
  <VueFinalModal
    class="flex items-center pt-28 flex-col"
    content-class="flex flex-col px-5 pb-5 pt-6 bg-[#0e0f12] shadow shadow-white/5 border border-white/5 rounded text-white"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1 class="text-center text-2xl mb-4">New bonushunt</h1>
    <!-- <slot /> -->

    <div class="flex flex-col gap-4 flex-1">
      <div class="flex flex-col gap-1">
        <span>Name</span>
        <InputText
          :pt="{
            root: {
              class:
                'bg-[#1a1d21] border-none w-full py-1.5 rounded outline-none',
            },
          }"
          v-model="name"
        />
      </div>

      <div class="flex flex-col gap-1">
        <span>Start</span>
        <InputNumber
          :pt="{
            input: {
              class:
                'bg-[#1a1d21] border-none w-full py-1.5 rounded outline-none',
            },
          }"
          currency="EUR"
          mode="currency"
          v-model="start"
        />
      </div>
    </div>

    <div class="mt-12 flex gap-7">
      <button
        @click="emit('cancel')"
        class="bg-red-500 w-1/3 py-1 text-white rounded"
      >
        Cancel
      </button>

      <button
        @click="emit('confirm', name, start)"
        class="bg-[#0094ff] w-full py-1 text-white rounded"
      >
        Create
      </button>
    </div>
  </VueFinalModal>
</template>
