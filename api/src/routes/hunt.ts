import database from "../database";
import { FastifyRequest } from "fastify";
import { FastifyInstanceType } from "../types";
import { getFixedHuntData } from "../utils/hunt";
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
      try {
        const result = await database.models.hunt.findByIdAndDelete(
          req.params.id
        );

        if (!result)
          return reply.status(StatusCodes.NOT_FOUND).send({
            message: getReasonPhrase(StatusCodes.NOT_FOUND),
          });

        return getReasonPhrase(StatusCodes.OK);
      } catch (error) {
        console.error(error);
        reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
          error: error,
        });
      }
    }
  );

  instance.get("/", async (req: FastifyRequest<{ Body: { _id: string } }>) => {
    var hunts = await database.models.hunt.find({ user_id: req.user._id });

    return hunts.map((v) =>
      getFixedHuntData({
        _id: v._id.toString(),
        name: v.name,
        start: v.start,
        bonuses: v.bonuses,
      })
    );
  });

  instance.put(
    "/",
    async (
      req: FastifyRequest<{
        Body: { hunt_id: string; start: number; name: string };
      }>,
      reply
    ) => {
      try {
        const result = await database.models.hunt.findByIdAndUpdate(
          req.body.hunt_id,
          { start: req.body.start, name: req.body.name }
        );

        if (!result) {
          return reply.status(StatusCodes.NOT_FOUND).send({
            message: getReasonPhrase(StatusCodes.NOT_FOUND),
          });
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
