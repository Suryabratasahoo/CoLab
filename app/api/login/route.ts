import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import Profile from "@/models/Profile";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
        }

        const profile = await Profile.findOne({ user: user._id });
        const token = jwt.sign(
            { userId: user._id, email: user.email, name: profile.fullName },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        const response = NextResponse.json(
            { success: true },
            { status: 201 }
        );

        response.cookies.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}