import { io, Socket } from "socket.io-client"

let socket: Socket | null = null

export const connectSocket = (userId: string) => {
  if (!socket) {
    const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL

    if (!SOCKET_URL) {
      throw new Error("NEXT_PUBLIC_SOCKET_URL is not defined")
    }

    socket = io(SOCKET_URL, {
      auth: { userId },
      withCredentials: true,
      transports: ["websocket"], // more stable
    })

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket?.id)
    })

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason)
    })

    socket.on("connect_error", (err) => {
      console.error("⚠️ Socket connection error:", err.message)
    })
  }

  return socket
}

export const getSocket = () => socket

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
