<script setup lang="ts">
import { ref } from "vue";
import { io } from "socket.io-client";
import { useRoute } from "vue-router";
import HuntTracker from "@/components/widgets/HuntTracker.vue";

const route = useRoute();
const huntData = ref<{
  start: number;
  bonuses: any[];
  reqavg?: string | number;
  winnings?: string | number;
}>();

const socket = io(import.meta.env.VITE_API_URL, {
  query: {
    key: route.params.id,
  },
});

socket.connect();

socket.on("hunt", (args) => {
  huntData.value = args;
});
</script>

<template>
  <HuntTracker
    :data="{
      start: huntData?.start,
      winnings: huntData?.winnings,
      reqavg: huntData?.reqavg,
      bonuses: huntData?.bonuses || [],
    }"
    :colors="{
      primary: route.query.primary?.toString(),
      text: route.query.text?.toString(),
      secondary: route.query.secondary?.toString(),
    }"
  />
</template>
