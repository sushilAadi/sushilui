"use client";
import React, { useState, useRef, useEffect } from "react";
import { features } from "@/utils";
import { ArrowUpRight } from "lucide-react";
import { LayeredText } from "@/components/ui/layered-text";
import { motion, useScroll, useTransform, useInView, useMotionValueEvent } from "framer-motion";

const PosterOfferings = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const isListInView = useInView(listRef, { once: true, margin: "-50px" });

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#F0F0F0] text-black selection:bg-red-600 selection:text-white font-sans mx-auto"
    >
      {/* --- GLOBAL GRAIN TEXTURE --- */}
      <div
        className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-[0.08] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 md:px-8 pt-12 lg:pt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
          {/* --- LEFT COLUMN: THE LIST --- */}
          <div ref={listRef} className="lg:col-span-7 flex flex-col relative">
            {/* Header with animated border */}
            <div className="mb-8 pb-4 flex justify-between items-end relative">
              <motion.h3
                className="font-black text-xl tracking-tighter uppercase"
                initial={{ opacity: 0, x: -30 }}
                animate={isListInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Services
              </motion.h3>
              <motion.span
                className="font-mono text-xs font-bold bg-black text-white px-2 py-1"
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={isListInView ? { opacity: 1, scale: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                EST. 2019
              </motion.span>
              {/* Animated border line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-black"
                initial={{ scaleX: 0 }}
                animate={isListInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ originX: 0 }}
              />
            </div>

            <div className="flex flex-col">
              {features.map((feature, index) => (
                <ServiceItem
                  key={index}
                  feature={feature}
                  index={index}
                  isActive={activeIndex === index}
                  setActive={setActiveIndex}
                  isInView={isListInView}
                />
              ))}
            </div>
          </div>

          {/* --- RIGHT COLUMN: THE POSTER (Desktop Only) --- */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-[50px]">
            <div className="relative w-full aspect-[9/12] border-4 border-black bg-black p-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
              {/* Container */}
              <div className="relative h-full w-full overflow-hidden bg-neutral-900">
                {features.map((feature, index) => (
                  <PosterImage
                    key={index}
                    feature={feature}
                    isActive={activeIndex === index}
                    index={index}
                  />
                ))}

                {/* Scanlines */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[20] bg-[length:100%_2px,3px_100%]" />
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* MY WORK section with entrance animation */}
      <motion.section
        className="flex justify-end mt-4"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="triangle"></div>
        <motion.div
          className="bg-white h-[100px] w-[360px] flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center">
            <motion.div
              className="sparkle mr-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <h3 className="font-custom text-[30px] mt-3">MY WORK</h3>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

const MobileImageCarousel = ({ images, isActive }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isActive && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);

      return () => clearInterval(interval);
    } else {
      setCurrentImageIndex(0);
    }
  }, [isActive, images.length]);

  return (
    <div className="lg:hidden w-full aspect-video relative mt-2 border-2 border-black bg-black overflow-hidden rounded-sm">
      <div className="absolute inset-0">
        {images.map((image, imgIndex) => (
          <motion.div
            key={imgIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isActive && currentImageIndex === imgIndex ? 1 : 0,
              scale: isActive && currentImageIndex === imgIndex ? 1 : 1.2,
              filter: isActive && currentImageIndex === imgIndex ? "blur(0px)" : "blur(20px)",
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ zIndex: currentImageIndex === imgIndex ? 2 : 1 }}
          >
            {/* Background blurred image */}
            <motion.img
              src={image?.src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover grayscale contrast-125"
              style={{ filter: "blur(16px)" }}
              initial={{ scale: 1.15 }}
              animate={{ scale: isActive ? 1.1 : 1.15 }}
              transition={{ duration: 0.8 }}
            />
            {/* Foreground image */}
            <motion.img
              src={image?.src}
              alt=""
              className="absolute inset-0 h-full w-full object-contain"
              initial={{ scale: 1.05 }}
              animate={{ scale: isActive ? 1 : 1.05 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ServiceItem = ({ feature, index, isActive, setActive, isInView }) => {
  const { title, images } = feature;

  // Styling constants for the reveal effect
  const imageContainerClass =
    "absolute right-0 top-1/2 -translate-y-1/2 z-40 h-24 w-20 pointer-events-none";
  const imageEffectBase =
    "absolute inset-0 w-full h-full object-contain border-2 border-black bg-white grayscale transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";

  return (
    <motion.div
      className="group relative border-b border-black/20 last:border-none overflow-visible"
      onMouseEnter={() => setActive(index)}
      onClick={() => setActive(index)}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.4 + index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Background Active State with smoother animation */}
      <motion.div
        className="absolute inset-0 bg-white z-0"
        initial={false}
        animate={{
          scaleX: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ originX: 0 }}
      />

      <button
        className="relative z-10 w-full text-left py-6 md:py-8 px-4 focus:outline-none overflow-visible"
        aria-expanded={isActive}
      >
        <div className="flex items-baseline justify-between relative">
          {/* Index Number with animation */}
          <motion.span
            className="font-mono text-sm md:text-base mr-4"
            initial={false}
            animate={{
              color: isActive ? "#dc2626" : "#737373",
              fontWeight: isActive ? 700 : 400,
              scale: isActive ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {(index + 1).toString().padStart(2, "0")}
          </motion.span>

          {/* --- TITLE & HOVER IMAGES CONTAINER --- */}

          <div className="flex-1 relative pr-8">
            {/* Both elements rendered, visibility controlled by opacity to prevent flicker */}
            <div className="relative">
              {/* Default title - hidden when active */}
              <h2
                className={`relative z-30 text-2xl md:text-4xl lg:text-5xl font-custom font-black uppercase transition-all duration-300 ${
                  isActive
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100 text-black group-hover:text-neutral-800 group-hover:opacity-40 group-hover:blur-[1px]"
                }`}
              >
                {title}
              </h2>

              {/* LayeredText - shown when active */}
              <div
                className={`absolute top-0 left-0 transition-all duration-300 ${
                  isActive ? "opacity-100 translate-x-2" : "opacity-0 pointer-events-none"
                }`}
              >
                <LayeredText
                  text={title}
                  className="relative z-30 text-2xl md:text-4xl lg:text-5xl font-custom font-black uppercase text-black"
                  layers={["#b0b0b0", "#d1d1d1", "#e7e7e7"]}
                  offsetX={2}
                  offsetY={2}
                  strokeWidth={2}
                  animate={isActive}
                />
              </div>
            </div>

            {/* --- HOVER REVEAL IMAGES --- */}
            {/* Only show if we have valid images */}
            {images && images.length >= 2 && (
              <>
                {/* Image 2 (Back - Rotated) */}
                <div
                  className={`${imageContainerClass} transition-all duration-500 delay-100 opacity-0 scale-50 rotate-0 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-12 group-hover:rotate-12`}
                >
                  <img
                    src={images[1].src}
                    alt={images[1].alt}
                    className={imageEffectBase}
                  />
                </div>

                {/* Image 1 (Front - Straight) */}
                <div
                  className={`${imageContainerClass} transition-all duration-500 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-6`}
                >
                  <img
                    src={images[0].src}
                    alt={images[0].alt}
                    className={imageEffectBase}
                  />
                </div>
              </>
            )}
          </div>

          {/* Arrow */}
          <ArrowUpRight
            className={`w-6 h-6 shrink-0 ml-4 transition-all duration-300 relative z-30 ${
              isActive
                ? "opacity-100 rotate-45 text-red-600"
                : "opacity-0 -translate-x-4 text-black"
            }`}
          />
        </div>

        {/* Description Reveal */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isActive
              ? "max-h-[500px] opacity-100 mt-4"
              : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-6 pl-8 md:pl-12 pr-2">
            <p className="text-sm font-matangi font-medium leading-relaxed text-neutral-800 tracking-tight max-w-lg">
              {feature.description}
            </p>

            <MobileImageCarousel images={feature.images} isActive={isActive} />
          </div>
        </div>
      </button>
    </motion.div>
  );
};

const PosterImage = ({ feature, isActive, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isActive && feature.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % feature.images.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    } else {
      setCurrentImageIndex(0); // Reset when not active
    }
  }, [isActive, feature.images.length]);

  return (
    <motion.div
      className="absolute inset-0"
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 1.1,
        zIndex: isActive ? 10 : 0,
      }}
      transition={{
        opacity: { duration: 0.5, ease: "easeInOut" },
        scale: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
    >
      {/* --- IMAGE CAROUSEL --- */}
      <div className="absolute inset-0">
        {feature.images.map((image, imgIndex) => (
          <motion.div
            key={imgIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isActive && currentImageIndex === imgIndex ? 1 : 0,
              // Thanos-style dust effect
              scale: isActive && currentImageIndex === imgIndex ? 1 : 1.2,
              filter: isActive && currentImageIndex === imgIndex ? "blur(0px)" : "blur(20px)",
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{
              // Ensure images are stacked for the fade effect
              zIndex: currentImageIndex === imgIndex ? 2 : 1,
            }}
          >
            {/* Background blurred image */}
            <motion.img
              src={image?.src}
              alt={feature.title}
              className="absolute inset-0 h-full w-full object-cover grayscale contrast-125"
              style={{ filter: "blur(16px)" }}
              initial={{ scale: 1.15 }}
              animate={{ scale: isActive ? 1.1 : 1.15 }}
              transition={{ duration: 0.8 }}
            />
            {/* Foreground image */}
            <motion.img
              src={image?.src}
              alt={feature.title}
              className="absolute inset-0 h-full w-full object-contain"
              initial={{ scale: 1.05 }}
              animate={{ scale: isActive ? 1 : 1.05 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        ))}
      </div>

      {/* --- TEXT OVERLAY --- */}
      <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black via-black/50 to-transparent z-10">
        <motion.h2
          className="text-white font-black text-5xl uppercase leading-[0.85] tracking-tighter break-words mb-2"
          initial={false}
          animate={{
            y: isActive ? 0 : 20,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {feature.title.split(" ")[0]} <br />
          <span className="text-red-500">
            {feature.title.split(" ").slice(1).join(" ")}
          </span>
        </motion.h2>
        <motion.div
          className="flex items-center gap-2 text-white/80 font-mono text-xs uppercase tracking-widest mt-4 border-t border-white/30 pt-4"
          initial={false}
          animate={{
            y: isActive ? 0 : 10,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <span>{feature.icon}</span>
          <span>Figure {index + 1}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PosterOfferings;
