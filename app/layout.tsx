import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const baiJamjuree = localFont({
  variable: "--font-bai-jamjuree",
  src: [
    {
      path: "../public/Bai_Jamjuree/BaiJamjuree-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Bai_Jamjuree/BaiJamjuree-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Bai_Jamjuree/BaiJamjuree-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/Bai_Jamjuree/BaiJamjuree-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "NextDST 69",
  description: "แผนการเรียนและรายวิชาหลักสูตร Digital Science and Technology พ.ศ. 2569",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${baiJamjuree.variable} h-full scroll-smooth`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
