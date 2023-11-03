<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { ModalsContainer } from "vue-final-modal";
</script>

<template>
  <div
    v-if="$route.name?.toString() !== 'widget'"
    class="w-full h-screen bg-[#0e0f12] overflow-y-auto"
  >
    <!-- <div class="mx-auto max-w-7xl flex flex-col h-full px-3 sm:px-0">
      <Navbar />
      <div class="flex-1">
      </div>
      <Footer />
    </div> -->
    <ModalsContainer />
    <RouterView />
  </div>
  <RouterView v-else />
</template>
