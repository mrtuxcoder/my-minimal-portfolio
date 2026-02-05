// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Header from "./components/layout/header";
// import Footer from "./components/layout/footer";

// const inter = Inter({
//   variable: "--font-inter-sans",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Guganraj Rengaraju | Linux & Full-Stack Developer",
//   description: "Linux-focused developer and MCA student. Building projects, learning system administration, backend development, and open source in public.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <Header/>
//         {children}
//         <Footer/>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

// Use reliable dummy image URLs
const dummyImage = "https://placehold.co/1200x630/png?text=Guganraj+Rengaraju%0ALinux+Developer%0APortfolio"


const baseUrl = 'https://guganraj.site';

export const metadata: Metadata = {
  title: "Guganraj Rengaraju | Linux & Full-Stack Developer",
  description: "Linux-focused developer and MCA student. Building projects, learning system administration, backend development, and open source in public.",
  keywords: ["Linux", "Full-Stack Developer", "MCA", "Open Source", "System Administration", "Backend Development"],
  authors: [{ name: "Guganraj Rengaraju" }],
  
  // Open Graph Metadata
  openGraph: {
    type: "website",
    url: baseUrl,
    title: "Guganraj Rengaraju | Linux & Full-Stack Developer",
    description: "Linux-focused developer and MCA student. Building projects, learning system administration, backend development, and open source in public.",
    siteName: "Guganraj Rengaraju Portfolio",
    images: [
      {
        url: dummyImage, // Using external dummy image
        width: 1200,
        height: 630,
        alt: "Guganraj Rengaraju - Linux & Full-Stack Developer Portfolio",
      },
    ],
  },
  
  // Twitter Card Metadata
  twitter: {
    card: "summary_large_image",
    site: "@mrtuxcoder",
    creator: "@mrtuxcoder",
    title: "Guganraj Rengaraju | Linux & Full-Stack Developer",
    description: "Linux-focused developer and MCA student. Building projects, learning system administration, backend development, and open source in public.",
    images: [dummyImage], // Same external dummy image
  },
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // You can also add icons
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Remove duplicate meta tags - Next.js handles these automatically */}
        {/* The metadata object above is sufficient */}
      </head>
      <body className={inter.className}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}