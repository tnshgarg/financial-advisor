import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    const { userId, user } = auth();

    if (userId != null)
      await prismadb.authentication.create({
        data: {
          id: userId,
          userEmail: String(user?.emailAddresses?.[0]),
          driveOAuthClient: "default_value",
          youtubeOAuthClient: "default_value", // Provide a default value or adjust as needed
          linkedinOAuthClient: "default_value",
          twitterOAuthClient: "default_value",
          wordpressOAuthClient: "default_value",
        },
      });

    return new NextResponse("Successfully Stored Authentication Data", {
      status: 200,
    });
  } catch (error) {
    console.log("[STORE_AUTH_DATA_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
