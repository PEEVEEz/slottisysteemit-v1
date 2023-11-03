<script setup lang="ts">
import { useUserStore } from "../stores/user";
import LandingPage from "./LandingPage.vue";
import DashboardPage from "./DashboardPage.vue";

const userStore = useUserStore();
userStore.init();
</script>
<template>
  <LandingPage v-if="!userStore.user" />
  <DashboardPage v-else />
</template>
