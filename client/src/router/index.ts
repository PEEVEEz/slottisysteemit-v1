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
      path: "/hunts",
      name: "hunts",
      meta: { requiresAuth: true },
      component: () => import("@/views/bonushunts/Hunts.vue"),
    },
    {
      path: "/hunts/:id",
      name: "hunt",
      meta: { requiresAuth: true },
      component: () => import("@/views/bonushunts/Hunt.vue"),
      children: [
        {
          path: "",
          component: () => import("@/views/bonushunts/Hunt/Bonuses.vue"),
        },
        {
          path: "redeem",
          component: () => import("@/views/bonushunts/Hunt/Redeem.vue"),
        },
      ],
    },
    {
      path: "/overlays",
      name: "overlays",
      component: () => import("@/views/overlays/Overlays.vue"),
    },
    {
      path: "/widgets",
      name: "widgets",
      meta: { widget: true },
      children: [
        {
          path: "tracker/:id",
          component: () => import("@/views/widgets/HuntTracker.vue"),
        },
      ],
    },
  ],
});

router.beforeEach(async (to) => {
  if (to.meta.widget) return;

  const userStore = useUserStore();
  if (!userStore.initialized) await userStore.init();

  if (to.meta.requiresAuth && !userStore.user) {
    return {
      path: "/",
    };
  }
});

export default router;
