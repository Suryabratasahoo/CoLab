import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
import "dotenv/config"

const app = express()

/* ================= BASIC MIDDLEWARE ================= */
app.use(express.json())

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
)

/* ================= HTTP SERVER ================= */
const httpServer = createServer(app)

/* ================= SOCKET.IO ================= */
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
})

io.on("connection", (socket) => {
  const userId = socket.handshake.auth?.userId

  if (!userId) {
    console.log("❌ Socket rejected: missing userId")
    socket.disconnect()
    return
  }

  socket.join(`user:${userId}`)
  console.log("👤 User connected:", userId)

  socket.on("disconnect", () => {
    console.log("🔌 User disconnected:", userId)
  })
})

/* ================= HTTP → SOCKET BRIDGE ================= */

interface EmitRequest {
  event: string
  userId: string
  payload: unknown
}

interface EmitResponse {
  success?: boolean
  message?: string
}

app.post(
  "/emit",
  (req: express.Request<unknown, EmitResponse, EmitRequest>, res) => {
    const { event, userId, payload } = req.body

    if (!event || !userId) {
      return res.status(400).json({ message: "Invalid emit payload" })
    }

    io.to(`user:${userId}`).emit(event, payload)

    return res.json({ success: true })
  }
)

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 4000

httpServer.listen(PORT, () => {
  console.log(`🚀 Socket server running on port ${PORT}`)
})
