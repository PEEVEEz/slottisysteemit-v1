import database from "../database";
import { FastifyRequest } from "fastify";
import { FastifyInstanceType } from "../types";
import { authMiddleware } from "../middlewares/auth";
import { sendMessageToAllWithSameKey } from "../socket";
import { FastifyPluginOptions } from "fastify/types/plugin";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export const registerHuntRoutes = (
  instance: FastifyInstanceType,
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

  instance.get("/", async (req: FastifyRequest<{ Body: { _id: string } }>) => {
    return await database.models.hunt.find({ user_id: req.user._id });
  });

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
          message: getReasonPhrase(StatusCodes.NOT_FOUND),
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
          message: getReasonPhrase(StatusCodes.NOT_FOUND),
        });

      return getReasonPhrase(StatusCodes.OK);
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
          message: getReasonPhrase(StatusCodes.NOT_FOUND),
        });

      return getReasonPhrase(StatusCodes.OK);
    }
  );

  instance.post(
    "/",
    async (
      req: FastifyRequest<{ Body: { name: string; start: number } }>,
      reply
    ) => {
      if (!req.body.name || !req.body.start) {
        reply.status(StatusCodes.BAD_REQUEST).send({
          message: getReasonPhrase(StatusCodes.BAD_REQUEST),
        });
        return;
      }

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
