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
        { label: "Download CV", href: "/Sushil-Sharma-Frontend-Developer-Resume.pdf" },
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
          <footer className="bg-black text-white py-10 px-6 md:px-12">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-lg font-semibold">Sushil Sharma</p>
                <p className="text-sm text-gray-400">Senior Frontend Developer</p>
              </div>
              <nav aria-label="Footer links" className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <a href="https://sushildev.vercel.app" className="hover:text-white transition-colors">Portfolio</a>
                <a href="https://www.linkedin.com/in/sushil-sharma-ui-developer" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              </nav>
              <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Sushil Sharma</p>
            </div>
          </footer>
        </>
      )}
    </>
  );
}
