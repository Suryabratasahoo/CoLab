// app/api/profile/route.ts
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/connectDB"
import Profile from "@/models/Profile"

const JWT_SECRET = process.env.JWT_SECRET as string

export async function GET(req: Request) {
  try {
    await connectDB()

    const token = req.headers
      .get("cookie")
      ?.split("; ")
      .find(c => c.startsWith("auth_token="))
      ?.split("=")[1]

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

    const profile = await Profile.findOne({ user: decoded.userId })

    return NextResponse.json({ profile })
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}


export async function PUT(req: Request) {
  try {
    await connectDB()

    const token = req.headers
      .get("cookie")
      ?.split("; ")
      .find(c => c.startsWith("auth_token="))
      ?.split("=")[1]

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    const body = await req.json()

    const updated = await Profile.findOneAndUpdate(
      { user: decoded.userId },
      body,
      { new: true }
    )

    return NextResponse.json({ success: true, profile: updated })
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}
