import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Projects & Accomplishments — Hamed Nouri",
  description: "A filterable record of what Hamed Nouri has built and done, across AI, product development, and communication.",
  openGraph: {
    images: [
      {
        url: "https://ai.hamednouri.com/images/home/banner/banner-img.png",
        width: 1200,
        height: 630,
        alt: "Hamed Nouri — Projects & Accomplishments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://ai.hamednouri.com/images/home/banner/banner-img.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bricolageGrotesque.className}>
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
