import database from "./database";
import { Server as HttpServer } from "node:http";
import { Socket, Server as SocketServer } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

var sockets: {
  [key: string]: {
    [socketId: string]: Socket<
      DefaultEventsMap,
      DefaultEventsMap,
      DefaultEventsMap,
      any
    >;
  };
} = {};

export const sendMessageToAllWithSameKey = (key: string, message: any) => {
  if (!sockets[key]) return console.log("[SOCKET] No active sockets");
  const socketListenerIds = Object.keys(sockets[key]);

  for (let i = 0; i < socketListenerIds.length; i++) {
    const socketListenerId = socketListenerIds[i];
    const socket = sockets[key][socketListenerId];

    if (socket) {
      socket.send(message);
    }
  }
};

export const setupSocketServer = (server: HttpServer) => {
  const io = new SocketServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", async (socket) => {
    const query = socket.handshake.query;

    if (!query || !query.key) {
      socket.client._disconnect();
    }

    sockets[String(query?.key)] = sockets[String(query?.key)] || {};
    sockets[String(query?.key)][socket.id] = socket;

    const activeHunt = await database.models.hunt.findOne({
      user_id: query.key,
      active: true,
    });

    socket.emit("hunt", activeHunt || {});

    socket.on("disconnect", () => {
      delete sockets[String(query?.key)][socket.id];
    });
  });
};
