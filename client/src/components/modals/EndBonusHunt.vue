<script setup lang="ts">
import Modal from "../Modal.vue";

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();
</script>
<template>
  <Modal>
    <h1 class="text-center text-2xl mb-4">Are you sure?</h1>

    <div class="mt-12 flex gap-7">
      <button
        @click="emit('cancel')"
        class="bg-red-500 w-1/3 py-1 text-white rounded"
      >
        No
      </button>

      <button
        @click="emit('confirm')"
        class="bg-[#0094ff] w-full py-1 text-white rounded"
      >
        Yes
      </button>
    </div>
  </Modal>
</template>
