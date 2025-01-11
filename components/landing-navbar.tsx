"use client";

import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookOpen } from 'lucide-react';

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between bg-[#fffdf9]">
      <Link href="/" className="flex items-center">
        <div className="relative mr-2">
          <BookOpen className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className={cn("text-2xl font-bold text-black", font.className)}>
          Rural FinanceAI
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          {isSignedIn ? (
            <Button
              variant="outline"
              className="rounded-full bg-[#192339] text-white"
            >
              Go To Dashboard
            </Button>
          ) : (
            <Button
              variant="outline"
              className="rounded-full bg-[#192339] text-white"
            >
              Get Started
            </Button>
          )}
        </Link>
      </div>
    </nav>
  );
};
