import { User } from "@/lib/models/User"; 
import { verifyToken } from "@/lib/authHelper";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const auth = verifyToken(req);
  if (!auth.success) return NextResponse.json({ message: "Login required" }, { status: 401 });

  const { idToDelete } = await req.json(); // Jo user delete hona hai uski ID
  const loggedInUser = auth.user; // Jo delete kar raha hai

  // 🔥 SECURITY CHECK:
  // 1. Ya toh delete karne wala "Admin" ho
  // 2. Ya phir delete karne wala "Vahi User" ho jo apna account uda raha hai
  if (loggedInUser.role === "admin" || loggedInUser.id === idToDelete) {
    
    await User.findByIdAndDelete(idToDelete);
    return NextResponse.json({ success: true, message: "Deleted successfully" });

  } else {
    // Agar koi dusra user kisi aur ki ID delete karne ki koshish kare
    return NextResponse.json({ message: "Unauthorized action" }, { status: 403 });
  }
}
