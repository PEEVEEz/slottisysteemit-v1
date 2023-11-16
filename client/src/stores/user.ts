import api from "@/api";
import { ref } from "vue";
import { defineStore } from "pinia";
import type { IUser } from "@/types";

export const useUserStore = defineStore("user", () => {
  const loading = ref(true);
  const initialized = ref(false);
  const user = ref<IUser | null>(null);

  const init = async () => {
    try {
      const result = await api.get("user/me", {
        withCredentials: true,
      });

      user.value = result.data;
    } catch (e) {
      console.log("Login error", e);
    }

    loading.value = false;
    initialized.value = true;
  };

  const logout = async () => {
    const result = await api.get("auth/logout", {
      withCredentials: true,
    });

    if (result.status === 200) {
      location.reload();
    }
  };

  return { user, init, logout, loading, initialized };
});
