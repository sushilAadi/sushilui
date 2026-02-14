import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ExternalLink, MapPin, Layers, X } from 'lucide-react';
import Image from "next/image";

const ProjectCard = ({ project, onNext, onPrevious, currentIndex, totalProjects, onClose }) => {
  if (!project) return null;
  const [activeImage, setActiveImage] = useState(0);
  const [likeCount, setLikeCount] = useState(project.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [direction, setDirection] = useState(0);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      // Prevent background from scrolling
      e.stopPropagation();
    };

    // Prevent background scrolling by disabling scrolling on document element
    // Instead of overflow hidden which hides fixed elements
    const originalScroll = window.scrollY;
    const preventScroll = (e) => {
      if (e.target !== scrollContainer && !scrollContainer.contains(e.target)) {
        window.scrollTo(0, originalScroll);
      }
    };
    
    window.addEventListener('scroll', preventScroll);
    scrollContainer.addEventListener('wheel', handleWheel);

    // Cleanup function to restore scrolling when the component unmounts
    return () => {
      window.removeEventListener('scroll', preventScroll);
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount
 
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleNext = () => {
    if (onNext) {
      setDirection(1);
      onNext();
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      setDirection(-1);
      onPrevious();
    }
  };

  const textVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  const imageVariants = {
    enter: {
      scale: 0.9,
      opacity: 0
    },
    center: {
      scale: 1,
      opacity: 1
    },
    exit: {
      scale: 0.9,
      opacity: 0
    }
  };
  console.log("project",project)

  return (
    <div className="w-full min-h-full bg-white relative">
      <motion.button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 bg-black text-white rounded-full p-2 flex items-center justify-center hover:bg-red-600 transition-colors"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9, rotate: 0 }}
      >
        <X size={20} />
      </motion.button>

      {/* Main Container - Responsive Grid */}
      <div
        className="bg-white grid grid-cols-1 lg:grid-cols-12 w-full min-h-full lg:rounded-lg"
      >

        {/* LEFT PANEL: Main Visual */}
        <div
          className="lg:col-span-5 relative min-h-[30vh] lg:min-h-[600px] flex flex-col justify-between p-3 sm:p-4 lg:p-6"
          style={{ backgroundColor: project?.bgColor || 'white' }}
        >
          
          {/* Header / Watermark */}
          <div className="flex justify-between items-start z-10">
            <AnimatePresence mode="wait">
              <motion.h2
                key={`number-${project.id}`}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="text-5xl sm:text-6xl lg:text-8xl font-thin text-gray-200 select-none font-serif"
              >
                {project.id}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Main Image Container */}
          <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 lg:p-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${project.id}`}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="relative w-full h-3/5 sm:h-2/3 lg:h-full group"
              >
                 {/* Main Project Image */}
                {project.Image ? (
                  <Image
                    src={project.Image}
                    alt={project.title}
                    layout="fill"
                    objectFit="contain"
                    className="transform transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-6xl font-black text-gray-300">{project.title.charAt(0)}</span>
                  </div>
                )}

                {/* Highlight Overlay text */}
                <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-white px-2.5 sm:px-3 py-1 sm:py-1 shadow-xl border-l-2 sm:border-l-4 border-red-600">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 tracking-tighter">{project.highlight}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Navigation & Thumbnails */}
          
        </div>

        {/* CENTER PANEL: Details */}
        <div className="lg:col-span-4 bg-[#111111] text-white p-4 sm:p-6 lg:p-12 flex flex-col min-h-[300px]">

          {/* Breadcrumbs */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`breadcrumb-${project.id}`}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="flex items-center gap-2 text-xs sm:text-xs font-bold tracking-[0.15em] text-gray-400 mb-4 sm:mb-6 uppercase"
            >
              <span>{project.category}</span>
              <span className="text-gray-600">/</span>
              <span>{project.developmentType}</span>
            </motion.div>
          </AnimatePresence>

          {/* Title Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`title-${project.id}`}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
              className="mb-4 sm:mb-6"
            >
              <h1 className="text-2xl sm:text-3xl lg:text-[2.75rem] font-bold leading-tight mb-3 sm:mb-4 tracking-tight">
                {project.title.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h1>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="text-[10px] sm:text-[11px] uppercase tracking-wider border border-gray-700 px-2 sm:px-2 py-1 sm:py-1 text-gray-400 rounded-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`description-${project.id}`}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
              className="mb-4 sm:mb-8"
            >
              <p className="text-gray-400 text-sm sm:text-sm leading-relaxed border-l border-gray-700 pl-3 sm:pl-4">
                {project.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Price/Action Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`action-${project.id}`}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
              className="mt-auto"
            >
            <div className="flex items-baseline gap-2 sm:gap-4 mb-3 sm:mb-4">
               <span className="text-2xl sm:text-2xl lg:text-3xl font-bold text-red-600">{project.highlight}</span>
               <span className="text-gray-500 line-through text-sm sm:text-sm">ARCHIVED</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-0">
              <div className="h-12 sm:h-12 bg-[#222] px-4 sm:px-4 flex items-center justify-center sm:justify-start border-b sm:border-b-0 sm:border-r border-[#333] text-gray-400 text-sm sm:text-sm">
                 <Layers className="w-4 h-4 sm:w-4 sm:h-4 mr-2 sm:mr-2" />
                 <span>V.1.0</span>
              </div>
              {(() => {
                switch (project.status) {
                  case 'live':
                    return (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="h-12 sm:h-12 flex-1 bg-white hover:bg-gray-200 text-black font-bold text-sm sm:text-sm tracking-widest uppercase flex items-center justify-center transition-colors group"
                      >
                        View Project
                        <ExternalLink className="w-4 h-4 sm:w-4 sm:h-4 ml-2 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                      </a>
                    );
                  case 'private':
                    return (
                      <div className="h-12 sm:h-12 flex-1 bg-gray-200 text-gray-500 font-bold text-sm sm:text-sm tracking-widest uppercase flex items-center justify-center cursor-not-allowed">
                        Private
                      </div>
                    );
                  case 'work-in-progress':
                    return (
                      <div className="h-12 sm:h-12 flex-1 bg-gray-200 text-gray-500 font-bold text-sm sm:text-sm tracking-widest uppercase flex items-center justify-center cursor-not-allowed">
                        In Progress
                      </div>
                    );
                  case 'discontinued':
                    return (
                      <div className="h-12 sm:h-12 flex-1 bg-gray-200 text-gray-500 font-bold text-sm sm:text-sm tracking-widest uppercase flex items-center justify-center cursor-not-allowed">
                        Discontinued
                      </div>
                    );
                  default:
                    return null;
                }
              })()}
            </div>

            {/* Footer Socials */}
            <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6 text-gray-600 text-xs sm:text-xs tracking-widest uppercase md:hidden lg:flex">
              
              <a href="https://www.linkedin.com/in/sushil-sharma-ui-developer/" target="_blank" rel="noreferrer" className="hover:text-white cursor-pointer transition-colors">LinkedIn</a>
            </div>
          </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT PANEL: Context/Sidebar */}
        <div className="lg:col-span-3 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-100 overflow-visible">

          {/* Top Box - Accent/Map */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`location-${project.id}`}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
              className="w-full h-56 sm:h-64 lg:h-1/2 bg-red-600 relative overflow-hidden group p-5 sm:p-6 flex flex-col justify-between text-white shrink-0"
            >
            {project.map && (
              <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none">
                  <img src={project.map} className="w-full h-full object-cover grayscale" alt="Location Map" />
              </div>
            )}

            <div className="relative z-10">
                <h3 className="text-xl sm:text-xl font-bold mb-2">Client Location</h3>
                <div className="flex items-center gap-2 sm:gap-2">
                    <MapPin className="w-4 h-4 sm:w-4 sm:h-4" />
                    <p className="text-base sm:text-base opacity-90">{project.client}</p>
                </div>
            </div>


          </motion.div>
          </AnimatePresence>

          {/* Bottom Box - Next Item/Grid Info */}
          <div className="w-full min-h-56 sm:h-64 lg:h-1/2 bg-gray-50 p-5 sm:p-6 pb-0 flex flex-col text-center relative shrink-0">

             <AnimatePresence mode="wait">
               <motion.div
                 key={`tech-${project.id}`}
                 custom={direction}
                 variants={textVariants}
                 initial="enter"
                 animate="center"
                 exit="exit"
                 transition={{ duration: 0.4, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
                 className="mb-4 sm:mb-4 mt-2"
               >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white shadow-md rounded-full flex items-center justify-center mb-2 mx-auto">
                      <span className="font-black text-lg sm:text-xl text-gray-800">React</span>
                  </div>

                  <h4 className="font-bold text-gray-800 uppercase tracking-wider text-sm sm:text-sm mb-2">Tech Stack</h4>
                  <p className="text-xs sm:text-xs text-gray-500 max-w-[180px] mx-auto mb-4">
                     Built using {project.techStack.join(', ')}
                  </p>
               </motion.div>
             </AnimatePresence>

             {/* Navigation Bar - Always at bottom */}
             <div className="mt-auto w-full p-3 sm:p-3 border-t border-gray-200 flex justify-between items-center bg-white">
                <span className="font-bold text-gray-900 text-sm sm:text-sm">
                  {String(currentIndex + 1).padStart(2, '0')}
                  <span className="text-gray-400 text-xs sm:text-xs font-normal">
                    /{String(totalProjects).padStart(2, '0')}
                  </span>
                </span>
                <div className="flex gap-4 sm:gap-4">
                    <motion.button
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                      whileHover={{ scale: 1.1, x: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="w-4 h-4 sm:w-4 sm:h-4 text-gray-400 hover:text-black transition-colors" />
                    </motion.button>
                    <motion.button
                      onClick={handleNext}
                      disabled={currentIndex === totalProjects - 1}
                      whileHover={{ scale: 1.1, x: 2 }}
                      whileTap={{ scale: 0.9 }}
                      className="disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowRight className="w-4 h-4 sm:w-4 sm:h-4 text-black hover:text-red-600 transition-colors" />
                    </motion.button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;