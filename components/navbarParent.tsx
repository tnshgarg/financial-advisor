"use client";

import { MobileSidebar } from "@/components/mobile-sidebar";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "./navbar";

const ParentNavbar = async () => {
  const websiteName = "https://tanishgarg.com";

  const copyWebsiteUrl = () => {
    navigator.clipboard.writeText(websiteName);
    toast("Website URL Copied To Clipboard", {
      style: { color: "green" },
    });
  };

  const WebUrlContent = () => {
    return (
      <div className="w-full flex flex-row align-middle items-center rounded-lg justify-end ml-auto">
        <span className="ml-1 flex flex-row align-middle items-center">
          Website is LIVE -
          <span
            onClick={() => {
              window.open(websiteName, "_blank");
            }}
            className="underline text-blue-500 ml-1 cursor-pointer"
          >
            {websiteName}
          </span>
          <Copy
            onClick={copyWebsiteUrl}
            className="ml-2 cursor-pointer"
            width={14}
            height={14}
          />
        </span>
      </div>
    );
  };

  return (
    <div className="flex items-center p-4 border-b-[0.2px] border-gray-200 mb-8">
      <MobileSidebar isPro={true} apiLimitCount={10} />
      <div className="flex flex-row justify-end w-full ml-auto">
        <Navbar websiteName={websiteName} copyWebsiteUrl={copyWebsiteUrl} />
      </div>
    </div>
  );
};

export default ParentNavbar;
