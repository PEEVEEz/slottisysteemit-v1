import "./assets/main.css";
import "vue-final-modal/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import Vue3Marquee from "vue3-marquee";
import { createVfm } from "vue-final-modal";

const app = createApp(App);

app.use(Vue3Marquee);
app.use(createVfm());
app.use(createPinia());
app.use(router);

app.mount("#app");
