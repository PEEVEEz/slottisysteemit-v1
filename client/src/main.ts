import "./assets/main.css";
import "vue-final-modal/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { createVfm } from "vue-final-modal";
import Vue3Marquee from "vue3-marquee";
import PrimeVue from "primevue/config";
import Tailwind from "primevue/passthrough/tailwind";

const app = createApp(App);

app.use(PrimeVue, {
  ripple: true,
  unstyled: true,
  pt: Tailwind,
  ptOptions: { mergeProps: true },
});
app.use(Vue3Marquee);
app.use(createVfm());
app.use(createPinia());
app.use(router);

app.mount("#app");
