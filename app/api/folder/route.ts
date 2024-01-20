import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const body = await req.json();
  const { userId } = auth();
  const { documentId, documentTitle, folderId } = body;

  const response = userId
    ? await prismadb.documents.create({
        data: {
          userId: userId,
          documentId: documentId,
          documentTitle: documentTitle,
          folderId: folderId,
        },
      })
    : "User Not Authorized";

  return NextResponse.json(response);
}
