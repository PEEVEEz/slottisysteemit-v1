import database from "./database";
import { SocketConnections } from "./types";
import { Server as HttpServer } from "node:http";
import { Server as SocketServer } from "socket.io";

var sockets: SocketConnections = {};

export const sendMessageToAllWithSameKey = (
  key: string,
  event: string,
  message: any
) => {
  if (!sockets[key]) {
    console.log("[SOCKET] No active sockets");
    return;
  }

  const socketListenerIds = Object.keys(sockets[key]);

  for (let i = 0; i < socketListenerIds.length; i++) {
    const socketListenerId = socketListenerIds[i];
    const socket = sockets[key][socketListenerId];

    if (socket) {
      socket.emit(event, message);
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

    try {
      const hunt = await database.models.hunt
        .findOne({
          user_id: query.key,
        })
        .sort({ updatedAt: -1 });

      socket.emit("hunt", hunt || {});
    } catch (error) {
      console.error("Error fetching latest hunt:", error);
    }

    socket.on("disconnect", () => {
      delete sockets[String(query?.key)][socket.id];
    });
  });
};
