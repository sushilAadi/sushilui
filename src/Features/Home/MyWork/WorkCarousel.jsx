'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Layers, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import posthog from "posthog-js";

// --- IMPORTS ---
// Assuming you installed Safari component similar to iPhone
import { Iphone } from '@/components/ui/iphone'; 
import { Safari } from '@/components/ui/safari'; 

// 1. THEMES
const colorThemes = [
  { id: 1, accent: '#111111', secondary: '#ff523b', primary: '#2563eb', bg: '#f4f4f5', techBg: '#172554' }, 
  { id: 2, accent: '#000000', secondary: '#ff0055', primary: '#7c3aed', bg: '#f3f4f6', techBg: '#2e1065' }, 
  { id: 3, accent: '#111111', secondary: '#00b8d4', primary: '#059669', bg: '#ecfdf5', techBg: '#064e3b' }, 
  { id: 4, accent: '#000000', secondary: '#9d4edd', primary: '#db2777', bg: '#fdf2f8', techBg: '#831843' }, 
  { id: 5, accent: '#111111', secondary: '#1a1a1a', primary: '#ea580c', bg: '#fff7ed', techBg: '#431407' }, 
];

const WorkCarousel = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentProject = projects[currentIndex];
  const nextIndex = (currentIndex + 1) % projects.length;
  const nextProject = projects[nextIndex];

  const theme = colorThemes[currentIndex % colorThemes.length];

  const getImageSrc = (img) => (typeof img === 'string' ? img : img.src);
  
  // Helper to determine if we show iPhone or Safari
  const isMobileApp = (category) => ["APP", "MOBILE", "REACT-NATIVE", "IOS", "ANDROID", "PWA"].includes(category?.toUpperCase());

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleJumpTo = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // --- ANIMATIONS ---
  
  // Description Text
  const textReveal = {
    hidden: { y: '100%', opacity: 0 },
    visible: { 
        y: '0%', 
        opacity: 1, 
        transition: { 
            delay: 0.5, // Wait for image + title to settle
            duration: 0.6, 
            ease: [0.22, 1, 0.36, 1] 
        } 
    },
    exit: { y: '-100%', opacity: 0, transition: { duration: 0.4 } }
  };

  // The Device/Image
  const imageParallax = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0, scale: 0.9 }),
    center: { 
        x: 0, 
        opacity: 1, 
        scale: 1, 
        transition: { duration: 0.8, ease: "circOut" } 
    },
    exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0, scale: 0.9, transition: { duration: 0.5 } })
  };

  return (
    <>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .text-stroke { -webkit-text-stroke: 1px rgba(0,0,0,0.08); color: transparent; }
          .bg-noise { background-image: url("https://www.transparenttextures.com/patterns/stardust.png"); opacity: 0.4; }
        `}
      </style>

      <div className="relative w-full flex flex-col lg:flex-row bg-white font-sans overflow-x-hidden text-gray-900">
        
        {/* ===========================
            LEFT PANEL (70%) - THE GALLERY
           =========================== */}
        <motion.div 
            animate={{ backgroundColor: theme.bg }}
            transition={{ duration: 0.8 }}
            className="w-full h-[75vh] lg:h-screen lg:w-[70%] relative shrink-0 overflow-hidden flex flex-col justify-center"
        >
          <div className="absolute inset-0 bg-noise pointer-events-none mix-blend-multiply"></div>

          {/* 1. BACKGROUND TITLE */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0 ">
            <AnimatePresence mode="popLayout">
              <motion.h1 
                  key={currentIndex}
                  initial={{ y: 150, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    transition: { 
                        duration: 0.8, 
                        ease: "easeOut",
                        // THIS DELAY ENSURES IMAGE REVEALS FIRST
                        delay: 0.4 
                    }
                  }}
                  exit={{ 
                    y: -150, 
                    opacity: 0,
                    transition: { duration: 0.3, ease: "easeIn" } 
                  }}
                  className="text-[clamp(5rem,15vw,20rem)] font-black leading-none tracking-tighter whitespace-nowrap uppercase opacity-100"
              >
                  {currentProject.projectName.split(" ")[0]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* 2. MAIN DEVICE MOCKUP */}
          <div className="relative z-20 w-full flex justify-center items-center h-[60%] lg:h-[70%]">
             <div className="scale-[0.6] md:scale-[0.8] lg:scale-100 transition-transform duration-500">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div 
                        key={currentIndex}
                        custom={direction}
                        variants={imageParallax}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="relative flex items-center justify-center"
                    >
                        {isMobileApp(currentProject.category) ? (
                           // --- MOBILE (iPhone) ---
                           <div className="w-[300px]"> 
                               <Iphone 
                                  src={getImageSrc(currentProject.image)} 
                                  className="size-full" 
                               />
                           </div>
                        ) : (
                           // --- DESKTOP (Safari) ---
                           <div className="w-[90vw] max-w-[750px]">
                               <Safari 
                                    url={currentProject.projectUrl || "google.com"}
                                    imageSrc={getImageSrc(currentProject.image)}
                                    className="shadow-2xl rounded-xl w-full h-full"
                               />
                           </div>
                        )}
                    </motion.div>
                </AnimatePresence>
             </div>
          </div>

          {/* 3. FOREGROUND DETAILS */}
          <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16 flex flex-col md:flex-row justify-between items-end z-30 pointer-events-none">
              <div className="pointer-events-auto max-w-md">
                  <div className="overflow-hidden mb-4">
                      <AnimatePresence mode="wait">
                        <motion.div key={currentIndex} variants={textReveal} initial="hidden" animate="visible" exit="exit">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-2 h-2 rounded-full bg-black"></span>
                                <span className="text-xs font-bold tracking-widest uppercase opacity-60">{currentProject.category}</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900">
                                {currentProject.projectName}
                            </h2>
                        </motion.div>
                      </AnimatePresence>
                  </div>
                  <div className="overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.p 
                            key={currentIndex} 
                            variants={textReveal} initial="hidden" animate="visible" exit="exit"
                            className="text-sm text-gray-600 leading-relaxed border-l-2 border-gray-300 pl-4"
                        >
                            {currentProject.description}
                        </motion.p>
                    </AnimatePresence>
                  </div>
              </div>
              <div className="pointer-events-auto mt-8 md:mt-0">
                {currentProject.projectUrl && (
                    <motion.a 
                        href={currentProject.projectUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-3 px-6 py-4 bg-gray-900 text-white rounded-full overflow-hidden hover:pr-8 transition-all duration-300"
                    >
                        <span className="relative z-10 text-sm font-bold tracking-widest uppercase">View Case Study</span>
                        <ArrowUpRight className="relative z-10 w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gray-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </motion.a>
                )}
              </div>
          </div>

          {/* 4. TOP NAVIGATION */}
          <div className="absolute top-0 left-0 w-full p-8 lg:p-12 flex justify-between items-start z-30">
             <div className="flex items-center gap-2">
                <div className="text-2xl font-black tracking-tighter">
                    <div className="flex items-center mb-8">
                        <div className="sparkle mr-4" />
                        <h3 className="font-custom text-[30px] mt-3">MY WORK</h3>
                    </div>
                </div>
             </div>
             <div className="flex gap-2">
                <button onClick={handlePrev} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 active:scale-95">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={handleNext} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 active:scale-95">
                    <ChevronRight size={20} />
                </button>
             </div>
          </div>
        </motion.div>

        {/* ===========================
            RIGHT PANEL (30%) - CONTROL CENTER
           =========================== */}
        <div className="w-full lg:w-[30%] flex flex-col lg:h-screen z-40 relative bg-[#1d1d1d] text-white">
          
          {/* TOP: LIST */}
          <div className="flex-1 p-8 lg:p-10 flex flex-col relative min-h-0">
             <div className="flex justify-between items-center mb-8 shrink-0">
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase opacity-50">Project Index</h3>
                <span className="text-xs font-mono opacity-50">{String(currentIndex + 1).padStart(2, '0')} / {projects.length}</span>
             </div>

             <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4 pr-2 mask-image-gradient">
                {projects.map((project, idx) => (
                    <div
                        key={project.id}
                        onClick={() => {
                          handleJumpTo(idx);
                          posthog.capture("project_card_clicked", {
                            project_name: project.projectName,
                            category: project.category,
                          });
                        }}
                        className={`group flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 border ${idx === currentIndex ? 'bg-white/10 border-white/10' : 'border-transparent hover:bg-white/5'}`}
                    >
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 relative">
                            <img src={getImageSrc(project.image)} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" alt=""/>
                            {idx === currentIndex && <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay"></div>}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <h4 className={`text-sm font-medium truncate transition-colors ${idx === currentIndex ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                {project.projectName}
                            </h4>
                            <p className="text-[10px] uppercase tracking-wider opacity-40">{project.category}</p>
                        </div>
                        {idx === currentIndex && (
                             <motion.div layoutId="activeDot" className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />
                        )}
                    </div>
                ))}
             </div>
          </div>

          {/* BOTTOM: INFO GRID */}
          <div className="h-[35%] min-h-[300px] grid grid-cols-2 border-t border-white/10 shrink-0">
             
             {/* Tech Stack Box */}
             <motion.div 
                 animate={{ backgroundColor: theme.techBg }}
                 transition={{ duration: 0.6, ease: "easeInOut" }}
                 className="p-8 flex flex-col border-r border-white/10 group hover:brightness-110 transition-all"
             >
                 <div className="flex items-center gap-2 mb-6 opacity-50">
                    <Layers size={16} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Tech</span>
                 </div>
                 <div className="flex flex-wrap gap-2 content-start">
                     <AnimatePresence mode='wait'>
                        <motion.div key={currentIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-wrap gap-2">
                            {currentProject.techStack.slice(0, 5).map((t, i) => (
                                <span key={i} className="px-2 py-1 rounded text-[10px] font-medium bg-white/10 border border-white/5 text-white/80 whitespace-nowrap">
                                    {t}
                                </span>
                            ))}
                             {currentProject.techStack.length > 5 && (
                                <span className="px-2 py-1 rounded text-[10px] text-white/40">+ more</span>
                            )}
                        </motion.div>
                     </AnimatePresence>
                 </div>
             </motion.div>

             {/* Next Project Preview */}
             <motion.div 
                animate={{ backgroundColor: theme.primary }}
                transition={{ duration: 0.6 }}
                onClick={handleNext}
                className="p-8 flex flex-col justify-between cursor-pointer relative overflow-hidden group"
             >
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-60 text-white">Up Next</span>
                    <h3 className="text-[36px] font-bold leading-tight mt-2 text-white">
                        {nextProject.projectName.split(" ").slice(0,2).join(" ")}
                    </h3>
                </div>

                <div className="flex justify-end">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                        <ChevronRight size={18} />
                    </div>
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkCarousel;