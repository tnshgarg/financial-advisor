import formidable from "formidable";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: any, res: any) {
  try {
    const form = new formidable.IncomingForm();

    // Set the upload directory
    form.uploadDir = path.join(process.cwd(), "public/uploads");

    form.parse(req, async (err: any, fields: any, files: any) => {
      if (err) {
        console.error("Error parsing form data:", err);
        // res.status(500).json({ error: "Internal Server Error" });
        return NextResponse.json(err);
      }

      const { title, description, privacyStatus } = fields;
      const { file } = files;

      // Handle the file (move it to the desired location, save metadata to the database, etc.)
      const uploadPath = path.join(form.uploadDir, file.name);
      fs.renameSync(file.path, uploadPath);

      // Here you can save the video metadata and file path to your database

      // Respond with success
      return NextResponse.json("Video Uploaded Successfully!");
    });
  } catch (error) {
    console.error("Error handling video upload:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
