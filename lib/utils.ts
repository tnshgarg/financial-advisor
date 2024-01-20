import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function formatLargeNumber(number: number) {
  const suffixes = ["", "K", "M", "B", "T"]; // Add more as needed
  const tier = (Math.log10(Math.abs(number)) / 3) | 0;

  if (tier === 0) return number;

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);

  const scaledNumber = number / scale;

  // Adjust the number of decimal places based on your requirements
  const formattedNumber = scaledNumber.toFixed(1).replace(/\.0$/, "");

  return formattedNumber + suffix;
}

export function generateRandomId(length: number = 10): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}
