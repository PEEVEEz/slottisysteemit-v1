import { env } from "./env";
import fastify from "fastify";
import cors from "@fastify/cors";
import database from "./database";
import cookie from "@fastify/cookie";

import { registerAuthRoutes } from "./routes/auth";
import { registerUserRoutes } from "./routes/user";
import { registerBonusRoutes } from "./routes/bonus";
import { registerHuntRoutes } from "./routes/hunt";
import { setupSocketServer } from "./socket";

declare module "fastify" {
  interface FastifyRequest {
    user?: any;
  }
}

const server = fastify();

server.register(cors, {
  origin: true,
  credentials: true,
});
server.register(cookie, {});

server.register(registerAuthRoutes, { prefix: "auth" });
server.register(registerUserRoutes, { prefix: "user" });
server.register(registerBonusRoutes, { prefix: "bonus" });
server.register(registerHuntRoutes, { prefix: "hunt" });

setupSocketServer(server.server);

database.connect();
server.listen({ port: Number(env.PORT), host: "127.0.0.1" }, (err, addr) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`[API] Listening at ${addr}`);
});
