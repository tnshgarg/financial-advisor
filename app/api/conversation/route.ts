import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextResponse } from "next/server";

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const { REACT_APP_GEMINI_API_KEY } = process.env;

const generateContent = async (text: string) => {
  console.log("GenerateContent: ", text)
  try {
    const response = await axios.post(`${API_URL}?key=${REACT_APP_GEMINI_API_KEY}`, {
      contents: [
        {
          parts: [
            { text: `Reply in hindi, ${text}` }
          ]
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Response:', response.data.candidates[0].content.parts[0].text);
    return response.data.candidates[0].content.parts[0].text;
  } catch (error: any) {
    // console.error('Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const {data} = await req.json();

    // console.log("BAckend:", data.data);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const response = await generateContent(data)

    return NextResponse.json(response);
  } catch (error) {
    // console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
