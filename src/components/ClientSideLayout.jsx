'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import LoadingAnimation from './LoadingAnimation';
import SmoothScroll from './SmoothScroll';
import NormalMenu from './NormalMenu';

export default function ClientSideLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  if (isDashboard) {
    return <>{children}</>;
  }

  const handleExitStart = () => {
    // Show content IMMEDIATELY when loading reaches 100% (before exit animation)
    setShowContent(true);
  };

  const handleLoadingComplete = () => {
    // Remove loading screen after exit animation finishes
    setLoading(false);
  };

  const menuLinks = [
    { label: "Home", href: "#home" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  const menuSocials = [
    {
      title: "Contact",
      items: ["sushiluideveloper@gmail.com"],
      contacts: [],
    },
    {
      title: "Social",
      items: [],
      contacts: [],
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/sushil-sharma-ui-developer" },
      ],
    },
  ];

  return (
    <>
      {loading && (
        <LoadingAnimation
          onExitStart={handleExitStart}
          onComplete={handleLoadingComplete}
        />
      )}
      {showContent && (
        <>
          <NormalMenu
            logo="Sushil"
            headerText="Portfolio"
            accentColor="#ef4444"
            links={menuLinks}
            socials={menuSocials}
          />
          <SmoothScroll>{children}</SmoothScroll>
        </>
      )}
    </>
  );
}
