import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

import connectDB from "@/lib/connectDB"
import Profile from "@/models/Profile"

const JWT_SECRET = process.env.JWT_SECRET as string

export async function GET(req: Request) {
  try {
    await connectDB()

    const cookie = req.headers.get("cookie")
    const token = cookie
      ?.split("; ")
      .find((c) => c.startsWith("auth_token="))
      ?.split("=")[1]

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string
      email: string
    }

    const profile = await Profile.findOne({ user: decoded.userId })

    if (!profile) {
      return NextResponse.json({ user: null }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: decoded.userId,
        email: decoded.email,
        name: profile.fullName,
      },
    })
  } catch {
    return NextResponse.json({ user: null }, { status: 401 })
  }
}
