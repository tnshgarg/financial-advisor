"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, Linkedin } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

function LinkedinPost({ userName }: { userName: string }) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const currentDate: string = new Date().toLocaleDateString("en-US", options);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("lorem lorem lorem");
    toast("Linkedin Post Copied To Clipboard", {
      style: { color: "green" },
    });
  };

  return (
    <div className="bg-[#fff] rounded-xl shadow-md w-[33%] md:w-[100%] px-7">
      <div className=" py-5 flex flex-row align-middle items-center justify-between">
        <div className="flex flex-row">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-black pl-3 flex flex-col justify-evenly leading-4">
            <p>{userName}</p>
            <p className="text-gray-500 p-0 m-0 leading-5 text-sm">
              Content Creator
            </p>
            <p className="text-gray-500 p-0 m-0 text-sm leading-3">1m ago</p>
          </div>
        </div>
        <div>
          <Linkedin color="black" size={28} />
        </div>
      </div>
      <div className="pb-5 text-black">
        <p className="text-md">
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

export default LinkedinPost;
