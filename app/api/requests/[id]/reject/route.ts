import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import connectDB from "@/lib/connectDB"
import JoinRequest from "@/models/JoinRequest"
import { getUserIdFromToken } from "@/lib/auth"

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000"

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {   
        await connectDB()
        console.log("Connected to DB for rejecting request")

        const token = (await cookies()).get("auth_token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const ownerId = getUserIdFromToken(token)
        const { id: requestId } = await context.params

        console.log("Rejecting request:", requestId, "by owner:", ownerId)

        const request = await JoinRequest.findById(requestId)
        if (!request) {
            return NextResponse.json({ message: "Request not found" }, { status: 404 })
        }

        // 🔐 Only owner can reject
        if (request.ownerId.toString() !== ownerId) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 })
        }

        request.status = "rejected"
        await request.save()

        // 🔔 Notify requester in real time
        await fetch(`${SOCKET_SERVER_URL}/emit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                event: "request:rejected",
                userId: request.requesterId.toString(),
                payload: {
                    requestId: request._id,
                    status: "rejected",
                },
            }),
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error("Reject request error:", err)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}
