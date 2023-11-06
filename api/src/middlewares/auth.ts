import { env } from "../env";
import database from "../database";
import { verify } from "jsonwebtoken";
import discord from "../utils/discord";
import { StatusCodes } from "http-status-codes";
import type { FastifyReply, FastifyRequest } from "fastify";

export const authMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Invalid authentication token");
    }

    const { sub } = verify(token, env.JWT_SECRET);
    const user = await database.models.user.findOne({ discordId: sub });

    if (!user) {
      throw new Error("Invalid user");
    }

    const discordUser = await discord.getUserData(user?.accessToken);

    if (!discordUser) {
      throw new Error("Invalid discord user");
    }

    req.user = discordUser;
    req.user._id = user._id;
  } catch (e: any) {
    reply.status(StatusCodes.UNAUTHORIZED).send({
      message: e.message,
    });
  }
};
