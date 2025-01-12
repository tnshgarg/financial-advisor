import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {BrainCog } from "lucide-react";

export const BotAvatar = () => {
  return (
    <Avatar className="flex items-center justify-center w-[36px] h-[36px] bg-white">
      {/* <h1 className={cn("text-4xl font-bold text-black")}>@</h1> */}
      <BrainCog className={cn("text-5xl font-bold text-center text-blue-600")} />
    </Avatar>
  );
};
