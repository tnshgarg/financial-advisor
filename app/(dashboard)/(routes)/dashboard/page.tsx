"use client";

import {
  ArrowRight,
  HandIcon,
  HandMetal,
  Lightbulb,
  Newspaper,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { tools } from "@/constants";
import { BigCard } from "@/components/ui/bigCard";

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Let's Create Something Views-Worthy!
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center px-[120px]">
          You can either work on a new Idea, where you want to generate a
          Youtube Video Script, All The Assets along with it or you can create
          assets for an existing video
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
    </div>
  );
}
