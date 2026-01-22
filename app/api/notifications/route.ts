import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import connectDB from "@/lib/connectDB"
import { getUserIdFromToken } from "@/lib/auth"
import Notification from "@/models/Notification"
import mongoose from "mongoose"

export async function GET() {
  try {
    await connectDB()

    // 🔐 Auth
    const token = (await cookies()).get("auth_token")?.value
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const userId = getUserIdFromToken(token)

    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .lean()

    return NextResponse.json(
      { notifications },
      { status: 200 }
    )
  } catch (error) {
    console.error("Fetch notifications error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
