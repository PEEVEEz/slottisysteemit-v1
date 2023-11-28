<script setup lang="ts">
import Bg from "@/assets/bg.png";
import { VueFinalModal } from "vue-final-modal";
</script>

<template>
  <VueFinalModal
    class="flex items-center pt-28 flex-col"
    content-class="flex flex-col px-5 pb-5 pt-6 shadow shadow-white/5 border border-white/5 rounded text-white sm:w-1/2 md:w-1/3 xl:w-1/4 max-w-lg"
    :content-style="{ background: `url(${Bg})`, backgroundSize: '250%' }"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <slot />
  </VueFinalModal>
</template>
