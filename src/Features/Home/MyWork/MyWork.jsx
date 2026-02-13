import React, { useState, useEffect, useRef } from "react";
import LetterSwapPingPong from "@/components/fancy/text/letter-swap-pingpong-anim";
import CstmCard from "@/components/CstmCard/CstmCard";
import { FlipReveal, FlipRevealItem } from "../../../../components/gsap/flip-reveal";
import { allProjects } from "@/utils/mywork";
import PotraitCard from "@/components/CstmCard/PotraitCard";
import WorkCarousel from "./WorkCarousel";
import ImageAndTextOverlay from "@/components/ImageAndTextOverlay/ImageAndTextOverlay";
import NotebookCard from "@/components/CstmCard/NotebookCard";



const MyWork = () => {
  const [selectedCategory, setSelectedCategory] = useState(["all"]);
  const categories = ["ALL", "WEBSITE", "APP", "PWA"];
  const sectionRef = useRef(null);

  const handleCategoryClick = (category) => {
    console.log("Clicked category:", category);
    if (category === "ALL") {
      setSelectedCategory(["all"]);
    } else {
      setSelectedCategory([category]);
    }
    console.log("Selected category updated to:", category === "ALL" ? ["all"] : [category]);
  };

  useEffect(() => {
    console.log("selectedCategory changed:", selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Smooth scroll to top of section when it comes into view
            sectionRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: "0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <div ref={sectionRef} className="container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col ">
      <NotebookCard/>
        {/* <div className="flex items-center mb-8">
        <div className="sparkle mr-4" />
        <h3 className="font-custom text-[30px] mt-3">MY WORK</h3>
      </div> */}

        {/* Filter Buttons */}
        {/* <div className="flex flex-wrap gap-4 sm:gap-8 mb-12">
        {categories.map((category) => {
          const isActive =
            category === "ALL"
              ? selectedCategory.includes("all")
              : selectedCategory.includes(category);

          return (
            <div
              key={category}
              onClick={(e) => {
                e.stopPropagation();
                handleCategoryClick(category);
              }}
              className="cursor-pointer"
            >
              <LetterSwapPingPong
                key={category + isActive}
                label={category}
                className={`font-custom text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px] ${
                  isActive ? "text-red-600" : "text-black"
                }`}
                reverse={true}
                hoverTextColor="red"
                externalActive={isActive}
                disablePointerHover={false}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCategoryClick(category);
                }}
              />
            </div>
          );
        })}
      </div> */}



        {/* <PotraitCard/> */}

        {/* Projects Grid with FlipReveal */}
        {/* <FlipReveal
        keys={selectedCategory}
        hideClass="hidden"
        showClass="block"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {allProjects.map((project) => (
          <FlipRevealItem key={project.id} flipKey={project.category}>
            <PotraitCard
              img={project.image}
              title={project.projectName}
              highlight={project.highlight}
              subtitle={project.category}
              techStack={project.techStack}
              link={project.projectUrl}
              description={project.description}
              duration=""
              parentStyle="w-full min-w-[200px] max-w-full bg-white"
            />
          </FlipRevealItem>
        ))}
      </FlipReveal> */}
      </div>
      {/* <WorkCarousel projects={allProjects}/> */}

    </div>

  );
};

export default MyWork;
