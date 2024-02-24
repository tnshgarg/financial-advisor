"use client";

import {
  LayoutDashboard,
  MessageSquare,
  Plus,
  Settings,
  StickyNote,
  Target,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { FreeCounter } from "@/components/free-counter";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
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
    label: "Create Youtube Script",
    icon: StickyNote,
    href: "/create-new",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export const Sidebar = ({
  isPro = false,
  apiLimitCount = 0,
}: {
  isPro: boolean;
  apiLimitCount: number;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#fffdf9] border-r-[0.2px] border-gray-200">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-10">
          <div className="relative mr-2">
            {/* <Image fill alt="Logo" src="/logo.png" /> */}
            <h1 className={cn("text-4xl font-bold text-red-500")}>@</h1>
          </div>
          <h1 className={cn("text-4xl font-bold")}>draaft</h1>
        </Link>
        <div className="px-3 pb-6">
          <Button
            className="bg-red-500 w-full text-md font-bold rounded-md hover:bg-red-600 animate-in"
            color="red"
            onClick={() => router.push("/create-new")}
          >
            <Plus className="mr-2 font-bold" />
            Work on New Idea
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
