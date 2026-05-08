import connectDB from "@/lib/db";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    // 🔴 hardcoded admin (simple version)
    if (email === "admin@gmail.com" && password === "admin123") {
      return Response.json({
        success: true,
        message: "Admin login successful",
      });
    }

    return Response.json({
      success: false,
      message: "Invalid admin credentials",
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}