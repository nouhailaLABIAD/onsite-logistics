// src/tracking/tracking.gateway.ts

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { CreateMissionLocationDto } from "./dto/create-mission-location.dto";

@WebSocketGateway({
  namespace: "tracking",
  cors: { origin: "*" },
})
export class TrackingGateway {
  @WebSocketServer()
  server!: Server;

  @SubscribeMessage("updateLocation")
  handleLocation(@MessageBody() data: CreateMissionLocationDto) {
    console.log("📍 location reçue:", data);

    // 🔥 broadcast à tous les receivers
    this.server.emit("locationUpdated", data);

    return { status: "ok" };
  }
}