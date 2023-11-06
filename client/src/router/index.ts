import { useUserStore } from "@/stores/user";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/LandingPage.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/dashboard/Dashboard.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: () => import("@/views/dashboard/DashboardHome.vue"),
        },
        {
          path: "hunts",
          component: () => import("../views/dashboard/Bonustracker/Hunts.vue"),
        },
        {
          path: "hunts/:id",
          component: () => import("../views/dashboard/Bonustracker/Hunt.vue"),
        },
      ],
    },
    {
      path: "/widget/:id",
      name: "widget",
      component: () => import("../views/Widget.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth || to.name === "home") {
    const userStore = useUserStore();
    if (!userStore.initialized) await userStore.init();

    if (!userStore.user && to.name !== "home") {
      return {
        path: "/",
      };
    }
  }
});

export default router;
