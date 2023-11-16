import type { Socket } from "socket.io";
import type { RawServerDefault } from "fastify/types/utils";
import type { FastifyInstance } from "fastify/types/instance";
import type { FastifyBaseLogger } from "fastify/types/logger";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { DefaultEventsMap } from "socket.io/dist/typed-events";
import type { FastifyTypeProvider } from "fastify/types/type-provider";

export type FastifyInstanceType = FastifyInstance<
  RawServerDefault,
  IncomingMessage,
  ServerResponse<IncomingMessage>,
  FastifyBaseLogger,
  FastifyTypeProvider
>;

export type SocketConnections = {
  [key: string]: {
    [socketId: string]: Socket<
      DefaultEventsMap,
      DefaultEventsMap,
      DefaultEventsMap,
      any
    >;
  };
};

export type Hunt = {
  start: number;
  bonuses: any[];

  reqavg?: number | string;
  winnings?: number | string;
};
