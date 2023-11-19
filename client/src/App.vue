<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import { ModalsContainer } from "vue-final-modal";
</script>

<template>
  <div
    v-if="!$route.meta.widget"
    class="w-full h-screen bg-[#0e0f12] overflow-y-auto"
  >
    <ModalsContainer />
    <div class="mx-auto max-w-7xl px-3 h-full flex flex-col">
      <Navbar />
      <RouterView />
    </div>
  </div>
  <RouterView v-else />
</template>
