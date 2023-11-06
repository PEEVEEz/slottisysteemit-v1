<script setup lang="ts">
const props = defineProps<{ title: string }>();
</script>

<template>
  <h1 class="text-white/90 text-2xl mb-8 font-medium">{{ props.title }}</h1>
</template>
