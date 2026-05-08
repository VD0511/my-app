import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";

// 🟢 GET USER BY EMAIL
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    let email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({
        success: false,
        message: "Email missing",
      });
    }

    email = email.toLowerCase().trim();

    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}

// 🟢 CREATE USER (SIGNUP)
export async function POST(req) {
  try {
    await connectDB();

    const payload = await req.json();

    if (
      !payload.name ||
      !payload.age ||
      !payload.email ||
      !payload.password
    ) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      }, { status: 400 });
    }

    const email = payload.email.toLowerCase().trim();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "Email already exists",
      }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const newUser = new User({
      name: payload.name,
      age: payload.age,
      email,
      password: hashedPassword,
    });

    const result = await newUser.save();

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      result,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}