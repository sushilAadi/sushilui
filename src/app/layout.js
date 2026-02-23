import { CSPostHogProvider } from "@/components/PostHogProvider";
import ClientSideLayout from '@/components/ClientSideLayout';
import "./globals.css";
import LazyChatInterface from '@/components/LazyChatInterface';
import MicrosoftClarity from '@/components/MicrosoftClarity';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const SITE_URL = "https://sushildev.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sushil Sharma | Senior Frontend Developer | React, Next.js & BaaS Engineer",
  description:
    "Sushil Sharma is a Senior Frontend Developer with 6+ years of experience building scalable web applications using React, Next.js, TypeScript, Supabase, Firebase, and modern Backend-as-a-Service architectures. Available for hire.",
  keywords: [
    "Sushil Sharma",
    "Senior Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Full Stack Frontend Engineer",
    "Supabase Developer",
    "Firebase Developer",
    "BaaS Architect",
    "TypeScript Developer",
    "Tailwind CSS",
    "Web Performance Optimization",
    "Frontend Architect",
    "React Native Developer",
    "JavaScript Developer",
    "Hire Frontend Developer",
  ],
  authors: [{ name: "Sushil Sharma", url: SITE_URL }],
  creator: "Sushil Sharma",
  publisher: "Sushil Sharma",
  alternates: {
    canonical: SITE_URL,
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Sushil Sharma — Portfolio",
    title: "Sushil Sharma | Senior Frontend Developer | React, Next.js & BaaS Engineer",
    description:
      "Senior Frontend Developer specializing in React, Next.js, Supabase, Firebase, and scalable BaaS architectures. 6+ years of experience building high-performance web applications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sushil Sharma | Senior Frontend Developer",
    description:
      "Senior Frontend Developer specializing in React, Next.js, Supabase, Firebase, and modern BaaS architectures. Available for hire.",
    creator: "@sushilsharma",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sushil Sharma",
  jobTitle: "Senior Frontend Developer",
  url: SITE_URL,
  email: "sushiluideveloper@gmail.com",
  description:
    "Senior Frontend Developer with 6+ years of experience specializing in React, Next.js, TypeScript, and Backend-as-a-Service platforms including Supabase and Firebase.",
  knowsAbout: [
    "React.js",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "Firebase",
    "Backend-as-a-Service (BaaS)",
    "REST APIs",
    "Authentication Systems",
    "Web Performance Optimization",
    "React Native",
    "GSAP Animations",
    "Framer Motion",
    "Serverless Architecture",
    "Real-time Databases",
  ],
  sameAs: [
    "https://www.linkedin.com/in/sushil-sharma-ui-developer",
    "https://github.com/sushilsharma",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "Organization",
    name: "Self-taught Developer",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sushil Sharma — Portfolio",
  url: SITE_URL,
  description:
    "Portfolio of Sushil Sharma, a Senior Frontend Developer specializing in React, Next.js, and BaaS platforms.",
  author: {
    "@type": "Person",
    name: "Sushil Sharma",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preload" href="/fonts/matangi-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/gurvaco-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/BastligaOne.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <CSPostHogProvider>
          <ClientSideLayout>{children}</ClientSideLayout>
          <LazyChatInterface />
        </CSPostHogProvider>
        <MicrosoftClarity />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
