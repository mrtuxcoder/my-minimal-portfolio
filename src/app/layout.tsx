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

const baseUrl = "https://guganraj.site";
const ogImage = `${baseUrl}/images/favicon/OG.jpg`;
const myPic = `${baseUrl}/images/guganraj-rengaraju.jpeg`;



const personStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,

      name: "Guganraj Rengaraju",
      alternateName: ["Guganraj","mrtuxcoder"],

      url: baseUrl,
      image: myPic,

      description:
        "MCA student and Linux, DevOps, and systems-focused developer with hands-on experience in self-hosted deployments, Docker, Linux administration, networking, CI/CD, and full-stack application infrastructure.",

      jobTitle: "Linux & DevOps-Focused Developer",

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
  "@id": `${baseUrl}/#website`,
},
    },

    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,

      url: baseUrl,
      name: "Guganraj Rengaraju",
      description:
        "Personal portfolio documenting Linux, DevOps, systems, infrastructure, homelab projects, and technical work.",

      publisher: {
        "@id": `${baseUrl}/#person`,
      },

      inLanguage: "en",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: "Guganraj Rengaraju | Linux, DevOps & Systems",
    template: "%s | Guganraj Rengaraju",
  },

  description:
    "Guganraj Rengaraju is an MCA student and Linux, DevOps, and systems-focused developer building and documenting self-hosted infrastructure, homelab projects, Docker deployments, CI/CD pipelines, networking, and Linux systems.",

  keywords: [
    "Guganraj Rengaraju",
    "Guganraj",
    "Linux",
    "DevOps",
    "Systems",
    "Infrastructure",
    "Linux System Administration",
    "Docker",
    "Docker Compose",
    "Nginx",
    "CI/CD",
    "GitHub Actions",
    "GitHub Container Registry",
    "Containerization",
    "Homelab",
    "Self Hosting",
    "Networking",
    "Tailscale",
    "RHCSA",
    "MCA Student",
  ],

  authors: [
    {
      name: "Guganraj Rengaraju",
      url: baseUrl,
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
    url: baseUrl,
    siteName: "Guganraj Rengaraju",

    title: "Guganraj Rengaraju | Linux, DevOps & Systems",

    description:
      "Linux, DevOps, and systems-focused developer building self-hosted infrastructure, homelab projects, containerized applications, CI/CD pipelines, and Linux-based systems.",

    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Guganraj Rengaraju - Linux, DevOps and Systems Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Guganraj Rengaraju | Linux, DevOps & Systems",

    description:
      "Linux, DevOps, and systems-focused developer building self-hosted infrastructure, homelab projects, containers, CI/CD, and Linux systems.",

    images: [ogImage],
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