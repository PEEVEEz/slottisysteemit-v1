import { env } from "../env";
import database from "../database";
import { sign } from "jsonwebtoken";
import discord from "../utils/discord";
import { FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { RawServerDefault } from "fastify/types/utils";
import { FastifyInstance } from "fastify/types/instance";
import { FastifyBaseLogger } from "fastify/types/logger";
import { FastifyPluginOptions } from "fastify/types/plugin";
import { IncomingMessage, ServerResponse } from "node:http";
import { FastifyTypeProvider } from "fastify/types/type-provider";

export const registerAuthRoutes = (
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
  instance.get("/logout", (req, reply) => {
    reply.clearCookie("token");
    return "OK";
  });

  instance.get("/login", (req, reply) => {
    reply.redirect(
      `https://discord.com/api/oauth2/authorize?client_id=${env.CLIENT_ID}&redirect_uri=${env.REDIRECT_URI}&response_type=code&scope=identify%20email`
    );
  });

  instance.get(
    "/callback",
    async (req: FastifyRequest<{ Querystring: { code: string } }>, reply) => {
      const code = req.query.code;
      if (!code)
        return reply
          .status(StatusCodes.UNAUTHORIZED)
          .send("Query code not found");

      const access_token = await discord.getAccessToken(code.toString());
      const user = await discord.getUserData(access_token);

      const userExists = await database.models.user.findOne({
        discordId: user.id,
      });

      if (!userExists) {
        const newUser = new database.models.user({
          discordId: user.id,
          accessToken: access_token,
        });

        newUser.save();
      } else {
        userExists.updateOne({ accessToken: access_token });
      }

      const token = sign({ sub: user.id }, env.JWT_SECRET, {
        expiresIn: "7d",
      });

      reply.setCookie("token", token, { path: "/", secure: false });
      reply.redirect("http://localhost:5173/dashboard");
    }
  );

  done();
};
