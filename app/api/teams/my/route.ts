import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import mongoose from "mongoose"
import connectDB from "@/lib/connectDB"
import Team from "@/models/Team"
import { getUserIdFromToken } from "@/lib/auth"

export async function GET() {
  try {
    await connectDB()

    // 🔐 Auth
    const token = (await cookies()).get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userId = new mongoose.Types.ObjectId(
      getUserIdFromToken(token)
    )

    const teams = await Team.aggregate([
      // 1️⃣ Only teams where user is a member
      {
        $match: {
          "members.userId": userId,
        },
      },

      // 2️⃣ Join Post
      {
        $lookup: {
          from: "posts",
          localField: "postId",
          foreignField: "_id",
          as: "post",
        },
      },
      { $unwind: "$post" },

      // 3️⃣ Unwind members
      { $unwind: "$members" },

      // 4️⃣ Join User
      {
        $lookup: {
          from: "users",
          localField: "members.userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      // 5️⃣ Join Profile
      {
        $lookup: {
          from: "profiles",
          localField: "members.userId",
          foreignField: "user",
          as: "profile",
        },
      },
      { $unwind: "$profile" },

      // 6️⃣ Group back
      {
        $group: {
          _id: "$_id",
          post: {
            $first: {
              id: "$post._id",
              title: "$post.eventName",
              category: "$post.category",
            },
          },
          ownerId: { $first: "$owner" },
          status: { $first: "$status" },
          createdAt: { $first: "$createdAt" },
          members: {
            $push: {
              user: {
                id: "$user._id",
                name: "$profile.fullName",
                regNo: "$profile.regNo",
              },
              role: "$members.role",
              joinedAt: "$members.joinedAt",
            },
          },
        },
      },

      // 7️⃣ Sort newest first
      { $sort: { createdAt: -1 } },
    ])

    return NextResponse.json({ teams }, { status: 200 })
  } catch (error) {
    console.error("Fetch my teams error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
