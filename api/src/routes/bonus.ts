import database from "../database";
import { FastifyRequest } from "fastify";
import { FastifyInstanceType } from "../types";
import { authMiddleware } from "../middlewares/auth";
import { sendMessageToAllWithSameKey } from "../socket";
import { FastifyPluginOptions } from "fastify/types/plugin";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export const registerBonusRoutes = (
  instance: FastifyInstanceType,
  _opt: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
) => {
  /** @ts-ignore */
  instance.addHook("preHandler", authMiddleware);

  instance.post(
    "/",
    async (
      req: FastifyRequest<{
        Body: { hunt_id: string; game_name: string; bet: number };
      }>,
      reply
    ) => {
      try {
        var hunt = await database.models.hunt.findById(req.body.hunt_id);
        if (!hunt)
          return reply.status(StatusCodes.NOT_FOUND).send({
            message: getReasonPhrase(StatusCodes.NOT_FOUND),
          });

        const bonuses = [
          ...hunt.bonuses,
          {
            game_name: req.body.game_name,
            bet: req.body.bet,
            index: hunt.bonuses.length,
            // payout: 500,
          },
        ];

        await database.models.hunt.findByIdAndUpdate(req.body.hunt_id, {
          bonuses: bonuses,
        });

        sendMessageToAllWithSameKey(req.user._id, "hunt", { ...hunt, bonuses });
        return bonuses;
      } catch (e) {
        console.error(e);
        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
          error: e,
        });
      }
    }
  );

  instance.post(
    "/redeem",
    async (
      req: FastifyRequest<{
        Body: { hunt_id: string; bonus_id: string; payout: number };
      }>,
      reply
    ) => {
      try {
        var hunt = await database.models.hunt.findById(req.body.hunt_id);
        if (!hunt)
          return reply.status(StatusCodes.NOT_FOUND).send({
            message: getReasonPhrase(StatusCodes.NOT_FOUND),
          });

        var bonuses = hunt.bonuses;
        const index = bonuses.findIndex(
          (v) => v._id?.toString() === req.body.bonus_id
        );

        if (index == -1) throw Error("Invalid bonus id");
        bonuses[index].payout = req.body.payout;

        await database.models.hunt.findByIdAndUpdate(req.body.hunt_id, {
          bonuses: bonuses,
        });

        sendMessageToAllWithSameKey(req.user._id, "hunt", { ...hunt, bonuses });
        return bonuses;
      } catch (e) {
        console.error(e);
        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
          error: e,
        });
      }
    }
  );

  instance.delete(
    "/:hunt_id/:bonus_id",
    async (
      req: FastifyRequest<{ Params: { hunt_id: string; bonus_id: string } }>,
      reply
    ) => {
      try {
        var hunt = await database.models.hunt.findById(req.params.hunt_id);
        if (!hunt)
          return reply.status(StatusCodes.NOT_FOUND).send({
            message: getReasonPhrase(StatusCodes.NOT_FOUND),
          });

        //tosi hieno
        const bonuses = hunt.bonuses.filter(
          (element) => element._id?.toString() !== req.params.bonus_id
        );

        await database.models.hunt.findByIdAndUpdate(req.params.hunt_id, {
          bonuses: bonuses,
        });

        sendMessageToAllWithSameKey(req.user._id, "hunt", {
          ...hunt,
          bonuses,
        });

        return bonuses;
      } catch (e) {
        console.error(e);
        reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
          error: e,
        });
      }
    }
  );

  done();
};
