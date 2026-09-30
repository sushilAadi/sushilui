import { CSPostHogProvider } from "@/components/PostHogProvider";
import ClientSideLayout from '@/components/ClientSideLayout';
import "./globals.css";
import LazyChatInterface from '@/components/LazyChatInterface';
import MicrosoftClarity from '@/components/MicrosoftClarity';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { Analytics } from "@vercel/analytics/next";

const SITE_URL = "https://sushildev.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sushil Sharma | Front-end Developer | React, Next.js & WhatsApp Agents",
  description:
    "Sushil Sharma is a Front-end Developer with 6+ years of experience building scalable web and mobile applications with React, Next.js and React Native, plus WhatsApp Cloud API agents with Supabase. Available for hire.",
  keywords: [
    "Sushil Sharma",
    "Front-end Developer",
    "React Developer",
    "Next.js Developer",
    "React Native Developer",
    "Supabase",
    "WhatsApp Cloud API",
    "WhatsApp Chatbot Developer",
    "Tailwind CSS",
    "Web Performance Optimization",
    "Web Accessibility",
    "JavaScript Developer",
    "Hire Front-end Developer",
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
    title: "Sushil Sharma | Front-end Developer | React, Next.js & WhatsApp Agents",
    description:
      "Front-end Developer specializing in React, Next.js and React Native, with WhatsApp Cloud API agents built on Supabase. 6+ years of experience building high-performance web applications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sushil Sharma | Front-end Developer",
    description:
      "Front-end Developer specializing in React, Next.js and React Native, with WhatsApp Cloud API agents built on Supabase. Available for hire.",
    creator: "@sushilsharma",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sushil Sharma",
  jobTitle: "Front-end Developer",
  url: SITE_URL,
  email: "sushiluideveloper@gmail.com",
  description:
    "Front-end Developer with 6+ years of experience building React.js, Next.js and React Native applications for fintech, e-commerce and SaaS, with full-stack work in Supabase, WhatsApp Cloud API and AI/LLM integrations.",
  knowsAbout: [
    "React.js",
    "Next.js",
    "JavaScript",
    "Tailwind CSS",
    "Supabase",
    "Firebase",
    "Backend-as-a-Service (BaaS)",
    "REST APIs",
    "WhatsApp Cloud API",
    "Web Performance Optimization",
    "Web Accessibility (WCAG 2.1 AA)",
    "React Native",
    "AI/LLM API Integration",
  ],
  sameAs: [
    "https://www.linkedin.com/in/sushil-sharma-ui-developer",
    "https://github.com/sushilsharma",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Guwahati",
    addressRegion: "Assam",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "New Horizon College of Engineering",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sushil Sharma — Portfolio",
  url: SITE_URL,
  description:
    "Portfolio of Sushil Sharma, a Front-end Developer specializing in React, Next.js and WhatsApp Cloud API agents.",
  author: {
    "@type": "Person",
    name: "Sushil Sharma",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <GoogleAnalytics />
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
        <Analytics />
      </body>
    </html>
  );
}
