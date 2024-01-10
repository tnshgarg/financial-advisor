import { NextResponse } from "next/server";
import { google } from "googleapis";
import { oauth2Client } from "@/lib/oauth";

export async function POST(req: Request) {
  try {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        // "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/youtube.upload",
      ],
    });

    return new NextResponse(authUrl, { status: 200 });
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// export const getData = async () => {
//   // allows you to use drive API methods e.g. listing files, creating files.
//   console.log("Auth2 Client: ", oauth2Client);
//   const drive = google.drive({ version: "v3", auth: oauth2Client });
//   try {
//     const res = await drive.files.list();
//     const files = res.data.files;

//     console.log(files);
//   } catch (error: any) {
//     console.error("Error fetching files:", error.message);
//     return null;
//   }
// };

export async function GET(req: any) {
  try {
    // if (data)
    //   return new NextResponse(data, {
    //     status: 200,
    //   });
    // else
    //   return new NextResponse("Unable to fetch google drive data", {
    //     status: 500,
    //   });
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Failed to connect to Google Drive", {
      status: 500,
    });
  }
}
