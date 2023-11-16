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

export interface IUser {
  _id: string;
  id: string;
  avatar: string;
  global_name: string;
}
