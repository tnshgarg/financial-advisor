"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";

function DetailedServicePage() {
  async function addToCart() {
    try {
      const response = await axios.post("/api/backend/cart", {
        product_id: "dum_1",
      });
      console.log("Add to Cart Response: ", response);
    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  return (
    <div className="px-4 md:px-20 lg:px-12">
      <div className="flex flex-row">
        <Carousel className="w-full max-w-xl">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <img
                  src={
                    "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/1f7857f1619218698ba2d19457e49cff-1700571088448/Motion%20Graphics.png"
                  }
                  alt="Service Image"
                  className="aspect-video w-full object-contain rounded-2xl max-w-lg md:max-w-md lg:max-w-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="relative max-w-[80px] mt-8 items-center justify-center mx-auto">
            <CarouselPrevious className="ml-8" />
            <CarouselNext className="mr-8" />
          </div>
        </Carousel>
        <div className="px-10">
          <h1 className="text-3xl font-bold ">
            Professional Youtube Video Editing For Teachers, Entertainers &
            Gamers
          </h1>
          <p className="text-gray-500 text-lg mt-3 leading-5 mb-4">
            Get videos like Ishan Sharma, Ankur Warikoo and Ali Abdaal{" "}
          </p>
          <p className="flex flex-row">
            {[...Array(5)].map((_, index) => (
              <img
                src="/star.png"
                alt="stars"
                width={16}
                height={16}
                className="ml-[0.5px] mr-[0.5px]"
              />
            ))}
          </p>
          <h1 className="text-4xl mt-5 ">₹4,999/-</h1>
          <Button
            onClick={addToCart}
            className="w-full bg-red-500 text-white mt-5 hover:bg-red-300"
          >
            Add To Cart
          </Button>
          <Button className="w-full mt-2 bg-transparent border border-red-500 text-red-500 hover:bg-red-50">
            Subscribe for 4 videos/month @ ₹16,000
          </Button>
        </div>
      </div>
      <div className="mt-6 pl-4 pr-8">
        <h1 className="text-2xl font-semibold text-center mb-3">
          About this service
        </h1>
        <div className="prose mx-auto">
          <p>
            Elevate your LinkedIn game with high-quality content that engages
            your target audience, boosts your credibility, and opens doors to
            new opportunities.
          </p>
          <br />
          <p>
            LinkedIn is a powerful platform for professional networking and
            brand building, but it takes more than just an account to stand out.
            Regular posting is key to staying visible on LinkedIn, and it takes
            engaging, informative, and consistent posts to truly make your mark.
          </p>
          <br />
          <p>
            Hi, I'm Sumire! A copywriter and LinkedIn marketing specialist with
            8+ years of experience helping founders, thought leaders, and
            business professionals thrive on LinkedIn.
          </p>
          <br />
          <p>
            By delving deep into your industry, target market, and business
            goals, I create content that builds trust with your audience,
            positions you as an industry expert, and maximizes your brand's
            impact.
          </p>
          <br />
          <h3 className="text-xl font-semibold mb-2">
            LinkedIn content types I offer:
          </h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Promotional Posts</li>
            <li>Educational Posts</li>
            <li>Thought Leadership Posts</li>
            <li>Industry Trends and Insights</li>
            <li>Customer Success Stories</li>
            <li>Interactive LinkedIn Polls</li>
            <li>Company Updates</li>
            <li>Award Announcements</li>
          </ul>
        </div>
        <div className="prose mx-auto">
          {/* ... (existing content) ... */}

          <h3 className="text-2xl font-semibold mb-2 mt-6">
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible>
            <AccordionItem
              value="item-1"
              title="1. Can I request custom video editing styles?"
            >
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              title="1. Can I request custom video editing styles?"
            >
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default DetailedServicePage;
