import { FastifyRequest } from "fastify";
import { FastifyInstanceType } from "../types";
import { authMiddleware } from "../middlewares/auth";
import { FastifyPluginOptions } from "fastify/types/plugin";

export const registerGameRoutes = (
  instance: FastifyInstanceType,
  _opt: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
) => {
  /** @ts-ignore */
  instance.addHook("preHandler", authMiddleware);

  instance.get(
    "/search",
    async (req: FastifyRequest<{ Querystring: { name: string } }>, reply) => {
      try {
        const url = `https://cms-prod.casinobud.com/api/proxy?operationName=searchGames&variables={"first":10,"skip":0,"name":"${req.query.name}"}&extensions={"persistedQuery":{"version":1,"sha256Hash":"ead60222ed62e2c6792f37ab03b1b14203f9a00a11d825791d31bc896a5750e8"}}`;

        const response = await fetch(url);
        const data = await response.json();

        return (data.data.allGames as { name: string }[]).map((v) => v.name);
      } catch (error) {
        reply.code(500).send({ error: "Internal Server Error" });
        return [req.query.name];
      }
    }
  );

  done();
};
