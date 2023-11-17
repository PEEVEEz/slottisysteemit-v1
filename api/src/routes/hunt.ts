import database from "../database";
import { FastifyRequest } from "fastify";
import { FastifyInstanceType } from "../types";
import { authMiddleware } from "../middlewares/auth";
import { sendMessageToAllWithSameKey } from "../socket";
import { FastifyPluginOptions } from "fastify/types/plugin";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { getFixedHuntData } from "../utils/hunt";

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

  instance.post(
    "/start",
    async (req: FastifyRequest<{ Body: { hunt_id: string } }>, reply) => {
      try {
        const result = await database.models.hunt.findByIdAndUpdate(
          req.body.hunt_id,
          { redeeming: true }
        );

        if (!result) {
          throw Error("Error while updating " + req.body.hunt_id);
        }

        return true;
      } catch (e) {
        console.error(e);
        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
          error: e,
        });
      }
    }
  );

  instance.get("/", async (req: FastifyRequest<{ Body: { _id: string } }>) => {
    var fixedHunts = [];
    var hunts = await database.models.hunt.find({ user_id: req.user._id });

    for (let i = 0; i < hunts.length; i++) {
      const element = hunts[i];

      fixedHunts[i] = getFixedHuntData({
        _id: element._id.toString(),
        name: element.name,
        start: element.start,
        bonuses: element.bonuses,
      });
    }

    return fixedHunts;
  });

  instance.put(
    "/",
    async (
      req: FastifyRequest<{
        Body: { hunt_id: string; bet: number; name: string };
      }>,
      reply
    ) => {
      try {
        const result = await database.models.hunt.findByIdAndUpdate(
          req.body.hunt_id,
          { bet: req.body.bet, name: req.body.name }
        );

        if (!result) {
          throw Error("Error while updating " + req.body.hunt_id);
        }

        return result;
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

      try {
        const newHunt = new database.models.hunt({
          user_id: req.user._id,
          name: req.body.name,
          start: req.body.start,
          active: true,
          bonuses: [],
        });

        newHunt.save();

        sendMessageToAllWithSameKey(req.user._id, "hunt", newHunt);

        return newHunt;
      } catch (e) {
        console.error(e);
        reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        });
      }
    }
  );

  done();
};
