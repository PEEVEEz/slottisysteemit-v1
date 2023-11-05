import api from "@/api";
import { ref, computed } from "vue";
import { defineStore } from "pinia";

export interface IUser {
  _id: string;
  id: string;
  avatar: string;
  global_name: string;
}

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
