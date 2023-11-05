<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { io } from "socket.io-client";
import Widget from "../components/Widget.vue";

const route = useRoute();
const huntData = ref<{ start: number; bonuses: any[] }>();

const socket = io("http://localhost:3001", {
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
