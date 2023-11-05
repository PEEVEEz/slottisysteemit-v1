import axios from "axios";
import { ref, computed } from "vue";
import { defineStore } from "pinia";

export interface IUser {
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
      const result = await axios.get("http://localhost:3001/user/me", {
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
    const result = await axios.get("http://localhost:3001/auth/logout", {
      withCredentials: true,
    });

    if (result.status === 200) {
      location.reload();
    }
  };

  return { user, init, logout, loading, initialized };
});
