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

// Base URL - change this in production to your actual domain
const baseUrl = 'https://guganraj.site' 

export const metadata: Metadata = {
  title: "Guganraj Rengaraju | Linux & Full-Stack Developer",
  description: "Linux-focused developer and MCA student. Building projects, learning system administration, backend development, and open source in public.",
  keywords: ["Linux", "Full-Stack Developer", "MCA", "Open Source", "System Administration", "Backend Development"],
  authors: [{ name: "Guganraj Rengaraju" }],
  
  // Open Graph Metadata for Facebook, LinkedIn, etc.
  openGraph: {
    type: "website",
    url: baseUrl,
    title: "Guganraj Rengaraju | Linux & Full-Stack Developer",
    description: "Linux-focused developer and MCA student. Building projects, learning system administration, backend development, and open source in public.",
    siteName: "Guganraj Rengaraju Portfolio",
    images: [
      {
        url: `${baseUrl}/images/hero-sec/user-img.png`, // Must be absolute URL
        width: 1200,
        height: 630,
        alt: "Guganraj Rengaraju - Linux & Full-Stack Developer Portfolio",
      },
    ],
  },
  
  // Twitter Card Metadata
  twitter: {
    card: "summary_large_image",
    site: "@mrtuxcoder", // Your Twitter handle
    creator: "@mrtuxcoder", // Your Twitter handle
    title: "Guganraj Rengaraju | Linux & Full-Stack Developer",
    description: "Linux-focused developer and MCA student. Building projects, learning system administration, backend development, and open source in public.",
    images: [`${baseUrl}/images/hero-sec/user-img.png`], // Must be absolute URL
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
  
  // Viewport is important for mobile
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional meta tags for better link previews */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Additional social meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mrtuxcoder" />
        <meta name="twitter:creator" content="@mrtuxcoder" />
        <meta name="twitter:title" content="Guganraj Rengaraju | Linux & Full-Stack Developer" />
        <meta name="twitter:description" content="Linux-focused developer and MCA student. Building projects, learning system administration, backend development, and open source in public." />
        <meta name="twitter:image" content={`${baseUrl}/images/hero-sec/user-img.png`} />
        
        {/* Additional OG tags for better compatibility */}
        <meta property="og:title" content="Guganraj Rengaraju | Linux & Full-Stack Developer" />
        <meta property="og:description" content="Linux-focused developer and MCA student. Building projects, learning system administration, backend development, and open source in public." />
        <meta property="og:image" content={`${baseUrl}/images/hero-sec/user-img.png`} />
        <meta property="og:image:alt" content="Guganraj Rengaraju - Linux & Full-Stack Developer Portfolio" />
      </head>
      <body className={inter.className}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}