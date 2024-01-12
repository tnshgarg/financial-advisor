import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function getCredentials(): Promise<
  | {
      access_token: string;
      refresh_token: string;
      scope: string;
      token_type: string;
      expiry_date: number;
    }
  | NextResponse
> {
  try {
    const { userId } = auth();
    const authenticationData = userId
      ? await prismadb.authentication.findFirst({
          where: { id: userId },
        })
      : {};
    const parsedAuthenticationData = JSON.stringify(authenticationData);
    const { youtubeOAuthClient } = JSON.parse(parsedAuthenticationData);
    const { credentials } = JSON.parse(youtubeOAuthClient);
    return credentials;
  } catch (error) {
    console.log(error);
    return new NextResponse("Credentials Fetch Failed!", {
      status: 500,
    });
  }
}
