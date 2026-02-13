"use client";
import { useState, useEffect, useRef } from "react"
import { debounce } from "lodash"
import { motion, stagger, useAnimate } from "motion/react";

const LetterSwapPingPong = ({
  label,
  reverse = true,
  hoverTextColor,
  activeColor, // new prop for active state color
  transition = {
    type: "spring",
    duration: 0.7,
  },

  staggerDuration = 0.03,
  staggerFrom = "first",
  className,
  onClick,
  // external control
  externalActive,
  // if true, disables the built-in pointer hover handlers on the label itself
  disablePointerHover = false,
  ...props
}) => {
  const [scope, animate] = useAnimate()
  const [isHovered, setIsHovered] = useState(false)
  const originalColor = useRef(null)

  const mergeTransition = (baseTransition) => ({
    ...baseTransition,
    delay: stagger(staggerDuration, {
      from: staggerFrom,
    }),
  })

  // non-debounced core actions (safe to call from effects or externally)
  const doHoverStart = () => {
    if (isHovered) return
    setIsHovered(true)

    if (hoverTextColor) {
      if (scope.current && originalColor.current === null) {
        originalColor.current = window.getComputedStyle(scope.current).color
      }
      animate(scope.current, { color: hoverTextColor }, { duration: 0.3 })
    }

    animate(".letter", { y: reverse ? "100%" : "-100%" }, mergeTransition(transition))

    animate(
      ".letter-secondary",
      {
        top: "0%",
      },
      mergeTransition(transition)
    )
  }

  const doHoverEnd = () => {
    if (!isHovered) return
    setIsHovered(false)

    if (hoverTextColor && originalColor.current) {
      animate(scope.current, { color: originalColor.current }, { duration: 0.3 })
    }

    animate(
      ".letter",
      {
        y: 0,
      },
      mergeTransition(transition)
    )

    animate(
      ".letter-secondary",
      {
        top: reverse ? "-100%" : "100%",
      },
      mergeTransition(transition)
    )
  }

  // debounced handlers used for pointer hover on the label itself
  const hoverStart = debounce(doHoverStart, 100, { leading: true, trailing: true })
  const hoverEnd = debounce(doHoverEnd, 100, { leading: true, trailing: true })

  // support external control via the `externalActive` prop
  useEffect(() => {
    if (typeof externalActive === "boolean") {
      if (externalActive) {
        doHoverStart()
        // Apply active color if provided
        if (activeColor && scope.current) {
          animate(scope.current, { color: activeColor }, { duration: 0.3 })
        }
      } else {
        doHoverEnd()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalActive])

  const handleClick = (e) => {
    console.log("LetterSwapPingPong clicked:", label);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.span
      className={`flex justify-center items-center relative overflow-hidden  ${className} `}
      onHoverStart={!disablePointerHover ? hoverStart : undefined}
      onHoverEnd={!disablePointerHover ? hoverEnd : undefined}
      onClick={handleClick}
      ref={scope}
      style={{ pointerEvents: "auto" }}
      {...props}>
      <span className="sr-only">{label}</span>
      {label.split("").map((letter, i) => {
        return (
          <span className="whitespace-pre relative flex" key={i} aria-hidden={true} style={{ pointerEvents: "none" }}>
            <motion.span className={`relative letter`} style={{ top: 0, pointerEvents: "none" }}>
              {letter}
            </motion.span>
            <motion.span
              className="absolute letter-secondary "
              style={{ top: reverse ? "-100%" : "100%", pointerEvents: "none" }}>
              {letter}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}

export default LetterSwapPingPong
