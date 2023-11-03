import { env } from "./env";
import fastify from "fastify";
import cors from "@fastify/cors";
import database from "./database";
import cookie from "@fastify/cookie";
import { setupSocketServer } from "./socket";

import { registerAuthRoutes } from "./routes/auth";
import { registerUserRoutes } from "./routes/user";
import { registerHuntRoutes } from "./routes/hunt";

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
server.register(registerHuntRoutes, { prefix: "hunt" });

setupSocketServer(server.server);

database.connect();
server.listen({ port: Number(env.PORT), host: env.HOST }, (err, addr) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`[API] Listening at ${addr}`);
});
