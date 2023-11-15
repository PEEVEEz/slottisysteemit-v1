import { Schema, model } from "mongoose";

const BonusSchema = new Schema(
  {
    game_name: String,
    bet: Number,
    payout: Number,
    index: Number,
  },
  { timestamps: true }
);

const HuntSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    start: {
      type: Number,
      required: true,
    },
    redeeming: Boolean,
    result: Number,
    bonuses: {
      type: [BonusSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export const HuntModel = model("hunts", HuntSchema);
