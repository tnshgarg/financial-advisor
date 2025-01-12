"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-black font-bold py-36 text-center space-y-5 bg-[#fffdf9]">
      <div className="flex flex-row items-center justify-center space-x-4">
        <div className="flex">
          <img
            src="villager.jpeg"
            alt="Hero Image"
            className="w-72 h-108 sm:w-96 sm:h-128 md:w-96 md:h-128 lg:w-96 lg:h-128 object-fill rounded-md"
          />
        </div>
        <div className="w-[80%]">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-4 font-extrabold">
            <h1>Educate yourself about</h1>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-pink-700">
              <TypewriterComponent
                options={{
                  strings: [
                    "Smart Saving Techniques",
                    "Understanding Credit & Loans",
                    "Investing in Stocks & Bonds",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </div>
          <div className="text-sm md:text-xl font-light text-zinc-400 mt-3">
            We help you understand the basics of personal finance.
          </div>
          <div className="mt-8">
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button
                variant="premium"
                className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
              >
                {isSignedIn ? "Go To Dashboard" : "Start Generating For Free"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
