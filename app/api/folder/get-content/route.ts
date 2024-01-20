import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const body = await req.json();
  const { userId } = auth();
  console.log("userId: ", userId);
  const { folderId } = body;
  console.log("folderId: ", folderId);

  const response = userId
    ? await prismadb.documents.findMany({
        where: {
          userId,
          folderId,
        },
      })
    : "User Not Authorized";

  return NextResponse.json(response);
}
