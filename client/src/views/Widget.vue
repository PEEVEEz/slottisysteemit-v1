<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { io } from "socket.io-client";
import Widget from "../components/Widget.vue";

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
  <Widget
    :data="{
      start: huntData?.start,
      winnings: huntData?.winnings,
      reqavg: huntData?.reqavg,
      bonuses: huntData?.bonuses || [],
    }"
    :colors="{
      background: route.query.background?.toString(),
      text: route.query.text?.toString(),
      text2: route.query.text2?.toString(),
    }"
  />
</template>
