<script setup lang="ts">
import { useHuntsStore } from "@/stores/hunts";

const huntStore = useHuntsStore();
huntStore.init();
</script>

<template>
  <div class="flex-1 w-full flex flex-col" v-if="!huntStore.loading">
    <RouterView />
  </div>
</template>
