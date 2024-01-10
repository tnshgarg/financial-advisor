import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

// import { checkSubscription } from "@/lib/subscription";
// import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

export async function GET(req: Request) {
  // console.log("<REQUEST>: ", req);
  // const code = req?.query.code as string;
  // const { tokens } = await oauth2Client.getToken(code);
  // oauth2Client.setCredentials(tokens);
}
