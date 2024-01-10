import { NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: NextApiResponse) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Signup Unsuccessful!", { status: 500 });
    }

    console.log("USERID: ", userId);

    if (userId) {
      await prismadb.authentication.create({
        data: {
          youtubeOAuthClient: "",
          id: userId,
          createdAt: new Date(),
          linkedinOAuthClient: "",
          twitterOAuthClient: "",
        },
      });
      console.log("Data Stored");

      return new NextResponse("Signed Up Successfully", {
        status: 200,
      });
    } else {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
  } catch (error) {
    return new NextResponse("Sign Up Failure", {
      status: 500,
    });
  }
};
