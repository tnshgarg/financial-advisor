"use client";

import { useRouter } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { NextResponse } from "next/server";

export default function OAuthCallbackPage() {
  const router = useRouter();

  async function oAuthCallback() {
    try {
      const currentUrl = window.location.href;
      const urlParams = new URLSearchParams(new URL(currentUrl).search);

      const code = await urlParams.get("code");
      console.log("Client Code: ", code);
      const response = await axios.post("/api/oauthCallback", {
        code: code,
      });
      console.log("Drive Data: ", response);
      router.push("/dashboard");
      if (response.status == 200) {
        toast("Account Connected Successfully", {
          style: { color: "green" },
        });
      } else {
        toast("Account could not Connect, Please Try Again!", {
          style: { color: "red" },
        });
      }
    } catch (error) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }

  useEffect(() => {
    oAuthCallback();
  }, []);

  return <div>Redirecting, Please Wait....</div>;
}
