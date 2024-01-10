"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  Target,
  File,
  Upload,
  UploadIcon,
  Plus,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { FreeCounter } from "@/components/free-counter";
import { Button } from "./ui/button";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Social Posts Generator",
    icon: MessageSquare,
    href: "/conversation",
  },
  {
    label: "Youtube SEO",
    icon: Target,
    href: "/youtube-seo",
  },
  {
    label: "Your Documents",
    icon: File,
    href: "/documents",
  },
  // {
  //   label: "Image Generation",
  //   icon: ImageIcon,
  //   color: "text-pink-700",
  //   href: "/image",
  // },
  // {
  //   label: "Video Generation",
  //   icon: VideoIcon,
  //   color: "text-orange-700",
  //   href: "/video",
  // },
  // {
  //   label: "Music Generation",
  //   icon: Music,
  //   color: "text-emerald-500",
  //   href: "/music",
  // },
  // {
  //   label: "Code Generation",
  //   icon: Code,
  //   color: "text-green-700",
  //   href: "/code",
  // },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export const Sidebar = ({
  apiLimitCount = 0,
  isPro = false,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#fffdf9] border-r-[0.2px] border-gray-200">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-10">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-4xl font-bold")}>Draaft</h1>
        </Link>
        <div className="px-3 pb-6">
          <Button
            className="bg-red-500 w-full text-md font-bold rounded-md"
            color="red"
          >
            <Plus className="mr-2 font-bold" />
            Upload Video
          </Button>
        </div>

        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-md group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-black hover:underline hover:bg-red-50 rounded-lg transition",
                pathname === route.href ? "bg-red-50" : "text-black"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon
                  className={cn(
                    "h-5 w-5 mr-3",
                    pathname == route.href ? "text-red-400 font-bold" : ""
                  )}
                />
                <span
                  className={cn(
                    pathname == route.href ? "text-black font-bold" : ""
                  )}
                >
                  {route.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  );
};
