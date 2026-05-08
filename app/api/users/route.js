import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs"; 

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    let email = searchParams.get("email");

    if (!email) {
      return Response.json({
        success: false,
        message: "Email missing",
      });
    }

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return Response.json({
        success: false,
        message: "User not found",
      });
    }

    return Response.json({
      success: true,
      user,
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}

export async function POST(request) {
  try {
    await connectDB(); // 📌 DB CONNECT

    const payload = await request.json();

    // ❗ validation
    if (
      !payload.name ||
      !payload.age ||
      !payload.email ||
      !payload.password
    ) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    // ❗ duplicate email check
    const existingUser = await User.findOne({ email: payload.email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists", success: false },
        { status: 409 }
      );
    }

    // 🔐 PASSWORD HASH (IMPORTANT)
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    // 👤 CREATE USER
    const newUser = new User({
      name: payload.name,
      age: payload.age,
      email: payload.email.toLowerCase().trim(),
      password: hashedPassword,
    });

    const result = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      result,
    });

  } catch (error) {
    console.log("Error:", error);

    return NextResponse.json({
      message: "Internal server error",
      success: false,
    });
  }
}