import { Server as IOServer } from "socket.io"
import type { SocketServer } from "./SocketServer.ts"

export function initSocket(res: any) {
  if (!global.io) {
    console.log("🔌 Initializing Socket.IO server...")

    const io: SocketServer = new IOServer(res.socket.server, {
      path: "/api/socket",
      cors: {
        origin: "*", // tighten in production
        methods: ["GET", "POST"],
      },
    })

    io.on("connection", (socket) => {
      const { userId } = socket.handshake.auth

      if (!userId) {
        socket.disconnect()
        return
      }

      // 🔑 Join user-specific room
      socket.join(`user:${userId}`)
      console.log(`👤 User connected: ${userId}`)

      socket.on("disconnect", () => {
        console.log(`❌ User disconnected: ${userId}`)
      })
    })

    global.io = io
  }

  return global.io
}
