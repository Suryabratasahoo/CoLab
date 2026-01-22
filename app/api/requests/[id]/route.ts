import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import connectDB from "@/lib/connectDB"
import JoinRequest from "@/models/JoinRequest"
import { getUserIdFromToken } from "@/lib/auth"

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const token = (await cookies()).get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userId = getUserIdFromToken(token)
    const { id: requestId } = await context.params

    const request = await JoinRequest.findById(requestId)
    if (!request) {
      return NextResponse.json(
        { message: "Request not found" },
        { status: 404 }
      )
    }

    // 🔐 Only requester can cancel
    if (request.requesterId.toString() !== userId) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      )
    }

    // 🚫 Only pending can be cancelled
    // if (request.status !== "pending") {
    //   return NextResponse.json(
    //     { message: "Request cannot be cancelled" },
    //     { status: 400 }
    //   )
    // }

    await request.deleteOne()
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Cancel request error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
