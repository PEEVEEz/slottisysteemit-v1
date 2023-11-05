import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    discordId: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel = model("users", UserSchema);
