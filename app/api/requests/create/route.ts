import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import connectDB from "@/lib/connectDB"
import JoinRequest from "@/models/JoinRequest"
import Post from "@/models/Post"
import Profile from "@/models/Profile"
import { getUserIdFromToken } from "@/lib/auth"


const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000" 

export async function POST(req: Request) {
  try {
    await connectDB()

    // 🔐 Auth
    const token = (await cookies()).get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const requesterId = getUserIdFromToken(token)

    // 📦 Parse body
    const { postId, message } = await req.json()

    if (!postId || !message) {
      return NextResponse.json(
        { message: "Post ID and message are required" },
        { status: 400 }
      )
    }

    // 🧠 Fetch post
    const post = await Post.findById(postId)
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    if (post.status !== "open") {
      return NextResponse.json(
        { message: "This post is no longer accepting requests" },
        { status: 400 }
      )
    }

    // 🚫 Prevent self-request
    if (post.ownerId.toString() === requesterId) {
      return NextResponse.json(
        { message: "You cannot request your own post" },
        { status: 400 }
      )
    }

    // 🚫 Prevent duplicate request
    const existing = await JoinRequest.findOne({
      postId,
      requesterId,
    })

    if (existing) {
      return NextResponse.json(
        { message: "Request already sent" },
        { status: 409 }
      )
    }

    // 👤 Fetch requester profile (for socket payload)
    const profile = await Profile.findOne({ user: requesterId })

    // ✅ Create JoinRequest
    const joinRequest = await JoinRequest.create({
      postId,
      teamId: post.teamId, // ✅ IMPORTANT
      requesterId,
      ownerId: post.ownerId,
      message,
      status: "pending",
    })

    console.log(joinRequest)

    // 🔔 Emit normalized payload to owner
    try {
      await fetch(`${SOCKET_SERVER_URL}/emit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "request:new",
          userId: post.ownerId.toString(),
          payload: {
            _id: joinRequest._id,
            status: "pending",
            message: joinRequest.message,
            createdAt: joinRequest.createdAt,
            post: {
              id: post._id,
              title: post.eventName,
              category: post.category,
            },
            requester: {
              id: requesterId,
              name: profile?.fullName || "Unknown",
              regNo: profile?.regNo || "",
              socials: {
                github: profile?.github,
                linkedin: profile?.linkedin,
              },
            },
          },
        }),
      })
    } catch {
      // socket failure should not break request creation
    }

    return NextResponse.json(
      {
        success: true,
        request: joinRequest,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Send join request error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
