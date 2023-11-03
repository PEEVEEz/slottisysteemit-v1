import { RawServerDefault } from "fastify/types/utils";
import { FastifyInstance } from "fastify/types/instance";
import { FastifyBaseLogger } from "fastify/types/logger";
import { FastifyPluginOptions } from "fastify/types/plugin";
import { IncomingMessage, ServerResponse } from "node:http";
import { FastifyTypeProvider } from "fastify/types/type-provider";
import { authMiddleware } from "../middlewares/auth";
import database from "../database";
import { StatusCodes } from "http-status-codes";
import { FastifyRequest } from "fastify";

export const registerHuntRoutes = (
  instance: FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    FastifyTypeProvider
  >,
  _opt: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
) => {
  /** @ts-ignore */
  instance.addHook("preHandler", authMiddleware);

  instance.get("/", async (req, reply) => {
    return await database.models.hunt.find({ user_id: req.user._id });
  });

  instance.post(
    "/",
    async (
      req: FastifyRequest<{ Body: { name: string; start: number } }>,
      reply
    ) => {
      const activeHunt = await database.models.hunt.findOne({
        user_id: req.user._id,
        active: true,
      });

      if (activeHunt)
        return reply.status(StatusCodes.FORBIDDEN).send({
          message: activeHunt._id,
        });

      const newHunt = new database.models.hunt({
        user_id: req.user._id,
        name: req.body.name,
        start: req.body.start,
        active: true,
        bonuses: [],
      });

      newHunt.save();

      return {
        _id: newHunt?._id,
        name: req.body.name,
        start: req.body.start,
        active: true,
        bonuses: [],
      };
    }
  );

  done();
};
