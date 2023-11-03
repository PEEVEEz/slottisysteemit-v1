import axios from "axios";
import { ref, computed } from "vue";
import { defineStore } from "pinia";

export interface IBonus {
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

  const addBonus = async (huntId: string, bonus: IBonus) => {
    if (!hunts.value) return;

    try {
      const result = await axios.post(
        "http://localhost:3001/hunt/addBonus",
        { huntId, game_name: bonus.game_name, bet: bonus.bet },
        {
          withCredentials: true,
        }
      );

      if (result.status === 200) {
        const huntIndex = hunts.value.findIndex((v) => v._id == huntId);
        if (huntIndex === null) return;
        hunts.value[huntIndex].bonuses = result.data.bonuses;
      }
    } catch (e) {
      console.log("add bonus error", e);
    }
  };

  const newHunt = async (data: INewHunt) => {
    loading.value = true;

    try {
      console.log("TEHÄÄS NY SI");
      const result = await axios.post("http://localhost:3001/hunt", data, {
        withCredentials: true,
      });

      if (result.status === 200) {
        console.log(result.data);
        hunts.value?.push(result.data);
      }
    } catch (e) {
      console.log("create hunt error", e);
    }

    loading.value = false;
  };

  const init = async () => {
    if (hunts.value) return;

    try {
      const result = await axios.get("http://localhost:3001/hunt", {
        withCredentials: true,
      });

      hunts.value = result.data;
    } catch (e) {
      console.log("get hunts error", e);
    }

    loading.value = false;
  };

  return { hunts, loading, init, newHunt, addBonus };
});
