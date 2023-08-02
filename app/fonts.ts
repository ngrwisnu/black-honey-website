import localFont from "next/font/local";
import { Merienda } from "next/font/google";

export const inter = localFont({
  src: [
    {
      path: "./fonts/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Inter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Inter-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
});

export const merienda = Merienda({
  weight: ["400", "700"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
});
