<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { io } from "socket.io-client";
import Widget from "../components/Widget.vue";

const route = useRoute();
const huntData = ref<{ start: number; bonuses: any[] }>();

const socket = io(import.meta.env.VITE_API_URL, {
  query: {
    key: route.params.id,
  },
});

socket.connect();

socket.on("hunt", (args) => {
  huntData.value = args;
  console.log(args);
});
</script>

<template>
  <Widget :data="huntData" />
</template>
