<script setup lang="ts">
import api from "@/api";
import { ref } from "vue";
import Modal from "../Modal.vue";
import AutoComplete from "../Autocomplete.vue";
import InputCurrency from "../InputCurrency.vue";

const bet = ref(0);
const name = ref("");
const items = ref<any[]>([]);

const emit = defineEmits<{
  (e: "confirm", gameName: string, bet: number): void;
  (e: "cancel"): void;
}>();

const handleSearch = async () => {
  const result = await api.get("game/search?name=" + name.value, {
    withCredentials: true,
  });

  items.value = result.data;
};
</script>
<template>
  <Modal>
    <h1 class="text-center text-2xl mb-4">Add bonus</h1>
    <div class="flex flex-col gap-4 flex-1">
      <div class="flex flex-col gap-1">
        <span>Game name</span>

        <AutoComplete
          :value="name"
          :items="items"
          v-on:change="() => handleSearch()"
          v-model="name"
        />
      </div>

      <div class="flex flex-col gap-1">
        <span>Bet</span>
        <InputCurrency :value="bet" v-model="bet" />
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
        @click="emit('confirm', name, bet)"
        class="bg-[#0094ff]/40 w-full py-2 text-white rounded text-sm font-medium"
      >
        Add
      </button>
    </div>
  </Modal>
</template>
