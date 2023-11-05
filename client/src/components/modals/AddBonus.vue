<script setup lang="ts">
import api from "@/api";
import { ref } from "vue";
import InputNumber from "primevue/inputnumber";
import AutoComplete from "primevue/autocomplete";
import { VueFinalModal } from "vue-final-modal";

const bet = ref(0);
const name = ref("");
const items = ref<any[]>([]);

const emit = defineEmits<{
  (e: "confirm", gameName: string, bet: number): void;
  (e: "cancel"): void;
}>();

const handleSearch = async () => {
  const result = await api.get(
    "http://localhost:3001/game/search?name=" + name.value,
    {
      withCredentials: true,
    }
  );

  items.value = result.data.data.allGames;
};
</script>
<template>
  <VueFinalModal
    class="flex items-center pt-28 flex-col"
    content-class="flex flex-col px-5 pb-5 pt-6 bg-[#0e0f12] shadow shadow-white/5 border border-white/5 rounded text-white"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1 class="text-center text-2xl mb-4">Add bonus</h1>
    <div class="flex flex-col gap-4 flex-1">
      <div class="flex flex-col gap-1">
        <span>Game name</span>

        <AutoComplete
          :pt="{
            input: {
              class:
                'bg-[#1a1d21] border-none w-full py-1.5 rounded outline-none',
            },
            panel: {
              class:
                'bg-[#1a1d21] border border-white/10 mt-2 rounded text-white overflow-y-auto',
            },
            item: {
              class: 'hover:bg-black/5 cursor-pointer',
            },
          }"
          v-model="name"
          :suggestions="items.map((v) => v.name)"
          @complete="handleSearch"
        />
      </div>

      <div class="flex flex-col gap-1">
        <span>Bet</span>
        <InputNumber
          :pt="{
            input: {
              class:
                'bg-[#1a1d21] border-none w-full py-1.5 rounded outline-none',
            },
          }"
          currency="EUR"
          mode="currency"
          v-model="bet"
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
        @click="emit('confirm', name, bet)"
        class="bg-[#0094ff] w-full py-1 text-white rounded"
      >
        Add
      </button>
    </div>
  </VueFinalModal>
</template>
