<script setup lang="ts">
import { ref } from "vue";
import InputNumber from "primevue/inputnumber";
import { VueFinalModal } from "vue-final-modal";

const bet = ref(0);
const name = ref("");
const items = ref<any[]>([]);

const emit = defineEmits<{
  (e: "confirm", gameName: string, bet: number): void;
  (e: "cancel"): void;
}>();
</script>
<template>
  <VueFinalModal
    class="flex items-center pt-28 flex-col"
    content-class="flex flex-col px-5 md:w-1/4 pb-5 pt-6 bg-[#0e0f12] shadow shadow-white/5 border border-white/5 rounded text-white"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1 class="text-center text-2xl mb-4">Are you sure?</h1>

    <div class="mt-12 flex gap-7">
      <button
        @click="emit('cancel')"
        class="bg-red-500 w-1/3 py-1 text-white rounded"
      >
        No
      </button>

      <button
        @click="emit('confirm', name, bet)"
        class="bg-[#0094ff] w-full py-1 text-white rounded"
      >
        Yes
      </button>
    </div>
  </VueFinalModal>
</template>
