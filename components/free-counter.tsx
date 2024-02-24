import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { useProModal } from "@/hooks/use-pro-modal";
import { Progress } from "./ui/progress";

export const FreeCounter = ({
  isPro = false,
  apiLimitCount = 5,
}: {
  isPro: boolean;
  apiLimitCount: number;
}) => {
  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isPro) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className=" border-gray-200 border-t-[0.2px]">
        <CardContent className="py-6">
          <div className="text-center text-sm text-black space-y-2">
            <p>Upgrade to Draaft Pro</p>
            <p>
              <span className="font-bold text-2xl">$29/mo</span>
              <span className="font-bold text-md ml-1 text-emerald-400">
                (45% Off)
              </span>
            </p>
          </div>
          <div className="text-center text-sm text-black mb-4 mt-2">
            <Progress
              className="h-3"
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
            <p className="mt-2">
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
          </div>
          <Button
            onClick={proModal.onOpen}
            variant="premium"
            className="w-full"
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
