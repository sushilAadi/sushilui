import LetterSwapPingPong from "@/components/fancy/text/letter-swap-pingpong-anim";
import { LogoStepper } from "@/components/logoStepper";
import { Marquee } from "@/components/ui/marquee";
import { ScrollVelocityContainer,ScrollVelocityRow } from "@/components/ui/scroll-based-velocity";
import { frameworkAndPackage, frameworkAndPackageOne, logos } from "@/utils";
import Image from "next/image";


import React from "react";

const SectionThree = () => {
  // Tech stack organized by category

  return (
    <div className="section overflow-hidden">
      
      <section className=" py-20 rotate-4  ">
      <ScrollVelocityContainer className="w-full">
        <ScrollVelocityRow baseVelocity={6} direction={1} className="bg-red-700 text-white font-semibold   ">
          {frameworkAndPackageOne?.map((item) => (
            <div key={item.label} className="flex items-center">
              <Image
                src={item?.icon}
                alt="Figma"
                width={"100%"}
                height={40}
                className="h-10 "
              />
              <span className="mx-8 text-md">{item.label}</span>
            </div>
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
        
      </section>
      <section className="  -rotate-4 -translate-y-[140px]">
      <ScrollVelocityContainer className="w-full">
        <ScrollVelocityRow baseVelocity={6} direction={-1} className="bg-red-700 text-white font-semibold  ">
          {frameworkAndPackage?.map((item) => (
            <div key={item.label} className="flex items-center">
              <Image
                src={item?.icon}
                alt="Figma"
                width={"100%"}
                height={40}
                className="h-10 "
              />
              <span className="mx-8 text-md">{item.label}</span>
            </div>
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
      </section>
    </div>
  );
};

export default SectionThree;
