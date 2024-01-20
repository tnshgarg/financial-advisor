import { supabase } from "@/lib/initSupabase";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();
  const response = userId
    ? await prismadb.folders.findMany({
        where: {
          userId: userId,
        },
      })
    : "User Not Authorized";

  return NextResponse.json(response);
}

export async function POST(req: any) {
  const { userId } = auth();
  const { folderId, folderName } = await req.json();

  const response = userId
    ? await prismadb.folders.create({
        data: {
          userId: userId,
          folderId: folderId,
          folderName: folderName,
        },
      })
    : "User Not Authorized";

  const { data: document } = await supabase
    .from("documents")
    .insert([{ userId, folderId, folderName }])
    .single();

  console.log("Document Creation: ", document);

  return NextResponse.json(document);
}
