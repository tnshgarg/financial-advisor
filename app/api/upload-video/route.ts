// import { NextResponse } from "next/server";
// import axios from "axios";
// import prismadb from "@/lib/prismadb";
// import { auth } from "@clerk/nextjs";
// import fs from "fs";
// import FormData from "form-data";
// import { Blob } from "buffer";

// const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

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
//     const blob = new Blob([filePath], { type: "video/mp4" });
//     formData.append("video", blob);

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

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextResponse } from "next/server";
import { Readable } from "stream";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function uploadVideoToYouTube(
  videoFile: any,
  accessToken: string,
  apiKey: string
) {
  try {
    console.log("<uploadVideoToYoutube>: ", videoFile, accessToken, apiKey);
    const videoFileStream = new Readable();
    videoFileStream.push(videoFile.buffer); // Assuming videoFile.buffer contains the file content
    videoFileStream.push(null); // End the stream

    const videoMetadata = {
      snippet: {
        title: "Your Video Title",
        description: "Your Video Description",
        tags: ["tag1", "tag2"],
      },
      status: {
        privacyStatus: "private", // or 'public'
      },
    };

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    console.log("<uploadVideoToYoutube headers>: ", headers);

    const params = {
      key: apiKey,
      part: "snippet,status",
      requestBody: videoMetadata,
      media: {
        mimeType: "video/*",
        body: videoFile,
      },
    };

    console.log("<uploadVideoToYoutube params>: ", params);

    const response = await axios.post(
      "https://youtube.googleapis.com/youtube/v3/videos",
      params,
      { headers }
    );

    console.log("Video uploaded:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error uploading video:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { videoFile } = body;
    const { userId } = auth();

    if (!videoFile) {
      return new NextResponse("Video file is undefined", { status: 400 });
    }

    // const fileDetails = {
    //   name: videoFile.name,
    //   mimetype: videoFile.type,
    //   stream: fs.createReadStream(videoFile.path),
    // };

    // const driveResponse = await createFileInDrive(fileDetails);

    // console.log("File created in Google Drive:", driveResponse);
    let authenticationData;
    if (userId != null) {
      authenticationData = await prismadb.authentication.findFirst({
        where: {
          id: userId,
        },
      });
    } else {
      return new NextResponse("User Not Found!", { status: 401 });
    }

    if (authenticationData && GOOGLE_API_KEY) {
      const parsedAuthenticationData = JSON.stringify(authenticationData);
      const { credentials } = JSON.parse(parsedAuthenticationData);

      uploadVideoToYouTube(
        videoFile.path,
        credentials.access_token,
        GOOGLE_API_KEY
      )
        .then(() => {
          console.log("Video uploaded successfully");
          return new NextResponse("Video Uploaded Successfully", {
            status: 200,
          });
        })
        .catch((error) => {
          console.error("Failed to upload video:", error);
          return new NextResponse("Video Upload failed!", {
            status: 500,
          });
        });
    } else {
      return new NextResponse("Authentication Data Not Found!", {
        status: 404,
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import axios from "axios";
// import prismadb from "@/lib/prismadb";
// import { auth } from "@clerk/nextjs";
// import fs from "fs";
// import FormData from "form-data";
// import { Blob } from "buffer";
// import youtube from "youtube-api"

// const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// export async function uploadVideoToYouTube(
//   filePath: File,
//   accessToken: string,
//   apiKey: string
// ) {
//   try {
//     console.log("File Path: ", filePath);
//     const oAuth = youtube.authenticate({
//       type: "oauth",
//       client_id: process.env.GOOGLE_CLIENT_ID,
//       client_secret: process.env.GOOGLE_CLIENT_SECRET,
//       redirect_uri: process.env.GOOGLE_REDIRECT_URI
//     })

//     youtube.video.insert({
//       resource: {
//         snippet: {title: "Demo", description: "Description"},
//       status: {privacyStatus: "private"}
//       },
//       part: 'snippet,status',
//       media: {
//         body: fs.createReadStream(fileName)
//       }
//     }, (err: any, data: any) => {
//       console.log("Video Uploaded")
//     })

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
//     const blob = new Blob([filePath], { type: "video/mp4" });
//     formData.append("video", blob);

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
