<script setup lang="ts">
import { computed } from "vue";
import Hunt from "@/components/Hunt.vue";
import { useModal } from "vue-final-modal";
import { useUserStore } from "@/stores/user";
import { useHuntsStore } from "@/stores/hunts";
import { useToast } from "vue-toast-notification";
import CopyIcon from "@/components/icons/Copy.vue";
import Multiply from "@/components/icons/Multiply.vue";
import DollarIcon from "@/components/icons/Dollar.vue";
import TargetIcon from "@/components/icons/Target.vue";
import CreateBonusHunt from "@/components/modals/CreateBonusHunt.vue";

const toast = useToast();
const userStore = useUserStore();
const huntsStore = useHuntsStore();
huntsStore.init();

const { open: openCreateHunt, close: closeCreateHunt } = useModal({
  component: CreateBonusHunt,
  attrs: {
    onConfirm(name, start) {
      huntsStore.createHunt({
        name,
        start,
      });

      closeCreateHunt();
    },
    onCancel() {
      closeCreateHunt();
    },
  },
});

const copyWidgetUrl = () => {
  navigator.clipboard.writeText(
    `${window.location.origin}/widgets/tracker/${userStore.user?._id}`
  );

  toast.success("Link copied to clipboard");
};

const hunts = computed(() => {
  return huntsStore.hunts || [];
});
</script>
<template>
  <div class="flex-1 w-full mt-5">
    <div class="flex flex-col sm:flex-row sm:gap-12 gap-6">
      <div
        class="flex justify-between bg-[#1a1d21] md:w-1/3 w-full p-3 rounded"
      >
        <div>
          <h1 class="text-base text-white/70 font-medium mb-1 uppercase">
            Best win
          </h1>
          <span class="text-white text-sm">0$</span>
        </div>

        <DollarIcon
          class="bg-[#0094ff]/30 text-2xl p-0.5 rounded text-[#0094ff] mt-1"
        />
      </div>

      <div
        class="flex justify-between bg-[#1a1d21] md:w-1/3 w-full p-3 rounded"
      >
        <div>
          <h1 class="text-base text-white/70 font-medium mb-1 uppercase">
            Best X win
          </h1>
          <span class="text-white text-sm">0</span>
        </div>

        <Multiply
          class="bg-[#0094ff]/30 text-2xl p-0.5 rounded text-[#0094ff] mt-1"
        />
      </div>

      <div
        class="flex justify-between bg-[#1a1d21] md:w-1/3 w-full p-3 rounded"
      >
        <div>
          <h1 class="text-base text-white/70 font-medium mb-1 uppercase">
            Bonus hunts
          </h1>
          <span class="text-white text-sm">{{ hunts.length }}</span>
        </div>

        <TargetIcon
          class="bg-[#0094ff]/30 text-2xl p-0.5 rounded text-[#0094ff] mt-1"
        />
      </div>
    </div>

    <div
      class="mt-10 mb-2.5 flex flex-col sm:flex-row sm:justify-between sm:items-center text-white"
      v-if="userStore.user"
    >
      <span class="text-xl font-medium">Bonus hunts</span>

      <div class="flex items-center gap-4">
        <button
          @click="copyWidgetUrl()"
          class="flex items-center text-white/70 gap-2 hover:text-white"
        >
          <CopyIcon class="w-5" />
          <span class="text-sm">Copy widget url</span>
        </button>

        <button
          @click="openCreateHunt"
          class="rounded text-sm text-white bg-[#1a1d21] px-3 py-1.5"
        >
          New bonushunt
        </button>
      </div>
    </div>

    <div
      class="relative overflow-x-auto shadow-sm shadow-black/10"
      v-if="userStore.user"
    >
      <table class="w-full h-full text-sm text-left text-gray-500">
        <thead class="text-xs text-white uppercase bg-[#1a1d21]">
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Start</th>
            <th scope="col" class="px-6 py-3">Req avg</th>
            <th scope="col" class="px-6 py-3">Winnings</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <Hunt v-for="v in hunts" :hunt="v" />
        </tbody>
      </table>
    </div>
    <div v-if="huntsStore.loading" class="flex justify-center mt-5">
      <svg
        aria-hidden="true"
        class="w-12 h-12 animate-spin fill-[#0094ff]"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  </div>
</template>
