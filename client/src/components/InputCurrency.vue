<script setup lang="ts">
const props = defineProps<{ value: number; enterPressed?: () => void }>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const handleChange = (e: any) => {
  emit("update:modelValue", Number(e.target.value));
};

const handlePress = () => {
  if (props.enterPressed) {
    props.enterPressed();
  }
};
</script>

<template>
  <div class="relative">
    <input
      @input="handleChange"
      :value="props.value"
      @keyup.enter="handlePress()"
      type="number"
      class="w-full bg-[#1a1d21] p-1.5 outline-none rounded"
    />
  </div>
</template>
