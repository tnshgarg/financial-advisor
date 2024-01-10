import { NextApiResponse, NextApiRequest } from "next";
import { oauth2Client } from "@/lib/oauth";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: NextApiResponse) => {
  try {
    const body = await req.json();
    const { code } = body;
    console.log("CODE: ", code);

    if (!code) {
      return new NextResponse("Code is Required!", { status: 500 });
    }

    const { userId } = auth();
    console.log("USERID: ", userId);

    if (userId) {
      const { tokens } = await oauth2Client.getToken(code);
      console.log("TOKENS: ", tokens);
      oauth2Client.setCredentials(tokens);
      console.log("setCredentials: ", tokens);
      console.log("UserId: ", userId);

      await prismadb.authentication.update({
        where: {
          id: userId,
        },
        data: {
          youtubeOAuthClient: JSON.stringify(oauth2Client),
        },
      });
      console.log("Data Stored");

      return new NextResponse("oauth2Callback Success", {
        status: 200,
      });
    } else {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
  } catch (error) {
    return new NextResponse("oauth2Callback Failure", {
      status: 500,
    });
  }
};
