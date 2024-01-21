"use client";

import { dm_sans } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { cn, currencyFetcher } from "@/lib/utils";
import { Search, ShoppingBag, StarHalf } from "lucide-react";
import { useRouter } from "next/navigation";

type ServiceCardProps = {
  title: string;
  description: string;
  imageUrls: string[];
  pricing: number;
  ratings: number;
  subscriptionPricing: number;
  currency: string;
  serviceSlug: string;
};

function ServiceCard({
  title,
  description,
  imageUrls,
  pricing,
  ratings,
  subscriptionPricing,
  currency,
  serviceSlug,
}: ServiceCardProps) {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/services/${serviceSlug}`)}
      className="max-w-sm cursor-pointer transform-gpu hover:shadow-red-300 hover:shadow-xl rounded-2xl bg-transparent border-[0.1px] border-gray-100 mr-4"
      style={{
        transition: "box-shadow 1s ease",
      }}
    >
      <div className="pt-4 pl-4 pr-4">
        <img
          src={
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/1f7857f1619218698ba2d19457e49cff-1700571088448/Motion%20Graphics.png"
          }
          alt="Service Image"
          className="aspect-video w-full object-fill rounded-2xl"
        />
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-gray-500 leading-5 mb-4 text-sm">{description}</p>
        <p className="flex flex-row -mt-2 items-center">
          {[...Array(ratings)].map((_, index) => (
            <img src="/star.png" alt="stars" width={14} height={14} />
          ))}
          <StarHalf width={14} height={14} />
          {/* {numberOfReviews} */}
          <span className="h-[14px] text-sm">(13)</span>
        </p>
        <h1
          className={cn("text-2xl my-4 font-semibold leading-5", { dm_sans })}
        >
          {currencyFetcher(currency)}
          {pricing}
          <span className="line-through text-sm text-gray-400 ml-2">
            ({currencyFetcher(currency)}9,000)
          </span>
        </h1>
        <div className="flex flex-row align-middle">
          <div className="w-full">
            <Button className="border-red-500 border bg-transparent text-red-500 flex-1 w-full text-md font-semibold hover:bg-red-100">
              <ShoppingBag className="mr-3" width={20} height={20} />
              Add To Bag
            </Button>
          </div>
          {/* <Button className="bg-red-500 text-sm">
            {`Subscribe @ ${currencyFetcher(currency)}${subscriptionPricing}`}
          </Button> */}
        </div>
      </div>
    </Card>
  );
}

function Services() {
  return (
    <div>
      <div>
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-5">
          Let's Create Something{" "}
          <span className="underline text-red-500">Views-Worthy! </span>{" "}
        </h2>
        <div className="flex flex-row mx-auto justify-center">
          <Input
            type="text"
            placeholder="Search for Services..."
            className="px-4 py-5 max-w-2xl mb-10 outline-none focus:outline-none focus:ring-0"
          />
          <Button className="bg-red-500 ml-5 rounded-full">
            <Search width={20} height={20} />
          </Button>
        </div>
      </div>
      <Carousel className="w-full max-w-full">
        <div className="flex flex-row justify-between px-4 md:px-20 lg:px-12 items-center mb-6">
          <h1 className="text-3xl font-bold ">Top Picks for You</h1>
          <div className="flex flex-row w-[10px] z-50 relative">
            <CarouselPrevious />
            <CarouselNext className="mr-8" />
          </div>
        </div>
        <CarouselContent className="-ml-1 pb-10 px-4 md:px-20 lg:px-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/3 lg:basis-1/4"
            >
              <ServiceCard
                title="Video Editing - Level Normal"
                description="Get videos like Ishan Sharma, Ankur Warikoo and Ali Abdaal "
                ratings={4}
                pricing={4000}
                currency="rupee"
                subscriptionPricing={20000}
                imageUrls={["url1", "url2"]}
                serviceSlug="video-editing-normal"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Carousel className="w-full max-w-full">
        <div className="flex flex-row justify-between px-4 md:px-20 lg:px-12 items-center mb-6">
          <h1 className="text-3xl font-bold ">Other Services</h1>
          <div className="flex flex-row w-[10px] z-50 relative">
            <CarouselPrevious />
            <CarouselNext className="mr-8" />
          </div>
        </div>
        <CarouselContent className="-ml-1 pb-10 px-4 md:px-20 lg:px-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/3 lg:basis-1/4"
            >
              <ServiceCard
                title="Video Editing - Level Normal"
                description="Get videos like Ishan Sharma, Ankur Warikoo and Ali Abdaal "
                ratings={4}
                pricing={4000}
                currency="rupee"
                subscriptionPricing={20000}
                imageUrls={["url1", "url2"]}
                serviceSlug="video-editing-normal"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Services;
