<script setup lang="ts">
import { computed, ref } from "vue";

const show = ref(false);

const props = defineProps<{ value: string; items: any[] | null }>();
const emit = defineEmits<{
  (e: "change"): any;
  (e: "update:modelValue", value: string): void;
}>();

const items = computed(() => {
  if (props.items && props.items.length > 0) {
    show.value = true;
  } else {
    return null;
  }

  return props.items;
});

document.addEventListener("click", (e: any) => {
  if (e.target.id === "autocomplete") return;
  show.value = false;
});

const handleChange = (e: any) => {
  emit("change");
  emit("update:modelValue", e.target.value);
};

const onFocus = () => {
  if (items.value) {
    show.value = true;
  }
};
</script>

<template>
  <div class="relative">
    <input
      id="autocomplete"
      class="w-full bg-[#1a1d21] p-1.5 outline-none rounded"
      :value="props.value"
      @focus="onFocus"
      @input="handleChange"
    />

    <div
      class="absolute bg-[#1a1d21] border border-white/10 mt-2 rounded text-white overflow-y-auto w-full py-2 px-1 transition-all flex flex-col gap-2 z-10"
      :class="show ? '' : 'hidden'"
    >
      <div
        v-if="items"
        v-for="(v, k) in items"
        @click="emit('update:modelValue', String(v))"
        class="hover:bg-[#0e0f12]/40 py-2 px-2 rounded cursor-pointer"
      >
        {{ v }}
      </div>
    </div>
  </div>
</template>
