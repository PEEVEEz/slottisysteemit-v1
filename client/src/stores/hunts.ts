import api from "@/api";
import { ref } from "vue";
import { defineStore } from "pinia";
import type { IBonus, IHunt, INewHunt } from "@/types";

export const useHuntsStore = defineStore("hunts", () => {
  const loading = ref(true);
  const hunts = ref<IHunt[] | null>(null);

  const handleError = (error: any, message: string) => {
    console.error(message, error);
  };

  const updateBonusBet = async (
    hunt_id: string,
    bonus_id: string,
    bet: number
  ) => {
    if (!hunts.value) return;

    try {
      const result = await api.put(
        "bonus",
        { hunt_id, bonus_id, bet },
        { withCredentials: true }
      );

      const index = hunts.value?.findIndex((v) => v._id === hunt_id);
      if (index === undefined || index === -1) return;
      hunts.value[index].bonuses = result.data;
    } catch (error) {
      handleError(error, "Error updating bonus bet");
    }
  };

  const deleteHunt = async (id: string) => {
    loading.value = true;

    try {
      const result = await api.delete(`hunt/${id}`, { withCredentials: true });

      if (result.status === 200) {
        hunts.value = hunts.value?.filter((hunt) => hunt._id !== id) || [];
      }
    } catch (error) {
      handleError(error, "Error deleting hunt");
    } finally {
      loading.value = false;
    }
  };

  const updateHunt = async (hunt_id: string, start: number, name: string) => {
    if (!hunts.value) return;
    loading.value = true;

    try {
      await api.put(
        "hunt",
        { hunt_id, start, name },
        { withCredentials: true }
      );

      const index = hunts.value?.findIndex((v) => v._id === hunt_id);

      if (index === undefined || index === -1) return;

      hunts.value[index] = { ...hunts.value[index], start, name };
    } catch (error) {
      handleError(error, "Error updating hunt");
    } finally {
      loading.value = false;
    }
  };

  const redeemBonus = async (
    hunt_id: string,
    bonus_id: string,
    payout: number
  ) => {
    if (!hunts.value) return;

    try {
      const result = await api.post(
        "bonus/redeem",
        { hunt_id, bonus_id, payout },
        { withCredentials: true }
      );

      const huntIndex = hunts.value?.findIndex((hunt) => hunt._id === hunt_id);
      if (huntIndex === undefined || huntIndex === -1) return;

      hunts.value[huntIndex].bonuses = result.data;
    } catch (error) {
      handleError(error, "Error redeeming bonus");
    }
  };

  const deleteBonus = async (huntId?: string, bonusId?: string) => {
    if (!huntId || !bonusId || !hunts.value) return;

    try {
      const result = await api.delete(`bonus/${huntId}/${bonusId}`, {
        withCredentials: true,
      });

      if (result.status === 200) {
        const huntIndex = hunts.value?.findIndex((hunt) => hunt._id === huntId);
        if (huntIndex === undefined) return;

        hunts.value[huntIndex] = result.data;
      }
    } catch (error) {
      handleError(error, "Error deleting bonus");
    }
  };

  const addBonus = async (huntId: string, bonus: IBonus) => {
    if (!hunts.value) return;

    try {
      const result = await api.post(
        "bonus",
        { hunt_id: huntId, game_name: bonus.game_name, bet: bonus.bet },
        { withCredentials: true }
      );

      if (result.status === 200) {
        const huntIndex = hunts.value.findIndex((hunt) => hunt._id === huntId);
        if (huntIndex === -1) return;
        hunts.value[huntIndex] = result.data;
      }
    } catch (error) {
      handleError(error, "Error adding bonus");
    }
  };

  const createHunt = async (data: INewHunt) => {
    loading.value = true;

    try {
      const result = await api.post("hunt", data, { withCredentials: true });

      if (result.status === 200) {
        hunts.value?.push(result.data);
      }
    } catch (error) {
      handleError(error, "Error creating hunt");
    } finally {
      loading.value = false;
    }
  };

  const init = async () => {
    if (hunts.value) return;

    try {
      const result = await api.get("hunt", { withCredentials: true });

      hunts.value = result.data;
    } catch (error) {
      handleError(error, "Error getting hunts");
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
    updateHunt,
    updateBonusBet,
  };
});
