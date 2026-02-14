"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { LayoutGroup, motion, useScroll, useTransform } from "framer-motion";
import bagImage from "@/images/bag.webp";
import person from "@/images/person.png";
import Image from "next/image";
import "./home.css";
import LetterSwapPingPong from "@/components/fancy/text/letter-swap-pingpong-anim";
import SectionThree from "@/Features/Home/SectionThree";
import Service from "@/Features/Home/Service";
import ScrollRevealParagraph from "@/components/smoothui/ui/ScrollRevealParagraph";
import { LogoStepper } from "@/components/logoStepper";
import { logos } from "@/utils";
import { Highlighter } from "@/components/ui/highlighter";
import MyWork from "@/Features/Home/MyWork/MyWork";
import MyWorks from "@/Features/Home/MyWork/MyWorks";
import Testimonial from "@/Features/Home/Testimonial/page";
import ContactForm from "@/Features/Home/contact/page";
import {
  AnimatedText,
  FadeUp,
  ScaleFade,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  Float,
} from "@/components/animations/HeroAnimations";


const Home = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  // Parallax effect for hero - starts immediately and responds through scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Separate scroll progress for text elements - more sensitive
  const { scrollYProgress: textScrollProgress } = useScroll({
    offset: ["start start", "400px start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.7]);

  // Individual parallax for each text element - using textScrollProgress for quicker response
  const nameY = useTransform(textScrollProgress, [0, 1], [0, 120]);       // Fastest - moves 120px
  const frontendY = useTransform(textScrollProgress, [0, 1], [0, 60]);    // Medium - moves 60px
  const developerY = useTransform(textScrollProgress, [0, 1], [0, 25]);   // Slowest - moves 25px

  // Parallax for second section text - responds to deeper scroll
  const { scrollYProgress: sectionTwoProgress } = useScroll({
    offset: ["200px start", "800px start"],
  });
  const webMobileY = useTransform(sectionTwoProgress, [0, 1], [0, 50]);       // Moves down fastest
  const architectY = useTransform(sectionTwoProgress, [0, 1], [0, 35]);       // Moves down medium
  const descriptionY = useTransform(sectionTwoProgress, [0, 1], [0, 20]);     // Moves down slowest

  useEffect(() => {
    // Page is now ready - no sliding animation
    gsap.set(containerRef.current, { y: "0%" });
  }, []);

  const description =
    "I build scalable web and mobile applications using React, Next.js, and React Native, specializing in modular architecture and exceptional user experience.";

  return (
    <LayoutGroup>
      <div
        ref={containerRef}
        className="min-h-screen"
      >
        <section
          id="home"
          ref={heroRef}
          className="h-[35vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh] relative overflow-visible "
        >
          {/* Animated background with parallax */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${bagImage.src})`,
              y: backgroundY,
            }}
          />

          {/* Animated overlay with gradient fade at bottom */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(220, 38, 38, 0.4) 0%, rgba(220, 38, 38, 0.4) 70%, rgba(220, 38, 38, 0) 100%)",
              opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0.5]),
            }}
          />

          {/* Responsive text with staggered animations and individual parallax */}
          <div className="absolute frontendStyling bottom-[-30px] md:bottom-[-60px] left-1/2 -translate-x-1/2 z-10">
            {/* Name with character animation + parallax (fastest) */}
            <motion.div style={{ y: nameY }}>
              <AnimatedText
                text="Sushil sharma"
                className="text-white text-[clamp(12px,8vw,200px)] font-cursive"
                delay={0.3}
                staggerDelay={0.04}
                duration={0.5}
                animationType="fadeUp"
              />
            </motion.div>

            {/* FRONTEND with dramatic reveal + parallax (medium) */}
            <motion.div style={{ y: frontendY }}>
              <FadeUp delay={0.6} duration={0.8} y={40}>
                <h1 className="font-custom text-[clamp(12px,20vw,400px)] text-white leading-none mb-0">
                  FRONTEND
                </h1>
              </FadeUp>
            </motion.div>

            {/* DEVELOPER with slide animation + parallax (slowest) */}
            <motion.div style={{ y: developerY }}>
              <FadeUp delay={1.2} duration={0.6} y={20}>
                <h1 className="font-custom developerText text-base sm:text-xl md:text-2xl lg:text-3xl text-red-600 text-right mr-[8px] sm:mr-[15px] md:mr-[25px] lg:mr-[30px]">
                  DEVELOPER
                </h1>
              </FadeUp>
            </motion.div>
          </div>

          {/* Person image with scale and float animation */}
          <div className="absolute bottom-[-180px] sm:bottom-[-280px] md:bottom-[-400px] lg:bottom-[-595px] left-1/2 -translate-x-1/2 z-20">
            <ScaleFade delay={0.8} duration={1} scale={0.9}>
              <Float duration={4} y={8}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={person}
                    width={500}
                    height={800}
                    className="object-contain w-[180px] sm:w-[280px] md:w-[380px] lg:w-[500px] h-auto"
                    alt="Person"
                    priority
                  />
                </motion.div>
              </Float>
            </ScaleFade>
          </div>

          {/* Decorative animated elements */}
          <motion.div
            className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full hidden lg:block"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-20 right-20 w-3 h-3 bg-red-400 rounded-full hidden lg:block"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-white rounded-full hidden lg:block"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </section>
        <section className="relative container overflow-hidden mx-auto p-4 sm:p-6 lg:p-8 pt-[200px] sm:pt-[300px] md:pt-[420px] lg:pt-[170px]">
          {/* Responsive text layout */}
          <div className="relative left-1/2 -translate-x-1/2 z-10 w-full px-4 sm:px-6 lg:px-0">
            {/* Mobile/Tablet: Stack vertically below image, Desktop: Side by side */}
            <div className="flex flex-col lg:flex-row lg:justify-between gap-2">
              <StaggerContainer staggerDelay={0.15} delay={1.4} className="">
                <StaggerItem>
                  <motion.h1
                    style={{ y: webMobileY }}
                    className="text-[20px] font-custom sm:text-[26px] md:text-[32px] lg:text-[60px] max-w-full lg:max-w-[400px] text-center lg:text-left whitespace-nowrap"
                  >
                    Web & Mobile
                  </motion.h1>
                </StaggerItem>
                <StaggerItem>
                  <motion.h1
                    style={{ y: architectY }}
                    className="text-[20px] sm:text-[26px] md:text-[32px] lg:text-[60px] max-w-full lg:max-w-[400px] text-center lg:text-left whitespace-nowrap"
                  >
                    Frontend architect
                  </motion.h1>
                </StaggerItem>
                <StaggerItem>
                  <div className="mt-8 w-full">
                    <LogoStepper
                      logos={logos}
                      direction="loop"
                      animationDelay={1.2}
                      animationDuration={0.6}
                      visibleCount={5}
                    />
                  </div>
                </StaggerItem>
              </StaggerContainer>

              {/* Spacer for person image - only on large desktop */}
              <div className="hidden lg:block w-[400px] shrink-0"></div>

              <motion.div style={{ y: descriptionY }} className="max-w-full lg:max-w-[400px]">
                <ScrollReveal delay={0.2} y={30}>
                  <ScrollRevealParagraph
                    paragraph={description}
                    className="text-foreground text-[16px] md:text-[18px] lg:text-[24px] font-secondary text-center lg:text-left"
                  />
                </ScrollReveal>
              </motion.div>
            </div>
          </div>

          {/* Animated scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2"
              animate={{ borderColor: ["rgba(0,0,0,0.3)", "rgba(239,68,68,0.5)", "rgba(0,0,0,0.3)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-1.5 bg-red-500 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <motion.span
              className="text-xs text-foreground/50 tracking-widest uppercase"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll
            </motion.span>
          </motion.div>
        </section>
        
        <SectionThree />
        <div id="services">
          <Service />
        </div>
        <div id="work">
          <MyWorks/>
        </div>
        <Testimonial/>
        <div id="contact">
          <ContactForm/>
        </div>
        {/* <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <LetterSwapPingPong
            label="WORK"
            className="text-[100px] font-custom text-red-600 cursor-pointer justify-start"
          >
          </LetterSwapPingPong>
        </div> */}
      </div>
    </LayoutGroup>
  );
};

export default Home;
