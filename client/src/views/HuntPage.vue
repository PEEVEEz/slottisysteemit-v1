<script setup lang="ts">
import { useRoute } from "vue-router";
import { useHuntsStore } from "../stores/hunts";
import { useModal } from "vue-final-modal";
import AddBonus from "@/components/modals/AddBonus.vue";
const huntStore = useHuntsStore();
const route = useRoute();

const thisHunt = huntStore.hunts?.find((v) => v._id === route.params.id);

const { open: openAddBonus, close: closeAddBonus } = useModal({
  component: AddBonus,
  attrs: {
    onConfirm(game_name, bet) {
      if (!thisHunt?._id) return;
      huntStore.addBonus(thisHunt?._id, { game_name, bet });
      // huntsStore.newHunt({
      //   name,
      //   start,
      // });

      closeAddBonus();
    },
    onCancel() {
      closeAddBonus();
    },
  },
});
</script>

<template>
  <div class="flex justify-between mb-2.5 mt-5">
    <div class="text-white flex items-center">
      <RouterLink to="/"
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

    <div class="flex gap-5 items-center">
      <button
        v-if="thisHunt?.active"
        class="rounded text-sm text-white bg-red-500 px-4 py-1.5"
      >
        End
      </button>

      <button
        v-if="thisHunt?.active"
        @click="openAddBonus"
        class="rounded text-sm text-white bg-[#1a1d21] px-4 py-1.5"
      >
        Add bonus
      </button>
    </div>
  </div>

  <div class="relative overflow-x-auto shadow-sm shadow-black/10">
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
        <tr v-for="(v, k) in thisHunt?.bonuses" class="border-b border-white/5">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-zinc-100 whitespace-nowrap"
          >
            {{ v.game_name }}
          </th>
          <td class="px-6 py-4">{{ v.bet }}</td>
          <td class="px-6 py-4">{{ v.payout }}</td>
          <td class="px-6 py-4 flex gap-5">
            <button><i class="bx bx-trash text-red-500 text-lg"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
