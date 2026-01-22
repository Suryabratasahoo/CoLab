import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import mongoose from "mongoose"
import connectDB from "@/lib/connectDB"
import Team from "@/models/Team"
import { getUserIdFromToken } from "@/lib/auth"

export async function DELETE(
  req: Request,
  context: {
    params: Promise<{
      teamId: string
      memberId: string
    }>
  }
) {
  try {
    await connectDB()

    // 🔐 Auth
    const token = (await cookies()).get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const ownerId = getUserIdFromToken(token)
    const { teamId, memberId } = await context.params

    if (
      !mongoose.Types.ObjectId.isValid(teamId) ||
      !mongoose.Types.ObjectId.isValid(memberId)
    ) {
      return NextResponse.json({ message: "Invalid IDs" }, { status: 400 })
    }

    const team = await Team.findById(teamId)
    if (!team) {
      return NextResponse.json({ message: "Team not found" }, { status: 404 })
    }

    // 🚫 Only owner can remove members
    if (team.owner.toString() !== ownerId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // 🚫 Prevent removing owner
    if (memberId === ownerId) {
      return NextResponse.json(
        { message: "Owner cannot be removed" },
        { status: 400 }
      )
    }

    // ❌ Remove member
    team.members = team.members.filter(
      (m: any) => m.userId.toString() !== memberId
    )
    console.log("Updated members:", team.members)
    await team.save()
    return NextResponse.json(
      { success: true, memberId },
      { status: 200 }
    )
  } catch (error) {
    console.error("Remove member error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}


export async function PUT(
  req: Request,
  context: {
    params: Promise<{
      memberId: string
      teamId: string
    }>
  }
) {
  try {
    await connectDB()

    // 🔐 Auth
    const token = (await cookies()).get("auth_token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }


    const {memberId,teamId } = await context.params

    if (
      !mongoose.Types.ObjectId.isValid(memberId)||
      !mongoose.Types.ObjectId.isValid(teamId)
    ) {
      return NextResponse.json({ message: "Invalid IDs" }, { status: 400 })
    }

    const team = await Team.findById(teamId)
    if (!team) {
      return NextResponse.json({ message: "Team not found" }, { status: 404 })
    }



    // ❌ Remove member
    team.members = team.members.filter(
      (m: any) => m.userId.toString() !== memberId
    )
    console.log("Updated members:", team.members)
    await team.save()
    return NextResponse.json(
      { success: true, memberId },
      { status: 200 }
    )
  } catch (error) {
    console.error("Remove member error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
