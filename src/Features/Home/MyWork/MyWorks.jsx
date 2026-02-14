import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Drawer } from "vaul";
import { createPortal } from 'react-dom';
import { allProjects } from '@/utils/mywork';
import ProjectCard from '@/components/CstmCard/ProjectCard';

// Animation variants for staggered card reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};



// --- Main Component ---
export default function MyWorks() {
  const [selectedId, setSelectedId] = useState(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = window.lenis;

    if (selectedId) {
      // if (lenis) lenis.stop();  // Lenis is disabled
      // Lock scroll position instead of using overflow: hidden
      const scrollPosition = window.scrollY;
      const preventScroll = () => window.scrollTo(0, scrollPosition);
      window.addEventListener('scroll', preventScroll);
      const index = allProjects.findIndex(p => p.id === selectedId);
      if (index !== -1) {
        setCurrentProjectIndex(index);
      }
      // Store the prevent scroll function for cleanup
      window._preventScrollFn = preventScroll;
    } else {
      // if (lenis) lenis.start();  // Lenis is disabled
      if (window._preventScrollFn) {
        window.removeEventListener('scroll', window._preventScrollFn);
        delete window._preventScrollFn;
      }
    }

    return () => {
      // if (lenis) lenis.start();  // Lenis is disabled
      if (window._preventScrollFn) {
        window.removeEventListener('scroll', window._preventScrollFn);
        delete window._preventScrollFn;
      }
    };
  }, [selectedId]);

  const handleNextProject = () => {
    if (currentProjectIndex < allProjects.length - 1) {
      const nextIndex = currentProjectIndex + 1;
      setCurrentProjectIndex(nextIndex);
      setSelectedId(allProjects[nextIndex].id);
    }
  };

  const handlePreviousProject = () => {
    if (currentProjectIndex > 0) {
      const prevIndex = currentProjectIndex - 1;
      setCurrentProjectIndex(prevIndex);
      setSelectedId(allProjects[prevIndex].id);
    }
  };

  return (
  <>
    <div className="text-black mx-auto container selection:bg-red-500 selection:text-white relative my-10 overflow-hidden">

      {/* CSS for animated grid borders */}
      <style>{`
        [data-vaul-drawer][data-vaul-drawer-direction="bottom"]::after {
          background: transparent;
        }
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        @keyframes borderGlowX {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes borderGlowY {
          0% { background-position: 0 -200%; }
          100% { background-position: 0 200%; }
        }
        .animated-grid-border {
          position: relative;
        }
        .animated-grid-border::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, transparent, transparent 30%, rgba(156,163,175,0.9) 50%, transparent 70%, transparent) top/200% 1px no-repeat,
            linear-gradient(90deg, transparent, transparent 30%, rgba(156,163,175,0.9) 50%, transparent 70%, transparent) bottom/200% 1px no-repeat,
            linear-gradient(180deg, transparent, transparent 30%, rgba(156,163,175,0.9) 50%, transparent 70%, transparent) left/1px 200% no-repeat,
            linear-gradient(180deg, transparent, transparent 30%, rgba(156,163,175,0.9) 50%, transparent 70%, transparent) right/1px 200% no-repeat;
          animation: borderGlowX 8s linear infinite, borderGlowY 8s linear infinite;
          pointer-events: none;
          z-index: 30;
        }
        .animated-grid-border::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid #e5e7eb;
          pointer-events: none;
          z-index: 25;
        }
        .card-animated-border {
          position: relative;
        }
        .card-animated-border::before {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(180deg, transparent, transparent 20%, rgba(107,114,128,0.8) 50%, transparent 80%, transparent);
          background-size: 100% 300%;
          animation: borderGlowY 6s linear infinite;
          z-index: 20;
        }
        .card-animated-border::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, transparent 20%, rgba(107,114,128,0.8) 50%, transparent 80%, transparent);
          background-size: 300% 100%;
          animation: borderGlowX 6s linear infinite;
          z-index: 20;
        }
        .outer-animated-border {
          position: relative;
        }
        .outer-animated-border::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, transparent, transparent 40%, rgba(100,100,100,1) 50%, transparent 60%, transparent) top/300% 1px no-repeat,
            linear-gradient(90deg, transparent, transparent 40%, rgba(100,100,100,1) 50%, transparent 60%, transparent) bottom/300% 1px no-repeat,
            linear-gradient(180deg, transparent, transparent 40%, rgba(100,100,100,1) 50%, transparent 60%, transparent) left/1px 300% no-repeat,
            linear-gradient(180deg, transparent, transparent 40%, rgba(100,100,100,1) 50%, transparent 60%, transparent) right/1px 300% no-repeat;
          animation: borderGlowX 10s linear infinite, borderGlowY 10s linear infinite;
          pointer-events: none;
          z-index: 40;
        }
        .outer-animated-border::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid #e5e7eb;
          pointer-events: none;
          z-index: 35;
        }
      `}</style>

      <div className="flex mx-auto bg-white relative z-10 outer-animated-border">
        
        
        

        {/* Main Grid Content */}
        <div className="flex-1 overflow-hidden relative">

          <motion.div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-0 animated-grid-border"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {allProjects.map((item) => (
              <Card key={item.id} item={item} setSelectedId={setSelectedId} />
            ))}
          </motion.div>

          {/* <Footer /> */}
        </div>
      </div>
    </div>

    {/* Expanded View Overlay */}
    <Drawer.Root
      open={selectedId !== null}
      onClose={() => setSelectedId(null)}
    >
      <Drawer.Portal>
        <div className="fixed inset-0 z-50 lg:flex lg:items-center lg:justify-center">
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content
            className="bg-white flex flex-col rounded-t-[10px] lg:rounded-lg h-[96%] lg:h-auto lg:max-h-[90vh] w-full lg:max-w-7xl mt-24 lg:mt-0 z-50 lg:relative"
            onWheelCapture={(e) => e.stopPropagation()}
          >
            <div
              className="p-4 bg-white rounded-t-[10px] lg:rounded-lg flex-1 overflow-y-auto no-scrollbar"
              onWheel={(e) => {
                const el = e.currentTarget;
                if (el.scrollTop === 0 && e.deltaY < 0) {
                  e.preventDefault();
                } else if (el.scrollTop + el.clientHeight >= el.scrollHeight - 2 && e.deltaY > 0) {
                  e.preventDefault();
                }
                e.stopPropagation();
              }}
            >
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8 lg:hidden" />
              <div className="max-w-7xl mx-auto">
                <Drawer.Title className="sr-only">Project Details</Drawer.Title>
                <ProjectCard
                  key={selectedId}
                  project={allProjects.find(p => p.id === selectedId)}
                  currentIndex={currentProjectIndex}
                  totalProjects={allProjects.length}
                  onNext={handleNextProject}
                  onPrevious={handlePreviousProject}
                  onClose={() => setSelectedId(null)}
                />
              </div>
            </div>
          </Drawer.Content>
        </div>
      </Drawer.Portal>
    </Drawer.Root>
  </>
);
}

function Portal({ children }) {
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
  return () => setMounted(false);
}, []);

return mounted ? createPortal(children, document.body) : null;
}

// --- Components ---

function Card({ item, setSelectedId }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onClick={() => setSelectedId(item.id)}
      variants={cardVariants}
      whileHover={{
        scale: 1.02,
        zIndex: 10,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative cursor-pointer group card-animated-border
        ${item.isBig ? 'md:col-span-2 md:row-span-2' : ''}
        ${item.gridArea === 'span 1 / span 2' ? 'md:col-span-2' : ''}
        flex flex-col
        h-64 md:h-auto min-h-64
      `}
      style={{
        backgroundColor: item.bgColor ? item.bgColor : 'white',
        color: item.bgColor ? 'white' : 'black',
        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.12)' : '0 0 0 rgba(0,0,0,0)',
        transition: 'box-shadow 0.4s ease-out'
      }}
    >
      {/* Hover gradient overlay */}
      <motion.div
        className="absolute inset-0  to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="p-6 flex flex-col h-full justify-between relative z-10">

        {/* Header: Number & Title */}
        <div className="flex justify-between items-start">
          <motion.h2
            className={`font-bold leading-none tracking-tighter ${item.isBig || item.isBigNumber ? 'text-7xl md:text-8xl' : 'text-4xl'}`}
            animate={{
              color: isHovered ? '#dc2626' : item.bgColor ? '#FFFFFF' : '#000000',
              x: isHovered ? 4 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {item.id}
          </motion.h2>

          <motion.div
            className="text-right pl-4"
          >
            <motion.h3
              className="font-bold text-lg leading-tight line-clamp-2"
              animate={{ x: isHovered ? -4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {item.title}
            </motion.h3>
            {item.isBig && <p className="text-xs text-gray-500 mt-1 uppercase">{item.category}</p>}
          </motion.div>
        </div>

        {/* Content: Image or Details */}
        <div className="flex-1 mt-4 relative overflow-hidden rounded-lg">
          {item.Image ? (
            <motion.div
              className="w-full h-full relative overflow-hidden flex items-center justify-center"
            >
              <motion.div
                className="absolute inset-0 z-10 "
                animate={{ opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.4 }}
              />
              <motion.img
                src={item?.Image.src}
                alt={item.title}
                className="w-full h-full object-contain max-h-96"
                animate={{
                  scale: isHovered ? 1.08 : 1,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </motion.div>
          ) : (
             <div className="flex flex-col justify-end h-full pb-2 relative">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    rotate: isHovered ? 5 : 0
                  }}
                  transition={{ duration: 0.4 }}
                >
                    <span className="text-8xl md:text-9xl font-black text-gray-200 select-none">
                        {item.title.charAt(0)}
                    </span>
                </motion.div>
                <motion.div
                  className="relative z-10"
                  animate={{ y: isHovered ? -8 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{item.category}</p>
                    <div className="text-xs text-gray-500 mt-2 flex flex-wrap gap-1">
                      {item.techStack.slice(0, 3).map((tech, i) => (
                        <motion.span
                          key={i}
                          className="bg-gray-100 px-1.5 py-0.5 rounded-sm"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider">{item.developmentType}</p>
                </motion.div>
             </div>
          )}
        </div>

        {/* Arrow indicator on hover */}
        <motion.div
          className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "backOut" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </motion.div>

      </div>
    </motion.div>
  );
}


