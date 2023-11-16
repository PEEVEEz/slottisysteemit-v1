<script setup lang="ts">
import { useRoute } from "vue-router";
import { useModal } from "vue-final-modal";
import { computed, ref, watch } from "vue";
import { useHuntsStore } from "@/stores/hunts";
import Redeeming from "@/components/Redeeming.vue";
import AddBonus from "@/components/modals/AddBonus.vue";

const route = useRoute();
const huntStore = useHuntsStore();
huntStore.init();

const thisHunt = computed(() => {
  return huntStore.hunts?.find((v) => v._id === route.params.id);
});

const { open: openAddBonus, close: closeAddBonus } = useModal({
  component: AddBonus,
  attrs: {
    onConfirm(game_name, bet) {
      if (!thisHunt.value?._id) return;
      huntStore.addBonus(thisHunt.value._id, { game_name, bet });
      closeAddBonus();
    },
    onCancel() {
      closeAddBonus();
    },
  },
});
</script>

<template>
  <div class="p-8 flex-1 w-full" v-if="!huntStore.loading">
    <div class="flex justify-between mb-4">
      <div
        class="text-white flex"
        :class="{ 'items-center': thisHunt?.redeeming }"
      >
        <RouterLink to="/dashboard/hunts"
          ><i class="bx bx-chevron-left text-3xl"></i>
        </RouterLink>
        <span class="text-xl font-medium"
          >{{ thisHunt?.name }} |
          {{
            thisHunt?.end
              ? `${thisHunt.start}€ => ${thisHunt.end}€`
              : `${thisHunt?.start}€`
          }}
        </span>
      </div>

      <div v-if="!thisHunt?.redeeming" class="flex items-center gap-4">
        <button
          @click="huntStore.startRedeeming(thisHunt?._id)"
          class="rounded text-sm text-white bg-green-500 px-4 py-1.5"
        >
          Start redeeming
        </button>

        <button
          @click="openAddBonus"
          class="rounded text-sm text-white bg-[#1a1d21] px-4 py-1.5"
        >
          Add bonus
        </button>
      </div>
      <Redeeming v-else :hunt="thisHunt" />
    </div>

    <div class="relative overflow-x-auto shadow-sm shadow-black/10 w-full">
      <table class="w-full h-full text-sm text-left text-gray-500">
        <thead class="text-xs text-white uppercase bg-[#1a1d21]">
          <tr>
            <th scope="col" class="px-6 py-3">Game name</th>
            <th scope="col" class="px-6 py-3">BET</th>
            <th scope="col" class="px-6 py-3">PAYOUT</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(v, k) in thisHunt?.bonuses"
            class="border-b border-white/5"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-zinc-100 whitespace-nowrap"
            >
              {{ v.game_name }}
            </th>
            <td class="px-6 py-4">{{ v.bet }}€</td>
            <td class="px-6 py-4">{{ v.payout ? `${v.payout}€` : "" }}</td>
            <td class="px-6 py-4 flex gap-5">
              <button @click="huntStore.deleteBonus(thisHunt?._id, v._id)">
                <i class="bx bx-trash text-red-500 text-lg"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
