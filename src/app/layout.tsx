import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const baseUrl = 'https://guganraj.site';

// Use YOUR favicon as OG image (since you have it in multiple sizes)
const ogImage = `${baseUrl}/images/favicon/web-app-manifest-512x512.png`; // Use the 512x512 version for OG

// Fallback placeholder (in case your image isn't accessible yet)
const dummyImage = "https://placehold.co/1200x630/065f46/059669/png?text=Guganraj+Rengaraju%0APortfolio";

// Use your favicon if accessible, otherwise use placeholder
const ogImageUrl = ogImage; // Try your favicon first

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
        url: ogImageUrl, // Using your favicon as OG image
        width: 512, // Your favicon is 512x512
        height: 512,
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
    images: [ogImageUrl], // Same image
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
  
  // Complete icons configuration using your favicon set
  icons: {
    icon: [
      // SVG (modern browsers)
      { url: "/images/favicon/favicon.svg", type: "image/svg+xml" },
      
      // ICO (legacy browsers)
      { url: "/images/favicon/favicon.ico" },
      
      // PNG sizes
      { url: "/images/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/images/favicon/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/favicon/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
      
      // Standard sizes
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    
    // Apple devices
    apple: [
      { url: "/images/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    
    // Shortcut icon (Windows)
    shortcut: "/images/favicon/favicon.ico",
  },
  
  // Web App Manifest for PWA
  manifest: "/images/favicon/site.webmanifest",
  
  // Theme colors
  themeColor: "#065f46", // Match your green theme
  appleWebApp: {
    capable: true,
    title: "Guganraj Portfolio",
    statusBarStyle: "black-translucent",
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
        {/* Additional meta tags for better mobile experience */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#065f46" />
        
        {/* Apple specific meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Guganraj Portfolio" />
        
        {/* Microsoft specific meta tags */}
        <meta name="msapplication-TileColor" content="#065f46" />
        <meta name="msapplication-config" content="/images/favicon/browserconfig.xml" />
        
        {/* Preconnect for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}