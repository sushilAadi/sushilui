'use client';
import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import TestimonialsEditorial from '@/components/ui/editorial-testimonial'
import CompanyTestimonials from '@/components/ui/twitter-testimonial-cards'
import { companyDetails } from '@/utils'

const Testimonial = () => {
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
  const headlineWords = "Where professional experience meets proven success, validated by industry peers and clients.".split(" ");

  return (
    <section ref={sectionRef} className="flex w-full border-t border-gray-100" aria-label="Core offerings">
      {/* LEFT GUTTER - Matching contact page */}
      <div className="hidden md:flex  w-16 flex-col items-center border-r border-gray-100 py-10 md:w-24 ">

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col overflow-hidden">
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
              BUILDING TRUST & EXPERTISE
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

        {/* 50/50 Split Layout - Responsive */}
        <section className="my-8 container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Part - Heading/Content (50%) */}

            <div className="flex items-center justify-center">
              <TestimonialsEditorial />
            </div>

            {/* Right Part - Company Details (50%) */}
            <div className="flex items-center justify-center py-8 lg:py-0">
              <CompanyTestimonials companies={companyDetails} />
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default Testimonial