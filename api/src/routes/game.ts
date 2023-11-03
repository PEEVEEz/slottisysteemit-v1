import { authMiddleware } from "../middlewares/auth";
import { RawServerDefault } from "fastify/types/utils";
import { FastifyInstance } from "fastify/types/instance";
import { FastifyBaseLogger } from "fastify/types/logger";
import { FastifyPluginOptions } from "fastify/types/plugin";
import { IncomingMessage, ServerResponse } from "node:http";
import { FastifyTypeProvider } from "fastify/types/type-provider";
import { FastifyRequest } from "fastify";

export const registerGameRoutes = (
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

  instance.get(
    "/search",
    async (req: FastifyRequest<{ Querystring: { name: string } }>, reply) => {
      const url = `https://cms-prod.casinobud.com/api/proxy?operationName=searchGames&variables={"first":10,"skip":0,"name":"${req.query.name}"}&extensions={"persistedQuery":{"version":1,"sha256Hash":"ead60222ed62e2c6792f37ab03b1b14203f9a00a11d825791d31bc896a5750e8"}}`;

      const result = await fetch(url);
      const data = await result.json();

      return data;
    }
  );

  done();
};
