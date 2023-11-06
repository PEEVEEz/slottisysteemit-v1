import { FastifyInstanceType } from "../types";
import { authMiddleware } from "../middlewares/auth";
import { FastifyPluginOptions } from "fastify/types/plugin";

export const registerUserRoutes = (
  instance: FastifyInstanceType,
  _opt: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
) => {
  /** @ts-ignore */
  instance.addHook("preHandler", authMiddleware);

  instance.get("/me", (req) => {
    return req.user;
  });

  done();
};
