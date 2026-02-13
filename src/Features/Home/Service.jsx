'use client';
import React, { useRef } from 'react'
import Offerings from './Offerings';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';


const Service = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  // Parallax for the sparkle
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const sparkleRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const sparkleScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  // Split text for word animation
  const headlineWords = "From concept to deployment, building products that perform.".split(" ");

  return (
    <section
      ref={sectionRef}
      className="p-4 sm:p-6 lg:p-8 flex flex-col"
      aria-label="Core offerings"
    >
      <div ref={headerRef} className="flex flex-col lg:flex-row gap-4 items-start container mx-auto">
        {/* Animated sparkle + label */}
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="sparkle mr-4"
            style={{ rotate: sparkleRotate, scale: sparkleScale }}
          />
          <motion.h3
            className="font-custom text-[30px] mt-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            MY CORE OFFERINGS
          </motion.h3>
        </motion.div>

        {/* Animated headline - word by word */}
        <h1 className='font-custom text-[clamp(24px,5vw,60px)] flex flex-wrap'>
          {headlineWords.map((word, index) => (
            <motion.span
              key={index}
              className="mr-[0.25em]"
              initial={{ opacity: 0, y: 40, rotateX: -90 }}
              animate={isHeaderInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3 + index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
      </div>

      {/* Animated line separator */}
    

      <div className="my-4">
        <Offerings />
      </div>
    </section>
  )
}

export default Service