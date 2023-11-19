<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useHuntsStore } from "@/stores/hunts";
import RedeemingGame from "@/components/RedeemingGame.vue";

const route = useRoute();
const activeIndex = ref(0);
const huntStore = useHuntsStore();

const thisHunt = computed(() => {
  return huntStore.hunts?.find((v) => v._id === route.params.id);
});

const handleNextAndPreviousClick = (value: number): void => {
  const hunt = thisHunt.value;

  if (!hunt || !hunt.bonuses) return;
  if (activeIndex.value + value < 0) return;
  if (activeIndex.value + value > hunt.bonuses?.length) return;

  if (activeIndex.value + value < hunt.bonuses.length) {
    activeIndex.value = activeIndex.value + value;
  }
};
</script>
<template>
  <div class="flex justify-between mb-4">
    <div class="text-white flex items-center">
      <RouterLink :to="'/hunts/' + thisHunt?._id"
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
  </div>

  <div class="border border-white/5 rounded" v-if="thisHunt">
    <div class="mx-auto max-w-lg text-white p-6">
      <div v-for="(v, i) in thisHunt.bonuses">
        <RedeemingGame
          v-if="activeIndex === i"
          :hunt_id="thisHunt._id"
          :bonus="v"
          :on-next="() => handleNextAndPreviousClick(+1)"
          :on-previous="() => handleNextAndPreviousClick(-1)"
        />
      </div>
      <div class="text-center text-white/50 text-xs mt-5">
        Simply press [ENTER] to save changes and advance.
      </div>
    </div>
  </div>
</template>
