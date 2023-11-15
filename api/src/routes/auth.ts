import { env } from "../env";
import database from "../database";
import { sign } from "jsonwebtoken";
import discord from "../utils/discord";
import { FastifyRequest } from "fastify";
import { FastifyInstanceType } from "../types";
import { FastifyPluginOptions } from "fastify/types/plugin";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export const registerAuthRoutes = (
  instance: FastifyInstanceType,
  _opt: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
) => {
  instance.get("/logout", (_, reply) => {
    reply.clearCookie("token");
    return getReasonPhrase(StatusCodes.OK);
  });

  instance.get("/login", (_, reply) => {
    reply.redirect(
      `https://discord.com/api/oauth2/authorize?client_id=${env.CLIENT_ID}&redirect_uri=${env.REDIRECT_URI}&response_type=code&scope=identify%20email`
    );
  });

  instance.get(
    "/callback",
    async (req: FastifyRequest<{ Querystring: { code: string } }>, reply) => {
      const code = req.query.code;
      if (!code)
        return reply.status(StatusCodes.UNAUTHORIZED).send({
          message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
        });

      try {
        const access_token = await discord.getAccessToken(code.toString());
        const user = await discord.getUserData(access_token);

        const userExists = await database.models.user.findOneAndUpdate(
          {
            discordId: user.id,
          },
          {
            accessToken: access_token,
          }
        );

        if (!userExists) {
          const newUser = new database.models.user({
            discordId: user.id,
            accessToken: access_token,
          });

          newUser.save();
        }

        const token = sign({ sub: user.id }, env.JWT_SECRET, {
          expiresIn: "7d",
        });

        reply.setCookie("token", token, { path: "/", secure: false });
        reply.redirect(env.DASHBOARD_URL);
      } catch (e) {
        console.log("Auth callback error", e);

        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
          error: e,
        });
      }
    }
  );

  done();
};
