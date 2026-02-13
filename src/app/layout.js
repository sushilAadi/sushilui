import { CSPostHogProvider } from "@/components/PostHogProvider";
import ClientSideLayout from '@/components/ClientSideLayout';
import "./globals.css";
import 'animate.css';
import { ChatInterface } from '@/components/chat-interface';
import MicrosoftClarity from '@/components/MicrosoftClarity';

export const metadata = {
  title: "Sushil Sharma - Frontend Developer",
  description: "Portfolio of Sushil Sharma, a skilled frontend developer specializing in React, Next.js, and creating beautiful, high-performance web applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Matangi:wght@300..900&display=swap" rel="stylesheet"/>
        
      </head>
      <body suppressHydrationWarning className="antialiased">
        <CSPostHogProvider>
          <ClientSideLayout>{children}
          <ChatInterface /></ClientSideLayout>
        </CSPostHogProvider>
        <MicrosoftClarity />
      </body>
    </html>
  );
}