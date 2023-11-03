<script setup lang="ts">
import { RouterView } from "vue-router";
import { ModalsContainer } from "vue-final-modal";
</script>

<template>
  <div
    v-if="$route.name?.toString() !== 'widget'"
    class="w-full h-screen bg-[#0e0f12] overflow-y-auto"
  >
    <ModalsContainer />
    <RouterView />
  </div>
  <RouterView v-else />
</template>
