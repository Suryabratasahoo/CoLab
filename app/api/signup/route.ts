import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import Profile from "@/models/Profile";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password, profile } = body;

    // 1️⃣ Basic validation
    if (!email || !password || !profile) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2️⃣ Duplicate email check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4️⃣ Create user
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // 5️⃣ Create profile
    await Profile.create({
      user: user._id,
      ...profile,
    });

    // 6️⃣ Auto-login (JWT)
    const token = jwt.sign(
      { userId: user._id, email: user.email,name:profile.fullName},
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
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
