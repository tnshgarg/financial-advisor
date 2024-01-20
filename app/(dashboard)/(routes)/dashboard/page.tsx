"use client";

import Dropzone from "@/components/dropzone";
import LinkedinPost from "@/components/social/linkedinPost";
import TwitterPost from "@/components/social/twitterPost";
import { BigCard } from "@/components/ui/bigCard";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ArrowRight, HandMetal, Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function HomePage() {
  const router = useRouter();
  const [analyticsData, setAnalyticsData] = useState<
    | {
        items: any[];
        kind: string;
        etag: string;
        pageInfo: { totalResults: number; resultsPerPage: number };
      }
    | undefined
  >(undefined);
  const [isHidden, setIsHidden] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsHidden(scrollY > 0); // Hide if scrolled
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // async function getYoutubeAnalyticsData() {
  //   try {
  //     const response = await axios.get("/api/dashboard");
  //     console.log("DATA: ", response.data);
  //     setAnalyticsData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching YouTube analytics data:", error);
  //   }
  // }

  // useEffect(() => {
  //   getYoutubeAnalyticsData();
  // }, []);

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

  async function uploadVideo(videoFile: File) {
    console.log("Videofile: ", videoFile.name);
    try {
      const formdata = new FormData();
      formdata.append("file", videoFile);
      const response = await axios.post("/api/upload-video-2", {
        videoFile: formdata,
      });

      console.log("<Upload Response>: ", response);
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Video could not be uploaded, something went wrong!");
    }
  }

  async function postToWordpress() {
    try {
      const response = await axios.post("/api/post-to-wordpress", {
        title: "Demo",
        content: "Demo",
        status: "publish",
      });
      console.log("Wordpress Post Response: ", response.data);
      return response.data;
    } catch (error) {
      console.log("Internal Server Error: ", error);
    }
  }

  return (
    <div className="px-4 md:px-20 lg:px-12">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-5xl font-bold text-center">
          {"Let's Create Something Views-Worthy!"}
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center px-[120px]">
          {
            "You can either work on a new Idea, where you want to generate a\n Youtube Video Script, All The Assets along with it or you can create\n assets for an existing video!"
          }
        </p>
      </div>
      {/* <div className="flex flex-row justify-between w-100 mb-7">
        {!analyticsData ? (
          <div>Loading...</div>
        ) : (
          <>
            <BigCard
              key={"subscriber count"}
              className="p-4 border-black/5 bg-red-50 flex items-center justify-between hover:shadow-md transition cursor-pointer w-[24%]"
            >
              <div className="items-center gap-x-4 align-middle w-full">
                <div className="font-semibold text-center">{"Subscribers"}</div>
                <div className="font-bold text-4xl text-center">
                  {formatLargeNumber(
                    analyticsData?.items[0].statistics.subscriberCount
                  )}
                </div>
              </div>
            </BigCard>
            <BigCard
              key={"views count"}
              className="p-4 border-black/5 bg-blue-50 flex items-center justify-between hover:shadow-md transition cursor-pointer w-[24%]"
            >
              <div className="items-center gap-x-4 align-middle w-full">
                <div className="font-semibold text-center">{"Views"}</div>
                <div className="font-bold text-4xl text-center">
                  {formatLargeNumber(
                    analyticsData?.items[0].statistics.viewCount
                  )}
                </div>
              </div>
            </BigCard>
            <BigCard
              key={"views count"}
              className="p-4 border-black/5 bg-green-50 flex items-center justify-between hover:shadow-md transition cursor-pointer w-[24%]"
            >
              <div className="items-center gap-x-4 align-middle w-full">
                <div className="font-semibold text-center">
                  {"Newsletter Subscribers"}
                </div>
                <div className="font-bold text-4xl text-center">
                  {formatLargeNumber(32450)}
                </div>
              </div>
            </BigCard>
            <BigCard
              key={"views count"}
              className="p-4 border-black/5 bg-yellow-50 flex items-center justify-between hover:shadow-md transition cursor-pointer w-[24%]"
            >
              <div className="items-center gap-x-4 align-middle w-full">
                <div className="font-semibold text-center">
                  {"Website Views"}
                </div>
                <div className="font-bold text-4xl text-center">
                  {formatLargeNumber(10112)}
                </div>
              </div>
            </BigCard>
          </>
        )}
      </div> */}
      <div className="flex flex-row justify-between w-100">
        <BigCard
          onClick={() => router.push("/create-new")}
          key={"/create-new"}
          className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer w-[49.3%]"
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
          className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer w-[49.3%]"
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
      {/* <div className="py-10 justify-between flex flex-row">
        <Button onClick={connectYoutubeAccount} className="bg-red-500">
          <Youtube className="mr-2 h-4 w-4" /> Connect Youtube Account
        </Button>
        <Button className="bg-[#0077b5]">
          <Linkedin className="mr-2 h-4 w-4" /> Connect LinkedIn Account
        </Button>
        <Button className="bg-black">
          <Twitter className="mr-2 h-4 w-4" /> Connect X / Twitter Account
        </Button>
        <Button className="bg-black" onClick={postToWordpress}>
          <Twitter className="mr-2 h-4 w-4" /> Post to Wordpress
        </Button>
      </div> */}
      <div className="py-2 pt-7">
        <Dropzone uploadVideo={uploadVideo} />
      </div>
      <div className="py-4 flex justify-between items-start align-top">
        <div className="flex-shrink-0" style={{ maxWidth: "49%" }}>
          <TwitterPost
            userName={analyticsData?.items[0].snippet.title}
            userHandle={analyticsData?.items[0].snippet.customUrl}
          />
        </div>
        <div className="flex-shrink-0" style={{ maxWidth: "49%" }}>
          <LinkedinPost userName={analyticsData?.items[0].snippet.title} />
        </div>
      </div>

      {/* <div
        className={`absolute inset-x-0 bottom-12 flex items-center justify-center ${
          isHidden ? "hidden" : ""
        }`}
      >
        <ScrollDown />
      </div> */}
    </div>
  );
}
