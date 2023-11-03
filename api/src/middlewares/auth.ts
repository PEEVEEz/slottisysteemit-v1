import type {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";
import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";
import { env } from "../env";
import database from "../database";
import discord from "../utils/discord";

export const authMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  const token = req.cookies.token;
  if (!token)
    return reply.status(StatusCodes.UNAUTHORIZED).send({
      message: "Invalid authentication token",
    });

  const { sub } = verify(token, env.JWT_SECRET);

  const user = await database.models.user.findOne({ discordId: sub });

  if (!user)
    return reply
      .status(StatusCodes.FORBIDDEN)
      .send({ message: "Invalid user" });

  const discordUser = await discord.getUserData(user?.accessToken);

  if (!discordUser)
    return reply
      .status(StatusCodes.FORBIDDEN)
      .send({ message: "Invalid discord user" });

  req.user = discordUser;
  req.user._id = user._id;
  done();
};
