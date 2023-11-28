<script setup lang="ts">
import { ref } from "vue";
import { ColorPicker } from "vue-color-kit";
import HuntTracker from "../widgets/HuntTracker.vue";
import ArrowLeftIcon from "@/components/icons/ArrowLeft.vue";

import SaveIcon from "@/components/icons/Save.vue";

const secondary = ref("a78bfa");
const primary = ref("111827");
const open = ref(-1);
const text = ref("fff");

const toggleOpen = (index: number) => {
  if (open.value === index) open.value = -1;
  else {
    open.value = index;
  }
};

const save = () => {};
</script>
<template>
  <div class="flex justify-between items-center">
    <div class="flex text-white items-center">
      <RouterLink to="/hunts">
        <ArrowLeftIcon class="w-5" />
      </RouterLink>
      <span class="text-lg font-medium">Edit tracker theme</span>
    </div>

    <div>
      <button class="flex items-center text-white/70 gap-2 hover:text-white">
        <SaveIcon class="w-5" />
        <span class="text-sm">Save</span>
      </button>
    </div>
  </div>

  <div class="flex justify-between text-white mt-4">
    <div class="flex flex-col relative">
      <div class="flex">
        <div class="w-full">Primary</div>
        <div
          class="w-6 h-5 ml-4 border rounded"
          :style="{ backgroundColor: `#${primary}` }"
          @click="toggleOpen(1)"
        ></div>

        <ColorPicker
          class="absolute right-[-14rem]"
          v-if="open === 1"
          :color="`#${primary}`"
          @changeColor="(color) => (primary = String(color.hex).substring(1))"
        />
      </div>
      <div class="flex">
        <div class="w-full">Secondary</div>
        <div
          class="w-6 h-5 ml-4 border rounded"
          :style="{ backgroundColor: `#${secondary}` }"
          @click="toggleOpen(2)"
        ></div>

        <ColorPicker
          class="absolute right-[-14rem]"
          v-if="open === 2"
          :color="`#${secondary}`"
          @changeColor="(color) => (secondary = String(color.hex).substring(1))"
        />
      </div>

      <div class="flex relative">
        <div class="w-full">Text</div>
        <div
          class="w-6 h-5 ml-4 border rounded"
          :style="{ backgroundColor: `#${text}` }"
          @click="toggleOpen(3)"
        ></div>

        <ColorPicker
          class="absolute right-[-14rem]"
          v-if="open === 3"
          :color="`#${text}`"
          @changeColor="(color) => (text = String(color.hex).substring(1))"
        />
      </div>
    </div>
    <HuntTracker
      :colors="{
        primary: primary,
        secondary: secondary,
        text: text,
      }"
    />
  </div>
</template>
