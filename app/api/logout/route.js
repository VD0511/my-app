import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({
        success : true,
        message : "Logged out successfully"
    })

    response.cookies.set("token", "", {
        path: "/",
        expires: new Date(0),
    })

    return response
}