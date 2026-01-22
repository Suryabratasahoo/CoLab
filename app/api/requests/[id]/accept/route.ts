import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import mongoose from "mongoose"
import connectDB from "@/lib/connectDB"
import JoinRequest from "@/models/JoinRequest"
import Team from "@/models/Team"
import { getUserIdFromToken } from "@/lib/auth"

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000"

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const session = await mongoose.startSession()

    try {
        await connectDB()

        // 🔐 1️⃣ Auth
        const token = (await cookies()).get("auth_token")?.value
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const ownerId = getUserIdFromToken(token)
        const { id: requestId } = await context.params

        session.startTransaction()

        // 📦 2️⃣ Fetch Join Request
        const joinRequest = await JoinRequest.findById(requestId).session(session)

        if (!joinRequest) {
            await session.abortTransaction()
            return NextResponse.json(
                { message: "Join request not found" },
                { status: 404 }
            )
        }

        // 🚫 3️⃣ Authorization check
        if (joinRequest.ownerId.toString() !== ownerId) {
            await session.abortTransaction()
            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            )
        }

        // 🚫 4️⃣ Only pending requests can be accepted
        if (joinRequest.status !== "pending") {
            await session.abortTransaction()
            return NextResponse.json(
                { message: "Request already processed" },
                { status: 400 }
            )
        }

        // 👥 5️⃣ Fetch Team
        const team = await Team.findById(joinRequest.teamId).session(session)

        if (!team) {
            await session.abortTransaction()
            return NextResponse.json(
                { message: "Team not found" },
                { status: 404 }
            )
        }

        // 🚫 6️⃣ Prevent duplicate team members
        const alreadyMember = team.members.some(
            (m: any) => m.userId.toString() === joinRequest.requesterId.toString()
        )

        if (alreadyMember) {
            await session.abortTransaction()
            return NextResponse.json(
                { message: "User already in team" },
                { status: 400 }
            )
        }

        // ➕ 7️⃣ Add member to team
        team.members.push({
            userId: joinRequest.requesterId,
            role: "member",
            joinedAt: new Date(),
        })
        console.log(team)

        await team.save({ session })

        // ✅ 8️⃣ Update Join Request
        joinRequest.status = "accepted"
        joinRequest.decidedAt = new Date()
        await joinRequest.save({ session })

        await session.commitTransaction()

        // 🔔 9️⃣ Notify requester (socket server)
        try {
            await fetch(`${SOCKET_SERVER_URL}/emit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    event: "request:status",
                    userId: joinRequest.requesterId.toString(),
                    payload: {
                        requestId: joinRequest._id,
                        status: "accepted",
                        teamId: team._id,
                        post: {
                            id: joinRequest.postId,
                        },
                    },
                }),
            })
        } catch {
            // socket failure should NOT break API
        }

        return NextResponse.json(
            {
                success: true,
                requestId: joinRequest._id,
                status: "accepted",
                teamId: team._id,
            },
            { status: 200 }
        )
    } catch (error) {
        await session.abortTransaction()
        console.error("Accept request error:", error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    } finally {
        session.endSession()
    }
}
