import database from "../database";
import { FastifyRequest } from "fastify";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { authMiddleware } from "../middlewares/auth";
import { RawServerDefault } from "fastify/types/utils";
import { FastifyInstance } from "fastify/types/instance";
import { FastifyBaseLogger } from "fastify/types/logger";
import { FastifyPluginOptions } from "fastify/types/plugin";
import { IncomingMessage, ServerResponse } from "node:http";
import { FastifyTypeProvider } from "fastify/types/type-provider";
import { sendMessageToAllWithSameKey } from "../socket";

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

  instance.delete(
    "/:id",
    async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {
      const success = await database.models.hunt.findByIdAndDelete(
        req.params.id
      );

      if (success) {
        return getReasonPhrase(StatusCodes.OK);
      }

      return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  );

  instance.get(
    "/",
    async (req: FastifyRequest<{ Body: { _id: string } }>, reply) => {
      return await database.models.hunt.find({ user_id: req.user._id });
    }
  );

  instance.post(
    "/addBonus",
    async (
      req: FastifyRequest<{
        Body: { game_name: string; bet: number; huntId: string };
      }>,
      reply
    ) => {
      var hunt = await database.models.hunt.findById(req.body.huntId);
      if (!hunt)
        return reply.status(StatusCodes.NOT_FOUND).send({
          message: req.body.huntId,
        });

      hunt.bonuses.push({
        game_name: req.body.game_name,
        bet: req.body.bet,
        index: hunt.bonuses.length,
      });

      await database.models.hunt.findByIdAndUpdate(req.body.huntId, {
        bonuses: hunt.bonuses,
      });

      sendMessageToAllWithSameKey(req.user._id, "hunt", hunt);
      return { bonuses: hunt.bonuses };
    }
  );

  instance.post(
    "/startRedeeming",
    (req: FastifyRequest<{ Body: { _id: string } }>, reply) => {
      const result = database.models.hunt.findByIdAndUpdate(req.body._id, {
        redeeming: true,
      });

      if (!result)
        return reply.status(StatusCodes.NOT_FOUND).send({
          message: "Hunt not found",
        });

      return "ok";
    }
  );

  instance.post(
    "/end",
    (req: FastifyRequest<{ Body: { _id: string; end: number } }>, reply) => {
      const result = database.models.hunt.findByIdAndUpdate(req.body._id, {
        redeeming: false,
        active: false,
        end: req.body.end,
      });

      if (!result)
        return reply.status(StatusCodes.NOT_FOUND).send({
          message: "Hunt not found",
        });

      return "ok";
    }
  );

  instance.post(
    "/",
    async (
      req: FastifyRequest<{ Body: { name: string; start: number } }>,
      reply
    ) => {
      const newHunt = new database.models.hunt({
        user_id: req.user._id,
        name: req.body.name,
        start: req.body.start,
        active: true,
        bonuses: [],
      });

      newHunt.save();

      sendMessageToAllWithSameKey(req.user._id, "hunt", newHunt);

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
