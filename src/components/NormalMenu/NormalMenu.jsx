"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import styles from "./NormalMenu.module.css";

gsap.registerPlugin(CustomEase);

const defaultLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Expertise", href: "#expertise" },
  { label: "Agency", href: "#agency" },
  { label: "Contact", href: "#contact" },
];

const defaultSocials = [
  {
    title: "Location",
    items: ["9 quao Androe Rockfield", "69001 Ontario", "Canada"],
    contacts: ["sushiluideveloper@gmail.com"],
  },
  {
    title: "Social",
    items: ["Instagram", "LinkedIn", "Twitter", "Facebook"],
    contacts: ["01 62 31 82 42"],
  },
];

// Smooth scroll to element with GSAP animation
const smoothScrollTo = (targetId) => {
  const target = document.querySelector(targetId);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;

  // Use GSAP to animate scroll position
  const scrollObj = { y: startPosition };
  gsap.to(scrollObj, {
    y: targetPosition,
    duration: 1.2,
    ease: "power3.inOut",
    onUpdate: () => {
      window.scrollTo(0, scrollObj.y);
    },
  });
};

export default function NormalMenu({
  logo = "Sushil",
  links = defaultLinks,
  socials = defaultSocials,
  videoSrc,
  headerText = "Avaro",
  accentColor = "burlywood",
  onLinkClick,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const socialsRef = useRef([]);
  const videoWrapperRef = useRef(null);
  const headerRef = useRef(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      CustomEase.create(
        "hop",
        "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
      );
      hasInitialized.current = true;
    }
  }, []);

  // Split header text into spans for animation
  const splitText = headerText.split("").map((char, i) => (
    <span key={i} className={styles.headerChar}>
      {char === " " ? "\u00A0\u00A0" : char}
    </span>
  ));

  const openMenu = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsOpen(true);

    const menu = menuRef.current;
    const linkElements = linksRef.current.filter(Boolean);
    const socialElements = socialsRef.current.filter(Boolean);
    const videoWrapper = videoWrapperRef.current;
    const headerSpans = headerRef.current?.querySelectorAll(`.${styles.headerChar}`);

    gsap.to(menu, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "hop",
      duration: 1.5,
      onStart: () => {
        menu.style.pointerEvents = "all";
      },
      onComplete: () => {
        setIsAnimating(false);
      },
    });

    gsap.to(linkElements, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      delay: 0.85,
      duration: 1,
      ease: "power3.out",
    });

    gsap.to(socialElements, {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      delay: 0.85,
      duration: 1,
      ease: "power3.out",
    });

    if (videoWrapper) {
      gsap.to(videoWrapper, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "hop",
        duration: 1.5,
        delay: 0.5,
      });
    }

    if (headerSpans) {
      gsap.to(headerSpans, {
        rotateY: 0,
        stagger: 0.05,
        delay: 0.75,
        duration: 1.5,
        ease: "power4.out",
      });
      gsap.to(headerSpans, {
        y: 0,
        scale: 1,
        stagger: 0.05,
        delay: 0.5,
        duration: 1.5,
        ease: "power4.out",
      });
    }
  }, [isAnimating]);

  const closeMenu = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const menu = menuRef.current;
    const linkElements = linksRef.current.filter(Boolean);
    const socialElements = socialsRef.current.filter(Boolean);
    const videoWrapper = videoWrapperRef.current;
    const headerSpans = headerRef.current?.querySelectorAll(`.${styles.headerChar}`);

    gsap.to(menu, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      ease: "hop",
      duration: 1.5,
      onComplete: () => {
        menu.style.pointerEvents = "none";
        gsap.set(menu, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        });
        gsap.set(linkElements, { y: 30, opacity: 0 });
        gsap.set(socialElements, { y: 30, opacity: 0 });
        if (videoWrapper) {
          gsap.set(videoWrapper, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          });
        }
        if (headerSpans) {
          gsap.set(headerSpans, {
            y: 500,
            rotateY: 90,
            scale: 0.75,
          });
        }
        setIsAnimating(false);
        setIsOpen(false);
      },
    });
  }, [isAnimating]);

  const handleToggle = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const handleLinkClick = (link, e) => {
    e.preventDefault();

    if (onLinkClick) {
      onLinkClick(link, e);
    }

    // Close menu and start scrolling simultaneously for smoother feel
    closeMenu();

    // Small delay to let menu start closing, then scroll begins
    setTimeout(() => {
      smoothScrollTo(link.href);
    }, 300);
  };

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        type="button"
        className={`${styles.menuToggle} ${isOpen ? styles.opened : styles.closed}`}
        onClick={handleToggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        style={{ "--accent-color": accentColor }}
      >
        <div className={styles.menuToggleIcon}>
          <div className={styles.hamburger}>
            <div className={styles.menuBar} data-position="top" />
            <div className={styles.menuBar} data-position="bottom" />
          </div>
        </div>
        <div className={styles.menuCopy}>
          <p>Menu</p>
        </div>
      </button>

      {/* Full Screen Menu */}
      <div className={styles.menu} ref={menuRef}>
        <div className={`${styles.col} ${styles.col1}`}>
          <div className={`font-custom ${styles.menuLogo}`} >
            <a href="#">{logo}</a>
          </div>
          <div className={styles.links}>
            {links.map((link, index) => (
              <div
                key={link.label}
                className={styles.link}
                ref={(el) => (linksRef.current[index] = el)}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(link, e)}
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>
          {videoSrc && (
            <div className={styles.videoWrapper} ref={videoWrapperRef}>
              <video autoPlay muted loop playsInline>
                <source src={videoSrc} type="video/mp4" />
              </video>
            </div>
          )}
        </div>

        <div className={`${styles.col} ${styles.col2}`}>
          <div className={styles.socials}>
            {socials.map((section, sectionIndex) => (
              <div key={section.title} className={styles.subCol}>
                <p
                  ref={(el) =>
                    (socialsRef.current[sectionIndex * 10] = el)
                  }
                >
                  {section.title}
                </p>
                {section.items?.map((item, itemIndex) => (
                  <p
                    key={item}
                    ref={(el) =>
                      (socialsRef.current[
                        sectionIndex * 10 + itemIndex + 1
                      ] = el)
                    }
                  >
                    {item}
                  </p>
                ))}
                {section.links?.map((link, linkIndex) => (
                  <p
                    key={link.label}
                    ref={(el) =>
                      (socialsRef.current[
                        sectionIndex * 10 + (section.items?.length || 0) + linkIndex + 1
                      ] = el)
                    }
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                    >
                      {link.label}
                    </a>
                  </p>
                ))}
                {section.contacts?.length > 0 && <br />}
                {section.contacts?.map((contact, contactIndex) => (
                  <p
                    key={contact}
                    ref={(el) =>
                      (socialsRef.current[
                        sectionIndex * 10 + (section.items?.length || 0) + (section.links?.length || 0) + contactIndex + 1
                      ] = el)
                    }
                  >
                    {contact}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.header} ref={headerRef}>
            <h1>{splitText}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
