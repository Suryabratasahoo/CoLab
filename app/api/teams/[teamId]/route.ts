import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import mongoose from "mongoose"
import connectDB from "@/lib/connectDB"
import Team from "@/models/Team"
import JoinRequest from "@/models/JoinRequest"
import { getUserIdFromToken } from "@/lib/auth"

export async function GET(
  req: Request,
  context: { params: Promise<{ teamId: string }> }
) {
  try {
    await connectDB()

    // 🔐 Auth
    const token = (await cookies()).get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userId = getUserIdFromToken(token)

    // ✅ THIS LINE FIXES YOUR ERROR
    const { teamId } = await context.params

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return NextResponse.json(
        { message: "Invalid team id" },
        { status: 400 }
      )
    }

    const teamObjectId = new mongoose.Types.ObjectId(teamId)
    const userObjectId = new mongoose.Types.ObjectId(userId)

    const teams = await Team.aggregate([
      { $match: { _id: teamObjectId } },

      // 🔐 Only members can access
      { $match: { "members.userId": userObjectId } },

      {
        $lookup: {
          from: "posts",
          localField: "postId",
          foreignField: "_id",
          as: "post",
        },
      },
      { $unwind: "$post" },

      { $unwind: "$members" },

      {
        $lookup: {
          from: "users",
          localField: "members.userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      {
        $lookup: {
          from: "profiles",
          localField: "members.userId",
          foreignField: "user",
          as: "profile",
        },
      },
      { $unwind: "$profile" },

      {
        $group: {
          _id: "$_id",
          status: { $first: "$status" },
          ownerId: { $first: "$owner" },
          createdAt: { $first: "$createdAt" },

          post: {
            $first: {
              id: "$post._id",
              title: "$post.eventName",
              category: "$post.category",
              description: "$post.description",
            },
          },

          members: {
            $push: {
              id: "$user._id",
              name: "$profile.fullName",
              email: "$user.email",
              role: "$members.role",
              joinedAt: "$members.joinedAt",
              skills: "$profile.skills",
              linkedin: "$profile.linkedin",
              github: "$profile.github",
            },
          },
        },
      },
    ])

    if (!teams.length) {
      return NextResponse.json(
        { message: "Team not found or access denied" },
        { status: 404 }
      )
    }

    return NextResponse.json({ team: teams[0] }, { status: 200 })
  } catch (error) {
    console.error("Fetch team error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}


export async function DELETE(
  req: Request,
  context: { params: Promise<{ teamId: string }> }
) {
  try {
    await connectDB()

    // 🔐 Auth
    const token = (await cookies()).get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userId = getUserIdFromToken(token)
    const { teamId } = await context.params

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return NextResponse.json(
        { message: "Invalid team id" },
        { status: 400 }
      )
    }

    const team = await Team.findById(teamId)

    if (!team) {
      return NextResponse.json(
        { message: "Team not found" },
        { status: 404 }
      )
    }

    // 🚫 Only owner can delete team
    if (team.owner.toString() !== userId) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      )
    }
    // 🧹 Delete related join requests
    await JoinRequest.deleteMany({ teamId: team._id })
    // ❌ Delete team
    await Team.findByIdAndDelete(teamId)
    return NextResponse.json(
      { success: true, teamId },
      { status: 200 }
    )
  } catch (error) {
    console.error("Dispose team error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}


export async function PUT(
  req: Request,
  context: { params: Promise<{ teamId: string }> }
) {
  try {
    await connectDB()

    // 🔐 Auth
    const token = (await cookies()).get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userId = getUserIdFromToken(token)
    const { teamId } = await context.params

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return NextResponse.json(
        { message: "Invalid team id" },
        { status: 400 }
      )
    }

    const team = await Team.findById(teamId)

    if (!team) {
      return NextResponse.json(
        { message: "Team not found" },
        { status: 404 }
      )
    }

    // 🚫 Only owner can delete team
    if (team.owner.toString() !== userId) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      )
    }
    team.status="completed"
    await team.save()
    return NextResponse.json(
      { success: true, teamId },
      { status: 200 }
    )
  } catch (error) {
    console.error("Dispose team error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}