import { oauth2Client } from "@/lib/oauth";
import axios from "axios";
import { NextResponse } from "next/server";
import { getCredentials } from "../(helpers)/getCredentials";

export async function POST(req: any) {
  try {
    const credentialsOrResponse = await getCredentials();
    if ("access_token" in credentialsOrResponse) {
      oauth2Client.setCredentials({
        refresh_token: credentialsOrResponse?.refresh_token,
      });
      const { token: accessToken } = await oauth2Client.getAccessToken();
      const { videoFile, title, description } = req.body;

      const metadata = {
        snippet: {
          title: title || "Default Title",
          description: description || "Default Description",
        },
        status: {
          privacyStatus: "private",
        },
      };

      const videoUploadUrl = `https://www.googleapis.com/upload/youtube/v3/videos?part=snippet%2Cstatus?key=${process.env.GOOGLE_API_KEY}`;

      console.log("videoUploadUrl: ", videoUploadUrl);

      const response = await axios.post(videoUploadUrl, videoFile, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "video/*",
        },
        data: metadata,
      });

      console.log("Upload Response: ", response);

      const videoId = response.data.id;
      return NextResponse.json({ success: true, videoId });
    }
  } catch (error: any) {
    console.error("Error handling video upload:", error.response);
    return NextResponse.json(error.response.data.error);
  }

  try {
    const { videoFile, title, description, accessToken } = req.body;

    const metadata = {
      snippet: {
        title: title || "Default Title",
        description: description || "Default Description",
      },
      status: {
        privacyStatus: "private", // You can adjust privacy status as needed
      },
    };

    const videoUploadUrl = "https://youtube.googleapis.com/youtube/v3/videos";
    const apiKey = process.env.GOOGLE_API_KEY; // Replace with your actual API key

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("snippet", JSON.stringify(metadata.snippet));
    formData.append("status", JSON.stringify(metadata.status));

    // const response = await axios.post(videoUploadUrl, formData, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //     "Content-Type": "multipart/form-data",
    //   },
    //   params: {
    //     part: "snippet,status",
    //     key: apiKey,
    //   },
    // });

    // const videoId = response.data.id;
    // return NextResponse.json({ success: true, videoId });
  } catch (error) {
    console.error("Error handling video upload:", error);
    return NextResponse.json("Internal Server Error");
  }
}
