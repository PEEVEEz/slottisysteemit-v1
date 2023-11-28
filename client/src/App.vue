<script setup lang="ts">
import Bg from "./assets/bg.png";
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import { ModalsContainer } from "vue-final-modal";
</script>

<template>
  <div
    v-if="!$route.meta.widget"
    class="w-full h-screen overflow-y-auto"
    :style="{
      background: `url(${Bg}) #0e0f12`,
      backgroundSize: '100%',
    }"
  >
    <ModalsContainer />
    <div class="mx-auto max-w-7xl px-3 h-full flex flex-col">
      <Navbar v-if="$route.meta.navbar !== false" />
      <RouterView />
    </div>
  </div>
  <RouterView v-else />
</template>
