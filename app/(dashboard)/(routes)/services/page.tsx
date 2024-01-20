"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ServiceCardProps = {
  title: string;
  description: string;
  imageUrls: string[];
  pricing: number;
  ratings: number;
  subscriptionPricing: number;
  currency: string;
};

function ServiceCard({
  title,
  description,
  imageUrls,
  pricing,
  ratings,
  subscriptionPricing,
  currency,
}: ServiceCardProps) {
  return (
    <Card className="max-w-sm">
      <img
        src={
          "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/1f7857f1619218698ba2d19457e49cff-1700571088448/Motion%20Graphics.png"
        }
        alt="Service Image"
        className="aspect-video w-full object-fill"
      />
      <p>{title}</p>
      <p>{description}</p>
      <p>{ratings}</p>
      <p>{pricing}</p>
      <Button>Add To Cart</Button>
      <Button>Purchase Subscription</Button>
    </Card>
  );
}

function Services() {
  return (
    <div className="px-4 md:px-20 lg:px-12">
      <ServiceCard
        title="Video Editing"
        description="Video Editing"
        ratings={4}
        pricing={4000}
        currency="rupee"
        subscriptionPricing={20000}
        imageUrls={["url1", "url2"]}
      />
    </div>
  );
}

export default Services;
