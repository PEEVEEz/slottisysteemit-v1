import { authMiddleware } from "../middlewares/auth";
import { RawServerDefault } from "fastify/types/utils";
import { FastifyInstance } from "fastify/types/instance";
import { FastifyBaseLogger } from "fastify/types/logger";
import { FastifyPluginOptions } from "fastify/types/plugin";
import { IncomingMessage, ServerResponse } from "node:http";
import { FastifyTypeProvider } from "fastify/types/type-provider";

export const registerUserRoutes = (
  instance: FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    FastifyTypeProvider
  >,
  opt: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
) => {
  /** @ts-ignore */
  instance.addHook("preHandler", authMiddleware);

  instance.get("/me", (req, reply) => {
    return req.user;
  });

  done();
};
