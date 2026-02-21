'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const ChatInterface = dynamic(
  () => import('@/components/chat-interface').then(mod => mod.ChatInterface),
  { ssr: false }
);

export default function LazyChatInterface() {
  const pathname = usePathname();
  if (pathname?.startsWith('/dashboard')) return null;
  return <ChatInterface />;
}
