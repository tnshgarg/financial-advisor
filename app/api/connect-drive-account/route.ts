import { NextResponse } from "next/server";
import { google } from "googleapis";
import { oauth2Client } from "@/lib/oauth";

export async function POST(req: Request) {
  try {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/drive.file",
        // "https://www.googleapis.com/auth/youtube.upload",
      ],
    });

    return new NextResponse(authUrl, { status: 200 });
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export const getData = async () => {
  // allows you to use drive API methods e.g. listing files, creating files.
  console.log("Auth2 Client: ", oauth2Client);
  const drive = google.drive({ version: "v3", auth: oauth2Client });
  try {
    const res = await drive.files.list();
    const files = res.data.files;

    console.log(files);
  } catch (error: any) {
    console.error("Error fetching files:", error.message);
    return null;
  }
};

export async function GET(req: any) {
  try {
    const data = await getData();
    console.log("Drive Data: ", data);

    // Here you can store these tokens securely for future use
    // ...
    if (data)
      return new NextResponse(data, {
        status: 200,
      });
    else
      return new NextResponse("Unable to fetch google drive data", {
        status: 500,
      });
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Failed to connect to Google Drive", {
      status: 500,
    });
  }
}

export const getDriveClient = () => {
  return google.drive({ version: "v3", auth: oauth2Client });
};

export const createFileInDrive = async (fileDetails: {
  name: any;
  mimetype: any;
  stream: any;
}) => {
  const drive = getDriveClient();

  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileDetails.name,
        mimeType: fileDetails.mimetype,
      },
      media: {
        body: fileDetails.stream,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error creating file in Google Drive:", error);
    throw error;
  }
};

// pages/api/connect-drive-account.js

// import { google } from "googleapis";
// import { OAuth2Client } from "google-auth-library";

// const CLIENT_ID = process.env.GOOGLE_DRIVE_CLIENT_ID;
// const CLIENT_SECRET = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
// const REDIRECT_URI = "http://localhost:3000/api/connect-drive-account/callback"; // Update this with your redirect URI

// const oauth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );

// export default async function handler(req: any, res: any) {
//   if (req.method === "GET") {
//     const url = oauth2Client.generateAuthUrl({
//       access_type: "offline",
//       scope: ["https://www.googleapis.com/auth/drive.readonly"], // Adjust scopes as needed
//     });

//     res.redirect(url);
//   } else if (req.method === "POST") {
//     const { code } = req.body;

//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);

//     // Store tokens securely (database, encrypted, etc.)
//     // tokens.access_token and tokens.refresh_token

//     res.status(200).json({ success: true });
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }

// export async function callbackHandler(req: any, res: any) {
//   const { code } = req.query;

//   const { tokens } = await oauth2Client.getToken(code);
//   oauth2Client.setCredentials(tokens);

//   // Store tokens securely (database, encrypted, etc.)
//   // tokens.access_token and tokens.refresh_token

//   res.redirect("/"); // Redirect to home or dashboard
// }
