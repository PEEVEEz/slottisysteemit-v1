<script setup lang="ts">
const props = defineProps<{ value: string }>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const handleChange = (e: any) => {
  emit("update:modelValue", e.target.value);
};
</script>

<template>
  <div class="relative">
    <input
      @input="handleChange"
      :value="props.value"
      class="w-full bg-[#1a1d21] p-1.5 outline-none rounded"
    />
  </div>
</template>
