/* eslint-disable @next/next/no-img-element */
import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import HighlightText from "../HeadingHighlight/HighlightText";

const CstmCard = ({
  img,
  parentStyle,
  title = "Autocad",
  highlight = "A.",
  subtitle = "",
  duration = "20:30:56",
  description = "Complete AutoCAD 2D&3D From Beginners To Expert Course",
  link = "/courses/autocad",
  techStack = [],
  onClick,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      router.push(link);
    }
  };

  return (
    <div
      className={`border-2 border-gray-300 p-2 overflow-hidden mb-4 cursor-pointer ${parentStyle}`}
      onClick={handleClick}
    >
      <div className="flex justify-between">
        <div className="flex items-center">
          <HighlightText title={highlight} />
          <p className="ml-1">{title}</p>
        </div>
        {subtitle && <p className="text-[#9e9e9e]">{subtitle}</p>}
      </div>
      <div className="mb-[10px] flex justify-center items-center">
        <img
          src={img.src || img}
          alt={title}
          className="h-[200px] object-cover image-fluid"
        />
      </div>
      {techStack && techStack.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="text-[10px] bg-black text-white px-2 py-0.5 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      {duration && <p className="text-[12px] semibold mb-0">{duration}</p>}
      {description && <p className="text-[12px]">{description}</p>}
    </div>
  );
};

export default CstmCard;
