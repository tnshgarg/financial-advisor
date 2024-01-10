"use client";

import {
  ArrowRight,
  HandMetal,
  HardDrive,
  Lightbulb,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { BigCard } from "@/components/ui/bigCard";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/dropzone";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { NextResponse } from "next/server";

export default function HomePage() {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(true);
  const [file, setFile] = useState<File>();

  async function getDriveData() {
    const response = await axios.get("/api/connect-drive-account");
    console.log("Drive Data: ", response);
  }
  async function storeAuthenticationData() {
    try {
      const response = await axios.post("/api/store-auth-data");
      console.log("Store Auth Data Response: ", storeAuthenticationData);
      return new NextResponse("Authentication Data Stored Successfully", {
        status: 200,
      });
    } catch (error) {
      return new NextResponse("Internal Error", {
        status: 500,
      });
    }
  }

  useEffect(() => {
    // storeAuthenticationData();
    // getDriveData();
  }, []);

  async function connectYoutubeAccount() {
    try {
      const postResponse = await axios.post("/api/connect-youtube-account");
      console.log("postResponse: ", postResponse.data);

      if (postResponse.data) {
        const authUrl = postResponse.data;
        window.location.href = authUrl;
      } else {
        console.log("Auth URL not found in response.");
        toast.error("Failed to initiate Youtube connection.");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Could not connect your YouTube account, Something went wrong!"
      );
    }
  }

  async function connectGoogleDriveAccount() {
    try {
      const postResponse = await axios.post("/api/connect-drive-account");
      console.log("postResponse: ", postResponse.data);

      if (postResponse.data) {
        const authUrl = postResponse.data;

        window.location.href = authUrl;

        const getResponse = await axios.get("/api/connect-drive-account");
        console.log("<getResponse>: ", getResponse.data);
      } else {
        console.log("Auth URL not found in response.");
        toast.error("Failed to initiate Google Drive connection.");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Could not connect your Google Drive account, something went wrong!"
      );
    }
  }

  async function uploadVideo(videoFile: File) {
    console.log("Videofile: ", videoFile.name);

    try {
      const response = await axios.post("/api/upload-video-2", {
        videoFile: videoFile,
      });
      console.log("<Upload Response>: ", response);
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Video could not be uploaded, something went wrong!");
    }
  }

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-5xl font-bold text-center">
          Let's Create Something Views-Worthy!
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center px-[120px]">
          You can either work on a new Idea, where you want to generate a
          Youtube Video Script, All The Assets along with it or you can create
          assets for an existing video!
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 flex flex-row justify-between w-100">
        <BigCard
          onClick={() => router.push("/create-new")}
          key={"/create-new"}
          className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer w-[48%]"
        >
          <div className="flex items-center gap-x-4">
            <div className={cn("p-2 w-fit rounded-md bg-red-100")}>
              <Lightbulb color="red" className={cn("w-8 h-8")} />
            </div>
            <div className="font-semibold">{"Work on a New Idea"}</div>
          </div>
          <ArrowRight className="w-5 h-5" />
        </BigCard>
        <BigCard
          onClick={() => router.push("/create-new")}
          key={"/create-new"}
          className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer w-[48%]"
        >
          <div className="flex items-center gap-x-4">
            <div className={cn("p-2 w-fit rounded-md bg-green-100")}>
              <HandMetal color="green" className={cn("w-8 h-8")} />
            </div>
            <div className="font-semibold">{"Work on Existing Video"}</div>
          </div>
          <ArrowRight className="w-5 h-5" />
        </BigCard>
      </div>
      <div className="px-4 md:px-20 lg:px-32 py-10 justify-between flex flex-row">
        <Button onClick={connectYoutubeAccount} className="bg-red-500">
          <Youtube className="mr-2 h-4 w-4" /> Connect Youtube Account
        </Button>
        <Button className="bg-[#0077b5]">
          <Linkedin className="mr-2 h-4 w-4" /> Connect LinkedIn Account
        </Button>
        <Button className="bg-black">
          <Twitter className="mr-2 h-4 w-4" /> Connect X / Twitter Account
        </Button>
      </div>
      <div className="px-4 md:px-20 lg:px-32 py-2">
        <Dropzone uploadVideo={uploadVideo} />
      </div>
    </div>
  );
}
