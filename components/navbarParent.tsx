"use client";

import { MobileSidebar } from "@/components/mobile-sidebar";
import toast from "react-hot-toast";
import Navbar from "./navbar";

const ParentNavbar = async ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const websiteName = "https://tanishgarg.com";

  const copyWebsiteUrl = () => {
    navigator.clipboard.writeText(websiteName);
    toast("Website URL Copied To Clipboard", {
      style: { color: "green" },
    });
  };

  return (
    <div className="flex items-center p-4 border-b-[0.2px] border-gray-200 mb-8">
      <MobileSidebar isPro={true} apiLimitCount={10} />
      <div className="flex flex-row justify-end w-full ml-auto">
        <Navbar isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
};

export default ParentNavbar;
