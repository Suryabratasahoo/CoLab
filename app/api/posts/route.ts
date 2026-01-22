import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import mongoose from "mongoose"
import connectDB from "@/lib/connectDB"
import Post from "@/models/Post"
import Team from "@/models/Team"
import { getUserIdFromToken } from "@/lib/auth"
import User from "@/models/User"
import Notification from "@/models/Notification"
import Profile from "@/models/Profile"

export async function POST(req: Request) {
  const session = await mongoose.startSession()

  try {
    await connectDB()

    // 🔐 Auth
    const token = (await cookies()).get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userId = getUserIdFromToken(token)

    const {
      category,
      eventName,
      description,
      rolesNeeded,
      skills,
      teamSize,
      commitmentLevel,
      eventDate,
    } = await req.json()

    if (
      !category ||
      !eventName ||
      !description ||
      !rolesNeeded ||
      !teamSize ||
      !commitmentLevel
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    session.startTransaction()

    // 📝 Create Post
    const [post] = await Post.create(
      [
        {
          ownerId: userId,
          category,
          eventName,
          description,
          rolesNeeded,
          skills,
          teamSize,
          commitmentLevel,
          eventDate: eventDate || null,
          status: "open",
        },
      ],
      { session }
    )

    // 👥 Create Team
    const [team] = await Team.create(
      [
        {
          postId: post._id,
          owner: userId,
          name: post.eventName,
          category: post.category,
          status: "active",
          members: [
            {
              userId,
              role: "owner",
              joinedAt: new Date(),
            },
          ],
        },
      ],
      { session }
    )

    // 🔗 Link team to post
    post.teamId = team._id
    await post.save({ session })

    // 👤 Fetch owner name (for notification message)
    console.log("Fetching user for notification:", userId)
    const ownerProfile = await Profile.findOne({ user: userId })
      .select("fullName")
      .lean()
      .session(session)

    const owner=ownerProfile?.fullName || "someone"

    // 🔔 Create Notification
    await Notification.create(
      [
        {
          type: "POST_CREATED",
          actor: userId,
          post: post._id,
          message: `${owner} has created a new post for "${post.eventName}". Kindly take a look and feel free to collaborate.`,
        },
      ],
      { session }
    )

    await session.commitTransaction()

    return NextResponse.json(
      {
        success: true,
        post,
        teamId: team._id,
      },
      { status: 201 }
    )
  } catch (error) {
    await session.abortTransaction()
    console.error("Create post error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  } finally {
    session.endSession()
  }
}


export async function GET(req: Request) {
  try {
    await connectDB()

    const token = (await cookies()).get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userId = getUserIdFromToken(token)


    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")

    const query: any = { status: "open" }
    if (category) query.category = category

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .lean()
    const postsWithOwnership = posts.map((post) => ({
      ...post,
      isOwner: post.ownerId?.toString() === userId,
    }))

    return NextResponse.json(
      { posts: postsWithOwnership },
      { status: 200 }
    )
  } catch (error) {
    console.error("Fetch posts error:", error)
    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    )
  }
}
