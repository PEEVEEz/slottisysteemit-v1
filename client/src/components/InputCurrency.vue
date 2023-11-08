<script setup lang="ts">
const props = defineProps<{ value: number }>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const handleChange = (e: any) => {
  emit("update:modelValue", Number(e.target.value));
};
</script>

<template>
  <div class="relative">
    <input
      @input="handleChange"
      :value="props.value"
      type="number"
      class="w-full bg-[#1a1d21] p-1.5 outline-none rounded"
    />
  </div>
</template>
