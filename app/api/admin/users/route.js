import connectDB from "@/lib/db";
import { User } from "@/lib/models/User";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/authHelper";

export async function GET(req) {
  try {
    await connectDB();

    // 🔐 TOKEN VERIFY
    const auth = verifyToken(req);

    if (!auth.success) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }

    // 👑 ROLE CHECK
    if (auth.user.role !== "admin") {
      return NextResponse.json({
        success: false,
        message: "Access denied",
      });
    }

    const users = await User.find().select("-password");

    return NextResponse.json({
      success: true,
      users,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}