import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = () => {
  const { userId } = auth();

  if (userId)
    return NextResponse.json({ status: 200, message: "User Authorized" });
  return NextResponse.json({ status: 401, message: "User Unauthorized" });
};
