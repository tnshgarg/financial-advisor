import axios from "axios";
import { NextResponse } from "next/server";
import { getCredentials } from "../(helpers)/getCredentials";
import { oauth2Client } from "@/lib/oauth";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

interface Credentials {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expiry_date: number;
}

async function getYoutubeAnalyticsData() {
  try {
    const credentialsOrResponse = await getCredentials();
    const { userId } = auth();
    const currentDate = new Date();
    const currentTimestamp = currentDate.getTime();

    if ("access_token" in credentialsOrResponse) {
      const credentials: Credentials = credentialsOrResponse;

      if (currentTimestamp < credentials.expiry_date) {
        console.log("Credentials: ", credentials);

        const response = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&key=${process.env.GOOGLE_API_KEY}`,
          {
            headers: {
              Authorization: `Bearer ${credentials.access_token}`,
              Accept: "application/json",
            },
          }
        );

        return response?.data;
      } else {
        oauth2Client.setCredentials({
          refresh_token: credentialsOrResponse.refresh_token,
        });
        const access_token = await oauth2Client.getAccessToken();

        if (userId)
          await prismadb.authentication.update({
            where: {
              id: userId,
            },
            data: {
              youtubeOAuthClient: JSON.stringify(oauth2Client),
            },
          });

        const response = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&key=${process.env.GOOGLE_API_KEY}`,
          {
            headers: {
              Authorization: `Bearer ${access_token.token}`,
              Accept: "application/json",
            },
          }
        );

        return response?.data;
      }
    } else {
      const { credentials } = await oauth2Client.refreshAccessToken();
      credentials.refresh_token;

      const response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&key=${process.env.GOOGLE_API_KEY}`,
        {
          headers: {
            Authorization: `Bearer ${credentials.access_token}`,
            Accept: "application/json",
          },
        }
      );

      return response?.data;
    }
  } catch (error) {
    return new NextResponse("Youtube Analytics Fetch Failed!", {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  const analyticsData = await getYoutubeAnalyticsData();
  console.log("Analytics Data: ", analyticsData);

  return NextResponse.json(analyticsData);
}
