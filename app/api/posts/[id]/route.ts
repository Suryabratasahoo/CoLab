import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import mongoose from "mongoose"
import connectDB from "@/lib/connectDB"
import JoinRequest from "@/models/JoinRequest"
import Team from "@/models/Team"
import { getUserIdFromToken } from "@/lib/auth"
import Post from "@/models/Post"


export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const token = (await cookies()).get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userId = getUserIdFromToken(token)
    const { id: postId } = await context.params

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return NextResponse.json({ message: "Invalid post id" }, { status: 400 })
    }

    const post = await Post.findById(postId)

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    if (post.ownerId.toString() !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // 🧹 Remove pending join requests
    await JoinRequest.deleteMany({
      teamId: post._id,
      status: "pending",
    })

    // 🔕 Soft delete
    post.isActive = false
    await post.save()

    return NextResponse.json(
      { success: true, postId },
      { status: 200 }
    )
  } catch (error) {
    console.error("Delete post error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
