import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();

  return NextResponse.json({ userId });
}
