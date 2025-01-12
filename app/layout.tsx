import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import { ModalProvider } from "@/components/modal-provider";
import { ToasterProvider } from "@/components/toaster-provider";
import localFont from "next/font/local";

import Head from "next/head";
import "./globals.css";

const font = DM_Sans({ weight: "500", subsets: ["latin"] });
const degular = localFont({
  src: [
    {
      path: "../public/fonts/Degular-Black.woff",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/Degular-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Degular-Light.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Degular-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Degular-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Rural FinanceAI",
  description: "AI Finance Coach",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body className={degular.className}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
