import api from "@/api";
import { ref } from "vue";
import { defineStore } from "pinia";

export interface IBonus {
  _id?: string;
  game_name: string;
  bet: number;
  payout?: number;
  index?: number;
}

export interface IHunt {
  _id: string;
  name: string;
  start: number;
  end?: number;
  active: boolean;
  redeeming?: boolean;
  bonuses: IBonus[];
}

export interface INewHunt {
  name: string;
  start: number;
}

export const useHuntsStore = defineStore("hunts", () => {
  const loading = ref(true);
  const hunts = ref<IHunt[] | null>(null);

  const deleteHunt = async (id: string) => {
    loading.value = true;

    try {
      const result = await api.delete(`hunt/${id}`, {
        withCredentials: true,
      });

      if (result.status === 200) {
        hunts.value = hunts.value?.filter((hunt) => hunt._id !== id) || [];
      }
    } catch (error) {
      console.error("Error deleting hunt", error);
    } finally {
      loading.value = false;
    }
  };

  const redeemBonus = async (
    hunt_id: string,
    bonus_id: string,
    payout: number
  ) => {
    try {
      const result = await api.post(
        "bonus/redeem",
        { hunt_id, bonus_id, payout },
        {
          withCredentials: true,
        }
      );

      const huntIndex = hunts.value?.findIndex((hunt) => hunt._id === hunt_id);
      if (huntIndex === undefined || huntIndex === -1) return;

      if (hunts.value && hunts.value[huntIndex]) {
        hunts.value[huntIndex].bonuses = result.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const startRedeeming = async (hunt_id?: string) => {
    if (!hunt_id) return;

    try {
      const result = await api.post(
        "hunt/start",
        { hunt_id },
        {
          withCredentials: true,
        }
      );

      const huntIndex = hunts.value?.findIndex((hunt) => hunt._id === hunt_id);
      if (huntIndex === undefined) return;

      if (hunts.value && hunts.value[huntIndex]) {
        hunts.value[huntIndex] = {
          ...hunts.value[huntIndex],
          redeeming: result.data,
        };
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteBonus = async (huntId?: string, bonusId?: string) => {
    if (!huntId || !bonusId) return;

    try {
      const result = await api.delete(`bonus/${huntId}/${bonusId}`, {
        withCredentials: true,
      });

      if (result.status === 200) {
        const huntIndex = hunts.value?.findIndex((hunt) => hunt._id === huntId);
        if (huntIndex === undefined) return;

        if (hunts.value && hunts.value[huntIndex]) {
          hunts.value[huntIndex] = {
            ...hunts.value[huntIndex],
            bonuses: result.data,
          };
        }
      }
    } catch (error) {
      console.error("Error deleting bonus", error);
    }
  };

  const addBonus = async (huntId: string, bonus: IBonus) => {
    if (!hunts.value) return;

    try {
      const result = await api.post(
        "bonus",
        { hunt_id: huntId, game_name: bonus.game_name, bet: bonus.bet },
        {
          withCredentials: true,
        }
      );

      if (result.status === 200) {
        const huntIndex = hunts.value.findIndex((hunt) => hunt._id === huntId);
        if (huntIndex === -1) return;
        hunts.value[huntIndex] = {
          ...hunts.value[huntIndex],
          bonuses: result.data,
        };
      }
    } catch (error) {
      console.error("Error adding bonus", error);
    }
  };

  const createHunt = async (data: INewHunt) => {
    loading.value = true;

    try {
      const result = await api.post("hunt", data, {
        withCredentials: true,
      });

      if (result.status === 200) {
        hunts.value?.push(result.data);
      }
    } catch (error) {
      console.error("Error creating hunt", error);
    } finally {
      loading.value = false;
    }
  };

  const init = async () => {
    if (hunts.value) return;

    try {
      const result = await api.get("hunt", {
        withCredentials: true,
      });

      hunts.value = result.data;
    } catch (error) {
      console.error("Error getting hunts", error);
    } finally {
      loading.value = false;
    }
  };

  return {
    hunts,
    loading,
    redeemBonus,
    init,
    createHunt,
    addBonus,
    deleteHunt,
    deleteBonus,
    startRedeeming,
  };
});
