import jwt from 'jsonwebtoken';

export function verifyToken(req) {
  try {
    const token = req.cookies.get("token")?.value;

   console.log("TOKEN FROM API:", req.cookies.get("token")?.value);

    if (!token) {
      return { success: false, message: "No token" };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return { success: true, user: decoded };

  } catch (error) {
    console.log("JWT ERROR:", error.message); // 🔥 ADD THIS
    return { success: false, message: "Invalid token" };
  }
}