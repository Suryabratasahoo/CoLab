import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import connectDB from "@/lib/connectDB"
import JoinRequest from "@/models/JoinRequest"
import { getUserIdFromToken } from "@/lib/auth"
import mongoose from "mongoose"



export async function GET(req: Request) {
    try {
        await connectDB()

        // 🔐 Auth
        const token = (await cookies()).get("auth_token")?.value;
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        const userId = getUserIdFromToken(token)
        const userIdObj = new mongoose.Types.ObjectId(userId)

        const { searchParams } = new URL(req.url)
        const type = searchParams.get("type") // incoming | sent

        let requests

        if (type === "incoming") {
            requests = await JoinRequest.aggregate([
                {
                    $match: {
                        ownerId: userIdObj,
                        status: "pending",
                    },
                },

                // Join User
                {
                    $lookup: {
                        from: "users",
                        localField: "requesterId",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                { $unwind: "$user" },

                // Join Profile
                {
                    $lookup: {
                        from: "profiles",
                        localField: "requesterId",
                        foreignField: "user",
                        as: "profile",
                    },
                },
                { $unwind: "$profile" },

                // Join Post
                {
                    $lookup: {
                        from: "posts",
                        localField: "postId",
                        foreignField: "_id",
                        as: "post",
                    },
                },
                { $unwind: "$post" },

                // 5️⃣ Sort newest first
                { $sort: { createdAt: -1 } },

                // Shape final response
                {
                    $project: {
                        _id: 1,
                        status: 1,
                        message: 1,
                        createdAt: 1,
                        post: {
                            id: "$post._id",
                            title: "$post.eventName",
                            category: "$post.category",
                        },
                        requester: {
                            id: "$user._id",
                            name: "$profile.fullName",
                            regNo: "$profile.regNo",
                            socials: {
                                github: "$profile.github",
                                linkedin: "$profile.linkedin"
                            },
                        },
                    },
                },
            ])
        } else if (type === "sent") {

            requests = await JoinRequest.aggregate([
                // 1️⃣ Sent by me
                { $match: { requesterId: userIdObj } },

                // 2️⃣ Join Post
                {
                    $lookup: {
                        from: "posts",
                        localField: "postId",
                        foreignField: "_id",
                        as: "post",
                    },
                },
                {
                    $unwind: {
                        path: "$post",
                        preserveNullAndEmptyArrays: true,
                    },
                }, 

        // 3️⃣ Sort latest first
        { $sort: { createdAt: -1 } },

        // 4️⃣ Shape response
        {
            $project: {
                _id: 1,
                    status: 1,
                        createdAt: 1,
                            post: {
                    id: "$post._id",
                        title: "$post.eventName",
                            category: "$post.category",
                        },
            },
        },
            ])
    } else {
        return NextResponse.json(
            { message: "Invalid request type" },
            { status: 400 }
        )
    }

    return NextResponse.json({ requests }, { status: 200 })
} catch (error) {
    console.error("Fetch requests error:", error)
    return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
    )
}
}
