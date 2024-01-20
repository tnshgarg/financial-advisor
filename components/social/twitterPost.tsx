"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

function TwitterPost({
  userName,
  userHandle,
}: {
  userName: string;
  userHandle: string;
}) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const currentDate: string = new Date().toLocaleDateString("en-US", options);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("lorem lorem lorem");
    toast("Twitter Post Copied To Clipboard", {
      style: { color: "green" },
    });
  };

  return (
    <div className="bg-[#16212b] rounded-xl shadow-md w-[33%] md:w-[100%] px-7">
      <div className=" py-5 flex flex-row align-middle items-center justify-between">
        <div className="flex flex-row">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-white pl-3 flex flex-col justify-evenly">
            <p>{userName}</p>
            <p className="text-gray-500 p-0 m-0 leading-5">{userHandle}</p>
          </div>
        </div>
        <div>
          <Image
            src="/twitter.png"
            width={30}
            height={24}
            className="invert object-contain"
            alt="Twitter Logo"
          />
        </div>
      </div>
      <div className="pb-5 text-white">
        <p className="text-xl">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam illo
          rem officia blanditiis voluptatem perspiciatis dicta? Maiores dolor
          temporibus necessitatibus ut quis, laudantium magni error dignissimos
          dolorum praesentium accusamus aut, optio animi?
        </p>
        <p className="text-sm text-gray-400">{currentDate}</p>
      </div>
      <Button
        onClick={copyToClipboard}
        className="w-full rounded-3xl hover:bg-red-400 animate-bounce bg-red-500 text-white text-md mb-5 font-bold"
      >
        Copy To Clipboard <Copy className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );
}

export default TwitterPost;
