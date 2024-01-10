import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import {
  cp,
  twitter,
  linkedin,
  ytScript,
  youtubeSEO,
} from "../prompts/global-prompts";
import fs from "fs";
import ytdl from "ytdl-core";
import axios from "axios";
import FormData from "form-data";
import prismadb from "@/lib/prismadb";

// import { checkSubscription } from "@/lib/subscription";
// import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
const DOCUMENT_ROUTE = "audio.mp3";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateAudio(videoUrl: string) {
  const outputFilePath = DOCUMENT_ROUTE;

  try {
    if (!videoUrl || !outputFilePath) {
      throw new Error("Invalid input parameters");
    }

    const videoInfo = await ytdl.getInfo(videoUrl);
    const videoFormat = await ytdl.chooseFormat(videoInfo.formats, {
      quality: "lowestaudio",
    });

    if (videoFormat) {
      const videoReadableStream = ytdl(videoUrl, { format: videoFormat });
      const fileWriteStream = fs.createWriteStream(outputFilePath);

      await videoReadableStream.pipe(fileWriteStream);
      return new Promise((resolve, reject) => {
        fileWriteStream.on("finish", () => {
          videoReadableStream.destroy();
          resolve("Video Generated");
        });
        fileWriteStream.on("error", (error: any) => {
          videoReadableStream.destroy();
          reject(error);
        });
      });
    } else {
      throw new Error("No suitable video format found");
    }
  } catch (e) {
    console.log("Video Error: ", e);
  }
}

async function generateText() {
  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(DOCUMENT_ROUTE));
    formData.append("model", "whisper-1");

    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          ...formData.getHeaders(),
        },
        timeout: 1200000,
      }
    );

    console.log("OPENAI Response:", response.data.text);
    return response.data.text;
  } catch (e) {
    console.log("[Error in Text Generation]: ", e);
    return new NextResponse("Text Generation Process Error", {
      status: 400,
    });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { videoTopic } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!videoTopic) {
      return new NextResponse("A Valid Youtube Video Topic is Required!", {
        status: 400,
      });
    }

    // const freeTrial = await checkApiLimit();
    // const isPro = await checkSubscription();

    // if (!freeTrial && !isPro) {
    //   return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    // }

    // await generateAudio(videoTopic);
    // const transcript = JSON.stringify(await generateText());
    // console.log("Transcript: ", transcript);

    // const newTranscript = transcript.substring(0, 15000);
    let prompt = youtubeSEO(videoTopic);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    // if (!isPro) {
    //   await incrementApiLimit();
    // }

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
