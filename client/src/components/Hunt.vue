<script setup lang="ts">
import { useModal } from "vue-final-modal";
import ShowIcon from "@/components/icons/Show.vue";
import EditIcon from "@/components/icons/Edit.vue";
import TrashIcon from "@/components/icons/Trash.vue";
import EditBonusHunt from "./modals/EditBonusHunt.vue";
import { useHuntsStore } from "@/stores/hunts";
import type { IHunt } from "@/types";

const props = defineProps<{ hunt: IHunt }>();

const huntStore = useHuntsStore();

const { open: openUpdateHunt, close: closeUpdateHunt } = useModal({
  component: EditBonusHunt,
  attrs: {
    activeHunt: props.hunt,

    onConfirm(name, start) {
      huntStore.updateHunt(props.hunt._id, start, name);
      closeUpdateHunt();
    },
    onCancel() {
      closeUpdateHunt();
    },
  },
});
</script>

<template>
  <tr v-if="!huntStore.loading" class="border-b border-white/5">
    <th
      scope="row"
      class="px-6 py-4 font-medium text-zinc-100 whitespace-nowrap"
    >
      {{ props.hunt.name }}
    </th>
    <td class="px-6 py-4">{{ props.hunt.start }}€</td>
    <td class="px-6 py-4">
      {{ props.hunt.reqavg ? `${props.hunt.reqavg}x` : "-" }}
    </td>
    <td class="px-6 py-4">
      {{ props.hunt.winnings ? `${props.hunt.winnings}€` : "-" }}
    </td>
    <td class="px-6 py-4 flex gap-5">
      <RouterLink :to="'/dashboard/hunts/' + props.hunt._id">
        <ShowIcon class="w-5 text-white/50" />
      </RouterLink>

      <button @click="openUpdateHunt()">
        <EditIcon class="w-5 text-white/50" />
      </button>

      <button @click="huntStore.deleteHunt(props.hunt._id)">
        <TrashIcon class="w-5 text-red-500" />
      </button>
    </td>
  </tr>
</template>
