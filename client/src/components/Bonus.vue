<script setup lang="ts">
import type { IBonus } from "@/types";
import { useModal } from "vue-final-modal";
import EditBonus from "./modals/EditBonus.vue";
import EditIcon from "@/components/icons/Edit.vue";
import TrashIcon from "@/components/icons/Trash.vue";
import { useHuntsStore } from "@/stores/hunts";

const huntStore = useHuntsStore();
const props = defineProps<{
  data: IBonus;
  hunt_id: string;
}>();

const { open: openUpdateBonus, close: closeUpdateBonus } = useModal({
  component: EditBonus,
  attrs: {
    bet: props.data.bet,

    onConfirm(bet) {
      if (!props.data._id) return;
      huntStore.updateBonusBet(props.hunt_id, props.data._id, bet);
      closeUpdateBonus();
    },
    onCancel() {
      closeUpdateBonus();
    },
  },
});
</script>

<template>
  <tr class="border-b border-white/5">
    <th
      scope="row"
      class="px-6 py-4 font-medium text-zinc-100 whitespace-nowrap"
    >
      {{ props.data.game_name }}
    </th>
    <td class="px-6 py-4">{{ props.data.bet }}€</td>
    <td class="px-6 py-4">
      {{ props.data.payout ? `${props.data.payout}€` : "" }}
    </td>
    <td class="px-6 py-4 flex gap-5">
      <button @click="openUpdateBonus()">
        <EditIcon class="w-5 text-white/50" />
      </button>

      <button @click="huntStore.deleteBonus(props.hunt_id, props.data._id)">
        <TrashIcon class="w-5 text-red-500" />
      </button>
    </td>
  </tr>
</template>
