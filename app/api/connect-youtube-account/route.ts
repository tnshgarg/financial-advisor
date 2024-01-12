import { NextResponse } from "next/server";
import { oauth2Client } from "@/lib/oauth";

export async function POST(req: Request) {
  try {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/youtubepartner"],
    });

    return new NextResponse(authUrl, { status: 200 });
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
