import "./globals.css";
import type { Metadata } from "next";
import { inter } from "./fonts";
import AOSInit from "@/config/aos-init";
import Provider from "@/lib/provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Black Honey",
  description:
    "Find the best Black Honey with antioxidants, vitamins, and minerals that can help boost your immune system and improve your overall health.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AOSInit />
      <body className={`${inter.className} min-h-screen`}>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
