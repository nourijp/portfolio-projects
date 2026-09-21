import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

// Self-hosted rather than next/font/google -- this environment's build step
// can't reach Google Fonts (a sandbox-level restriction on raw sockets from
// Node itself, not a real outage: curl to the same host works fine). Files
// pulled once via curl from the same Google Fonts CDN URLs next/font/google
// would have fetched, so the actual font is unchanged.
const bricolageGrotesque = localFont({
  variable: "--font-geist-sans",
  src: [
    { path: "./fonts/bricolage-200.ttf", weight: "200", style: "normal" },
    { path: "./fonts/bricolage-300.ttf", weight: "300", style: "normal" },
    { path: "./fonts/bricolage-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/bricolage-500.ttf", weight: "500", style: "normal" },
    { path: "./fonts/bricolage-600.ttf", weight: "600", style: "normal" },
    { path: "./fonts/bricolage-700.ttf", weight: "700", style: "normal" },
    { path: "./fonts/bricolage-800.ttf", weight: "800", style: "normal" },
  ],
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
