"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, Youtube } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

function YoutubeCP({
  userName,
  content,
}: {
  userName: string;
  content: string;
}) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const currentDate: string = new Date().toLocaleDateString("en-US", options);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("lorem lorem lorem");
    toast("Post Copied To Clipboard", {
      style: { color: "green" },
    });
  };

  return (
    <div className="bg-[#fff] rounded-xl shadow-md w-[33%] md:w-[100%]">
      <div className="py-5 pb-4 mb-2 flex flex-row align-middle items-center justify-between bg-red-500 px-7 rounded-tl-xl rounded-tr-xl">
        <div className="flex flex-row">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-white pl-3 flex flex-col justify-evenly leading-4">
            <p>{userName}</p>
            <p className="text-gray-200 p-0 m-0 leading-5 text-sm">
              @NextMrBeast
            </p>
          </div>
        </div>
        <div>
          <Youtube color="white" size={28} />
        </div>
      </div>
      <div className="pb-5 text-black  px-7">
        <p className="text-md">{content}</p>
        <p className="text-sm text-gray-400">{currentDate}</p>
      </div>
      <div className="px-7">
        <Button
          onClick={copyToClipboard}
          className="w-full rounded-3xl hover:bg-red-500 animate-pulse bg-red-500 text-white text-md mb-5 font-bold"
        >
          Copy To Clipboard <Copy className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default YoutubeCP;
