import { env } from "../env";
import mongoose from "mongoose";
import { UserModel } from "./models/user";
import { HuntModel } from "./models/hunt";

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(env.MONGO_URL, {})
    .then(() => console.log("[DATABASE] Connected"));
};

const models = {
  user: UserModel,
  hunt: HuntModel,
};

export default { connect, models };
