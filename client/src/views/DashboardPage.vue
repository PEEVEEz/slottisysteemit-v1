<script setup lang="ts">
import { useModal } from "vue-final-modal";
import { useUserStore } from "../stores/user";
import { useHuntsStore } from "../stores/hunts";
import CreateBonusHunt from "../components/modals/CreateBonusHunt.vue";

const userStore = useUserStore();
const huntsStore = useHuntsStore();
huntsStore.init();

const { open: openCreateHunt, close: closeCreateHunt } = useModal({
  component: CreateBonusHunt,
  attrs: {
    onConfirm(name, start) {
      huntsStore.newHunt({
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
</script>
<template>
  <div class="py-6">
    <div class="flex flex-col sm:flex-row sm:gap-12 gap-6">
      <div
        class="sm:w-1/3 w-full bg-[#1a1d21] rounded p-2 flex justify-between items-center text-white"
      >
        <div>Best win</div>
        <span class="text-[#0094ff]">00.0€</span>
      </div>
      <div
        class="sm:w-1/3 w-full bg-[#1a1d21] rounded p-2 flex justify-between items-center text-white"
      >
        <div>Users</div>
        <span class="text-[#0094ff]">10</span>
      </div>

      <div
        class="sm:w-1/3 w-full bg-[#1a1d21] rounded p-2 flex justify-between items-center text-white"
      >
        <div>Bonus hunts</div>

        <span class="text-[#0094ff]">10</span>
      </div>
    </div>

    <!-- Actions  -->
    <div
      class="mt-10 flex flex-wrap gap-5 justify-center"
      v-if="userStore.user"
    >
      <button class="w-full sm:w-1/3 rounded text-white bg-[#0094ff] py-2">
        Edit theme (Coming soon)
      </button>

      <button class="w-full sm:w-1/3 rounded text-white bg-[#1a1d21] py-2">
        Copy widget url
      </button>

      <button class="w-full sm:w-1/3 rounded text-white bg-red-500 py-2">
        Delete all data
      </button>
    </div>

    <div
      class="mt-10 mb-2.5 flex justify-between items-center text-white"
      v-if="userStore.user"
    >
      <span class="text-xl font-medium">Bonus hunts</span>

      <button
        @click="openCreateHunt"
        class="rounded text-sm text-white bg-[#1a1d21] px-3 py-1.5"
      >
        New bonushunt
      </button>
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
            <th scope="col" class="px-6 py-3">End</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="!huntsStore.loading"
            v-for="(v, k) in huntsStore.hunts"
            class="border-b border-white/5"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-zinc-100 whitespace-nowrap"
            >
              {{ v.name }}
            </th>
            <td class="px-6 py-4">{{ v.start }}</td>
            <td class="px-6 py-4">{{ v.end ?? "-" }}</td>
            <td class="px-6 py-4 flex gap-5">
              <RouterLink :to="'/hunt/' + v._id">
                <i class="bx bx-show-alt text-lg"></i>
              </RouterLink>
              <button><i class="bx bx-trash text-red-500 text-lg"></i></button>

              <button
                v-if="v.active"
                class="bg-red-500 px-4 rounded text-white"
              >
                STOP
              </button>
            </td>
          </tr>
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
