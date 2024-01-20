// pages/api/upload.js
import axios from "axios";
import formidable from "formidable";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

const B2_KEY_ID = process.env.B2_KEY_ID;
const B2_APPLICATION_KEY = process.env.B2_APPLICATION_KEY;
const B2_BUCKET_NAME = process.env.B2_YOUTUBERS_DATA_BUCKET_NAME;

const B2_API_URL = process.env.B2_API_URL;

export async function POST(req: any) {
  if (B2_API_URL && B2_BUCKET_NAME) {
    const form = formidable({});
    form.parse(req, async (err: any, fields: any, files: any) => {
      const file = files.file;

      // Generate Authorization Header
      const credentials = Buffer.from(
        `${B2_KEY_ID}:${B2_APPLICATION_KEY}`
      ).toString("base64");
      const headers = {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "b2/x-auto",
        "X-Bz-File-Name": file.name,
        "X-Bz-Content-Sha1": "do_not_verify", // Backblaze recommends setting this to 'do_not_verify'
      };

      // Upload file to Backblaze B2
      try {
        const response = await axios.post(
          B2_API_URL + B2_BUCKET_NAME + "/" + file.name,
          file.path,
          {
            headers,
          }
        );
        return NextResponse.json({ success: true, data: response.data });
      } catch (error: any) {
        return NextResponse.json({ success: false, data: error });
      }
    });
  } else {
    return NextResponse.json("Internal Server Error");
  }
}
