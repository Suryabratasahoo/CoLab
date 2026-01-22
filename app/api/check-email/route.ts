import { NextResponse } from "next/server"
import connectDB from "@/lib/connectDB"
import User from "@/models/User"

export async function GET(req: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")
    console.log(email)

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    const user = await User.findOne({ email }).select("_id")

    console.log("User found:", user)

    return NextResponse.json({
      exists: !!user,
    })
  } catch (error) {
    console.error("Check email error:", error)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}
