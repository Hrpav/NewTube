import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/toaster";
import { TRPCProvider } from "@/trpc/client";
import "./globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NewTube",
  description: "YouTube clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
     <html lang="en">
       <body
         className={inter.className}
       >
          <TRPCProvider>
            <Toaster />
            {children}
          </TRPCProvider>
       </body>
     </html>
    </ClerkProvider>
  );
}
