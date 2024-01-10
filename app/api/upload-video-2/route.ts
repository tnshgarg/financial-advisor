import { NextResponse } from "next/server";
import axios from "axios";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import fs from "fs";
import FormData from "form-data";
import { Blob } from "buffer";
import multer from "multer";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const upload = multer({ dest: "uploads/" });

const uploadMiddleware = upload.single("videoFile");

export const POST = async (req: any, res: any) => {
  try {
    await uploadMiddleware(req, res);
    console.log("req: ", req);

    // Handle your file here
    // const file = req["file"];

    // Rest of your code...
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Some Error Occured", { status: 500 });
  }
};

// export async function uploadVideoToYouTube(
//   filePath: File,
//   accessToken: string,
//   apiKey: string
// ) {
//   try {
//     console.log("File Path: ", filePath);
//     const videoMetadata = {
//       snippet: {
//         title: "Your Video Title",
//         description: "Your Video Description",
//         tags: ["tag1", "tag2"],
//       },
//     };

//     const headers = {
//       Authorization: `Bearer ${accessToken}`,
//       Accept: "application/json",
//     };

//     const formData = new FormData();
//     formData.append("snippet", JSON.stringify(videoMetadata.snippet));
//     // if (typeof filePath !== "string") {
//     //   throw new Error("filePath is not a string.");
//     // }
//     // const blob = new Blob([filePath], { type: "video/mp4" });
//     // formData.append("video", blob);

//     const response = await axios.post(
//       `https://youtube.googleapis.com/youtube/v3/videos?key=${apiKey}`,
//       formData,
//       { headers: { ...headers, ...formData.getHeaders() } }
//     );

//     return response.data;
//   } catch (error: any) {
//     console.error(
//       "Error uploading video:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// }

// export async function POST(req: Request) {
//   try {
//     console.log("0th Stage");
//     const body = await req.json();

//     const { videoFile } = body;
//     const { userId } = auth();
//     console.log("-2: ", "User Id and Everything else present");

//     if (!videoFile) {
//       return new NextResponse("Video file is undefined", { status: 400 });
//     }
//     console.log("-2: ", "Video File Present");

//     let authenticationData;
//     if (userId != null) {
//       authenticationData = await prismadb.authentication.findFirst({
//         where: { id: userId },
//       });
//     } else {
//       return new NextResponse("User Not Found!", { status: 401 });
//     }
//     console.log("-1: ", authenticationData);

//     if (!authenticationData || !GOOGLE_API_KEY) {
//       return new NextResponse("Authentication Data Not Found!", {
//         status: 404,
//       });
//     }
//     console.log("0: ", authenticationData);
//     const strifiedData = JSON.stringify(authenticationData);
//     console.log("1: ", strifiedData);
//     const parsedAuthData = JSON.parse(strifiedData);
//     console.log("2: ", parsedAuthData);
//     const parsedYoutubeAuthData = JSON.parse(parsedAuthData.youtubeOAuthClient);
//     console.log("3: ", parsedYoutubeAuthData);
//     const accessToken = parsedYoutubeAuthData.credentials.access_token;
//     console.log("4: ", accessToken);
//     console.log("VideoFile:::: ", videoFile.path);

//     await uploadVideoToYouTube(videoFile, accessToken, GOOGLE_API_KEY);
//     return new NextResponse("Video Uploaded Successfully", { status: 200 });
//   } catch (error) {
//     console.log("[CONVERSATION_ERROR]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
