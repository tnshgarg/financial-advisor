"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { LandingAccordian } from "./landing-faq";
import LandingPricingPage from "./landing-pricing";

const testimonials = [
  {
    name: "Youtube Scripts",
    image: "/youtube.png",
    description: "Convert Your Ideas into Video Scripts",
  },
  {
    name: "Tweets & Linkedin Posts",
    image: "/tweet.png",
    description: "Convert any Youtube Video into a Tweet or Linkedin Post",
  },
  {
    name: "Email Newsletters",
    image: "/email.png",
    description: "Create a newsletter from any Youtube Video",
  },
  {
    name: "Wordpress Posts",
    image: "/wordpress.png",
    description: "Create Blog Posts from any Youtube Video",
  },
];

export const LandingContent = () => {
  return (
    <div>
      <div className="px-10 pb-20 bg-[#fffdf9]">
        <h2 className="text-center text-3xl font-bold text-black mb-10">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {testimonials.map((item) => (
            <Card
              key={item.description}
              className="bg-[#192339] border-none text-white"
            >
              <CardHeader>
                <Image
                  src={item.image!}
                  className="w-20 h-20 mb-4"
                  alt="Youtube Scripts"
                  width={100}
                  height={100}
                />
                <CardTitle className="flex items-center gap-x-2">
                  <div>
                    <p className="text-xl">{item.name}</p>
                  </div>
                </CardTitle>
                <CardContent className="pt-4 px-0">
                  {item.description}
                </CardContent>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
      <div className="px-10 pb-20 pt-20 bg-[#fffdf9]">
        <LandingPricingPage />
      </div>
      <div className="px-10 pb-20 pt-20 bg-[#fffdf9]">
        <LandingAccordian />
      </div>
      <div className="mb-10 text-center mx-auto">
        <a href="/terms-and-conditions" className="mr-4">
          Terms and Conditions
        </a>
        <a className="/privacy-policy">Privacy Policy</a>
        <p>© Draaft LLC</p>
      </div>
    </div>
  );
};
