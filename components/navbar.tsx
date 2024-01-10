import { UserButton } from "@clerk/nextjs";

import { MobileSidebar } from "@/components/mobile-sidebar";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
// import { getApiLimitCount } from "@/lib/api-limit";
// import { checkSubscription } from "@/lib/subscription";

const Navbar = async () => {
  // const apiLimitCount = await getApiLimitCount();
  // const isPro = await checkSubscription();

  return (
    <div className="flex items-center p-4 border-b-[0.2px] border-gray-200 mb-8">
      <MobileSidebar isPro={true} apiLimitCount={10} />
      <div className="flex w-full justify-end">
        <Button variant="premium" className="w-50 mr-4 h-9">
          Upgrade
          <Zap className="w-4 h-4 ml-2 fill-white" />
        </Button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
