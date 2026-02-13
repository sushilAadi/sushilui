"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// Staggered text reveal - each character animates in
export const AnimatedText = ({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  duration = 0.5,
  as: Component = "h1",
  animationType = "fadeUp", // fadeUp, fadeIn, slideIn, blur
}) => {
  const characters = text.split("");

  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 50 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: delay + i * staggerDelay,
          duration: duration,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }),
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: (i) => ({
        opacity: 1,
        transition: {
          delay: delay + i * staggerDelay,
          duration: duration,
        },
      }),
    },
    slideIn: {
      hidden: { opacity: 0, x: -20 },
      visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
          delay: delay + i * staggerDelay,
          duration: duration,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }),
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: (i) => ({
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          delay: delay + i * staggerDelay,
          duration: duration,
        },
      }),
    },
  };

  const selectedVariant = variants[animationType];

  return (
    <Component className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={selectedVariant}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </Component>
  );
};

// Word-by-word animation
export const AnimatedWords = ({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.08,
  duration = 0.5,
  as: Component = "h1",
}) => {
  const words = text.split(" ");

  return (
    <Component className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 30, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + index * staggerDelay,
            duration: duration,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
};

// Fade up animation wrapper
export const FadeUp = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
  y = 40,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scale and fade animation
export const ScaleFade = ({
  children,
  delay = 0,
  duration = 0.8,
  className = "",
  scale = 0.8,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Reveal from direction
export const RevealFromDirection = ({
  children,
  direction = "bottom", // top, bottom, left, right
  delay = 0,
  duration = 0.8,
  className = "",
}) => {
  const directionMap = {
    top: { y: -100, x: 0 },
    bottom: { y: 100, x: 0 },
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Floating animation (continuous)
export const Float = ({
  children,
  className = "",
  duration = 3,
  y = 10,
  delay = 0,
}) => {
  return (
    <motion.div
      animate={{
        y: [-y, y, -y],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Parallax wrapper - moves based on scroll
export const Parallax = ({ children, className = "", speed = 0.5 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

// Scroll-triggered reveal
export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  y = 50,
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Magnetic hover effect
export const MagneticHover = ({ children, className = "", strength = 0.3 }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * strength;
    const y = (clientY - top - height / 2) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transition: "transform 0.3s ease-out" }}
    >
      {children}
    </motion.div>
  );
};

// Slide reveal with overflow hidden (doesn't crop text)
export const ClipReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  direction = "bottom", // top, bottom, left, right
}) => {
  const directionMap = {
    bottom: { y: "100%" },
    top: { y: "-100%" },
    left: { x: "-100%" },
    right: { x: "100%" },
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ ...directionMap[direction], opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{
          delay,
          duration,
          ease: [0.77, 0, 0.175, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Stagger container for children
export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
  delay = 0,
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger item (use inside StaggerContainer)
export const StaggerItem = ({
  children,
  className = "",
  y = 30,
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Glow pulse animation
export const GlowPulse = ({
  children,
  className = "",
  color = "rgba(239, 68, 68, 0.5)",
}) => {
  return (
    <motion.div
      animate={{
        boxShadow: [
          `0 0 20px ${color}`,
          `0 0 60px ${color}`,
          `0 0 20px ${color}`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Line draw animation
export const LineReveal = ({
  className = "",
  delay = 0,
  duration = 1,
  direction = "horizontal", // horizontal, vertical
  color = "#ef4444",
  thickness = 2,
}) => {
  const isHorizontal = direction === "horizontal";

  return (
    <motion.div
      initial={{
        scaleX: isHorizontal ? 0 : 1,
        scaleY: isHorizontal ? 1 : 0
      }}
      animate={{ scaleX: 1, scaleY: 1 }}
      transition={{
        delay,
        duration,
        ease: [0.77, 0, 0.175, 1],
      }}
      style={{
        backgroundColor: color,
        height: isHorizontal ? thickness : "100%",
        width: isHorizontal ? "100%" : thickness,
        transformOrigin: isHorizontal ? "left" : "top",
      }}
      className={className}
    />
  );
};
