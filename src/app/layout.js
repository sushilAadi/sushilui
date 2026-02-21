import { CSPostHogProvider } from "@/components/PostHogProvider";
import ClientSideLayout from '@/components/ClientSideLayout';
import "./globals.css";
import LazyChatInterface from '@/components/LazyChatInterface';
import MicrosoftClarity from '@/components/MicrosoftClarity';

export const metadata = {
  title: "Sushil Sharma - Frontend Developer",
  description: "Portfolio of Sushil Sharma, a skilled frontend developer specializing in React, Next.js, and creating beautiful, high-performance web applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="preload" href="/fonts/matangi-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/gurvaco-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/BastligaOne.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <CSPostHogProvider>
          <ClientSideLayout>{children}</ClientSideLayout>
          <LazyChatInterface />
        </CSPostHogProvider>
        <MicrosoftClarity />
      </body>
    </html>
  );
}