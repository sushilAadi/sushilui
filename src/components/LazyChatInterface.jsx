'use client';

import dynamic from 'next/dynamic';

const ChatInterface = dynamic(
  () => import('@/components/chat-interface').then(mod => mod.ChatInterface),
  { ssr: false }
);

export default function LazyChatInterface() {
  return <ChatInterface />;
}
