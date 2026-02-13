'use client';
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './LoadingAnimation.css';

const LoadingAnimation = ({ onComplete, onExitStart }) => {
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const roles = [
    "UI DEVELOPER",
    "FRONTEND",
    "REACT NATIVE",
    "NEXT.JS",
    "CREATIVE DEV",
    "SUSHIL"
  ];

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

  // Scramble text effect
  useEffect(() => {
    const targetText = roles[currentIndex];
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration += 1/3;

      if (iteration >= targetText.length) {
        clearInterval(interval);
        setDisplayText(targetText);

        // Move to next role after a pause
        setTimeout(() => {
          setCurrentIndex(prev => (prev + 1) % roles.length);
        }, 400);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useGSAP(() => {
    // Initial states
    gsap.set('.loader-text', { y: 100, opacity: 0 });
    gsap.set('.loader-tagline', { opacity: 0 });
    gsap.set('.loader-line', { scaleX: 0 });

    // Create timeline for the loading progress animation
    const loadingTl = gsap.timeline({
      onUpdate: function() {
        setProgress(Math.round(this.progress() * 100));
      },
      onComplete: () => {
        // Trigger content to show IMMEDIATELY when loading reaches 100%
        if (onExitStart) onExitStart();

        // Then start exit animation - loading screen slides DOWN to reveal home
        gsap.to(".loading-screen", {
          duration: 1.2,
          y: "100%",
          ease: "power3.inOut",
          onComplete: onComplete,
        });
      },
    });

    // Stagger panels come in from top (original behavior)
    loadingTl.from(".stagger-panel", {
      duration: 0.8,
      y: "-100%",
      ease: "power2.inOut",
      stagger: {
        amount: 0.4,
        from: "start",
      },
    });

    // Text animates in with bounce
    loadingTl.to('.loader-text', {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "back.out(1.7)"
    }, "-=0.2");

    // Line draws from center
    loadingTl.to('.loader-line', {
      scaleX: 1,
      duration: 0.6,
      ease: "power3.inOut"
    }, "-=0.4");

    // Tagline fades in
    loadingTl.to('.loader-tagline', {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3");
  });

  return (
    <div className="loading-screen">
      {/* Original stagger panels */}
      <div className="stagger-panel stagger-panel-dark"></div>
      <div className="stagger-panel stagger-panel-mid"></div>
      <div className="stagger-panel stagger-panel-light"></div>

      {/* Center content - always visible area */}
      <div className="loader-center">
        <div className="loader-name">
          <span className="loader-text font-custom">
            {displayText}
          </span>
        </div>
        <div className="loader-line"></div>
        <p className="loader-tagline">Creative Developer & Designer</p>
      </div>

      {/* Original progress bar - bottom left */}
      <div className="loading-progress">
        <div className="loading-percentage">{progress}% complete</div>
        <div className="loading-bar">
          {[...Array(20)].map((_, index) => {
            const isActive = index < Math.floor((progress / 100) * 20);
            // Color progression: yellow → orange → red → dark red
            const step = index / 19;
            const hue = 60 - (step * 60);
            const lightness = 70 - (step * 30);

            return (
              <div
                key={index}
                className={`loading-segment ${isActive ? 'active' : ''}`}
                style={isActive ? {
                  background: `hsl(${hue}, 100%, ${lightness}%)`
                } : {}}
              ></div>
            );
          })}
        </div>
      </div>

      {/* Footer text */}
      <div className="loader-footer">
        <span>Portfolio 2025</span>
      </div>
    </div>
  );
};

export default LoadingAnimation;
