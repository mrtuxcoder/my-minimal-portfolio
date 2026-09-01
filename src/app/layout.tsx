import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const siteUrl = "https://guganraj.site";
const openGraphImageUrl = `${siteUrl}/images/favicon/OG.png`;
const profileImageUrl = `${siteUrl}/images/guganraj-rengaraju.jpeg`;

const personStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,

      name: "Guganraj Rengaraju",
      alternateName: ["Guganraj", "mrtuxcoder"],

      url: siteUrl,
      image: profileImageUrl,

      description:
        "Junior DevOps Engineer focused on Linux, self-hosted infrastructure, Docker, CI/CD, networking, and backend systems.",

      jobTitle: "Junior DevOps Engineer",

      knowsAbout: [
        "Linux",
        "Linux System Administration",
        "DevOps",
        "System Administration",
        "Infrastructure",
        "Docker",
        "Docker Compose",
        "Containerization",
        "Container Networking",
        "Nginx",
        "CI/CD",
        "GitHub Actions",
        "GitHub Container Registry",
        "Linux Networking",
        "Firewall Configuration",
        "SSH",
        "Tailscale",
        "Self-Hosting",
        "Homelab",
        "Node.js",
        "React",
        "MongoDB",
      ],

      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Tamilavel Umamaheswaranar Karanthai Arts College",
      },

      homeLocation: {
        "@type": "Country",
        name: "India",
      },

      sameAs: [
        "https://www.linkedin.com/in/guganraj-rengaraju",
        "https://github.com/mrtuxcoder",
        "https://x.com/mrtuxcoder",
      ],

      mainEntityOfPage: {
        "@id": `${siteUrl}/#website`,
      },
    },

    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,

      url: siteUrl,
      name: "Guganraj Rengaraju",

      description:
        "Portfolio of Guganraj Rengaraju, a Junior DevOps Engineer focused on Linux, infrastructure, Docker, CI/CD, and backend systems.",

      publisher: {
        "@id": `${siteUrl}/#person`,
      },

      inLanguage: "en",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Guganraj Rengaraju | Linux, DevOps & Systems",
    template: "%s | Guganraj Rengaraju",
  },

  description:
    "Junior DevOps Engineer focused on Linux, Docker, CI/CD, self-hosted infrastructure, and backend systems.",

  keywords: [
    "Guganraj Rengaraju",
    "Guganraj",
    "Linux",
    "DevOps",
    "Junior DevOps Engineer",
    "Systems",
    "Infrastructure",
    "Linux System Administration",
    "Docker",
    "Docker Compose",
    "Nginx",
    "CI/CD",
    "GitHub Actions",
    "Containerization",
    "Self Hosting",
    "Homelab",
    "Networking",
    "Tailscale",
    "Backend Development",
    "Node.js",
    "React",
    "MongoDB",
    "MCA Student",
  ],

  authors: [
    {
      name: "Guganraj Rengaraju",
      url: siteUrl,
    },
  ],

  creator: "Guganraj Rengaraju",
  publisher: "Guganraj Rengaraju",

  category: "Technology",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Guganraj Rengaraju",

    title: "Guganraj Rengaraju | Linux, DevOps & Systems",

    description:
      "Junior DevOps Engineer focused on Linux, Docker, CI/CD, self-hosted infrastructure, and backend systems.",

    images: [
      {
        url: openGraphImageUrl,
        width: 1200,
        height: 630,
        alt: "Guganraj Rengaraju | Linux, DevOps & Systems",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Guganraj Rengaraju | Linux, DevOps & Systems",

    description:
      "Junior DevOps Engineer focused on Linux, Docker, CI/CD, self-hosted infrastructure, and backend systems.",

    images: [openGraphImageUrl],
  },

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

  icons: {
    icon: [
      {
        url: "/images/favicon/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/images/favicon/favicon.ico",
      },
      {
        url: "/images/favicon/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        url: "/images/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],

    apple: [
      {
        url: "/images/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],

    shortcut: "/images/favicon/favicon.ico",
  },

  manifest: "/images/favicon/site.webmanifest",

  appleWebApp: {
    capable: true,
    title: "Guganraj Portfolio",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#065f46",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          id="person-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />

        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}