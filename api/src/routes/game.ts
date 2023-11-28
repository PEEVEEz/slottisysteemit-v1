import { FastifyRequest } from "fastify";
import { FastifyInstanceType } from "../types";
import { FastifyPluginOptions } from "fastify/types/plugin";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export const registerGameRoutes = (
  instance: FastifyInstanceType,
  _opt: FastifyPluginOptions,
  done: (err?: Error | undefined) => void
) => {
  instance.get(
    "/search",
    async (req: FastifyRequest<{ Querystring: { name: string } }>, reply) => {
      try {
        const url = `https://cms-prod.casinobud.com/api/proxy?operationName=searchGames&variables={"first":5,"skip":0,"name":"${req.query.name}"}&extensions={"persistedQuery":{"version":1,"sha256Hash":"ead60222ed62e2c6792f37ab03b1b14203f9a00a11d825791d31bc896a5750e8"}}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!data.data || !data.data.allGames || data.data.allGames <= 0) {
          return [req.query.name];
        }

        return (data.data.allGames as { name: string }[]).map((v) => v.name);
      } catch (error) {
        console.error(error);
        reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
          error: error,
        });
      }
    }
  );

  done();
};
