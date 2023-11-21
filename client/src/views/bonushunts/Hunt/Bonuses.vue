<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useModal } from "vue-final-modal";
import Bonus from "@/components/Bonus.vue";
import { useHuntsStore } from "@/stores/hunts";
import AddBonus from "@/components/modals/AddBonus.vue";

const route = useRoute();
const huntStore = useHuntsStore();

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
  <div class="flex justify-between mb-2">
    <div class="text-white flex items-center">
      <RouterLink to="/hunts"
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

    <div v-if="thisHunt" class="flex items-center gap-4">
      <RouterLink
        v-if="thisHunt?.bonuses.length > 0"
        :to="'/hunts/' + thisHunt?._id + '/redeem'"
        class="rounded text-sm text-white bg-green-500 px-4 py-1.5"
      >
        Redeeming
      </RouterLink>

      <button
        @click="openAddBonus"
        class="rounded text-sm text-white bg-[#1a1d21] px-4 py-1.5"
      >
        Add bonus
      </button>
    </div>
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
        <Bonus
          v-if="thisHunt"
          v-for="v in thisHunt?.bonuses"
          :data="v"
          :hunt_id="thisHunt?._id"
        />
      </tbody>
    </table>
  </div>
</template>
