import { Schema, model } from "mongoose";

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
    active: Boolean,
    end: Number,
    bonuses: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

export const HuntModel = model("hunts", HuntSchema);
