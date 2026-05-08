import connectDB from "@/lib/db";
import bcrypt from "bcryptjs";
import { User } from "@/lib/models/User";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/authHelper";

// 🟢 GET USER BY ID
export async function GET(req, { params }) {
  try {
    await connectDB();

    const auth = verifyToken(req);
    if (!auth.success) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(params.id).select("-password");

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

// 🔵 UPDATE USER
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const auth = verifyToken(req);
    if (!auth.success) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const body = await req.json();

    const updateData = {
      name: body.name,
      age: body.age,
      email: body.email ? body.email.toLowerCase().trim() : "",

      address: body.address,
      contact: body.contact,
      education: body.education,
      hobby: body.hobby,
      interest: body.interest,
      profilePic: body.profilePic,
    };

    if (body.password && body.password.trim() !== "") {
      updateData.password = await bcrypt.hash(body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    ).select("-password");

    return NextResponse.json({
      success: true,
      message: "Profile Updated Successfully",
      user: updatedUser,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}

// 🔴 DELETE USER
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const auth = verifyToken(req);
    if (!auth.success) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const deletedUser = await User.findByIdAndDelete(params.id);

    if (!deletedUser) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}