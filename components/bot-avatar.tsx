import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const BotAvatar = () => {
  return (
    <Avatar className="">
      <h1 className={cn("text-4xl font-bold text-black")}>@</h1>
    </Avatar>
  );
};
