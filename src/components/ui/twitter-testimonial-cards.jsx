"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

function VerifiedBadge() {
  return (
    <svg
      className="size-4 sm:size-5 text-[#1d9bf0] shrink-0"
      viewBox="0 0 22 22"
      fill="currentColor"
    >
      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
    </svg>
  );
}

// Check if company name contains Keuro for black background
function isKeuroCompany(name) {
  return name?.toLowerCase().includes('keuro');
}

function CompanyCard({ company, isActive, onClick }) {
  const hasKeuro = isKeuroCompany(company.name);

  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "relative cursor-pointer rounded-xl border-2 p-3 sm:p-4 transition-colors duration-300",
        isActive
          ? "border-primary bg-primary/5 dark:bg-primary/10"
          : "border-transparent hover:border-border hover:bg-muted/50"
      )}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Timeline dot */}
      <div className="absolute -left-[33px] top-6 hidden lg:block">
        <motion.div
          className={cn(
            "size-3 rounded-full border-[3px] transition-colors duration-300",
            isActive
              ? "border-primary bg-primary"
              : "border-muted-foreground/30 bg-background"
          )}
          animate={isActive ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 2 }}
        />
      </div>

      <div className="flex items-start gap-3">
        {/* Logo Section */}
        <div className="relative shrink-0">
          <motion.div
            className={cn(
              "size-12 sm:size-14 rounded-xl flex items-center justify-center overflow-hidden p-1.5 transition-all duration-300",
              isActive
                ? "bg-gradient-to-br from-primary/20 to-primary/5 shadow-md shadow-primary/20"
                : "bg-gradient-to-br from-muted to-muted/50"
            )}
            animate={isActive ? { y: [0, -2, 0] } : { y: 0 }}
            transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
          >
            {company.logo && (
              <Image
                src={company.logo}
                alt={company.name}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            )}
          </motion.div>
          {company.secondaryLogo && (
            <motion.div
              className={cn(
                "absolute -bottom-1 -right-1 size-6 sm:size-7 rounded-lg border-2 border-background flex items-center justify-center overflow-hidden p-0.5 shadow-sm",
                hasKeuro ? "bg-black" : "bg-background"
              )}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Image
                src={company.secondaryLogo}
                alt="Partner"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h3 className="font-bold text-foreground text-sm sm:text-base truncate">
              {company.name}
            </h3>
            <VerifiedBadge />
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm truncate">{company.role}</p>
          <div className="flex items-center gap-1.5 mt-0.5 text-[10px] sm:text-xs text-muted-foreground">
            <span className="truncate">{company.type}</span>
            <span>•</span>
            <span className="font-medium text-primary whitespace-nowrap">{company.duration}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DetailPanel({ company }) {
  const hasKeuro = isKeuroCompany(company.name);

  return (
    <motion.div
      key={company.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full w-full"
    >
      {/* Glassmorphism Card */}
      <div className="relative h-full rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50 p-4 sm:p-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

        {/* Content */}
        <div className="relative z-10">
          {/* Header with large logo */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="size-14 sm:size-18 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center overflow-hidden p-2 shadow-lg"
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              {company.logo && (
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              )}
            </motion.div>
            {company.secondaryLogo && (
              <motion.div
                initial={{ scale: 0, x: -20 }}
                animate={{ scale: 1, x: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="flex items-center gap-2"
              >
                <span className="text-lg sm:text-xl text-muted-foreground">+</span>
                <div className={cn(
                  "size-10 sm:size-12 rounded-lg flex items-center justify-center overflow-hidden p-1.5 border border-border",
                  hasKeuro ? "bg-black" : "bg-muted/50"
                )}>
                  <Image
                    src={company.secondaryLogo}
                    alt="Partner"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1.5">
              {company.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {company.role}
              </span>
              <span>{company.type}</span>
            </div>
          </motion.div>

          {/* Duration Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 mb-4"
          >
            <svg className="size-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium text-primary text-xs">{company.duration}</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-foreground/70 text-xs sm:text-sm leading-relaxed mb-4"
          >
            {company.description}
          </motion.p>

          {/* Projects */}
          {company.projects && company.projects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <h4 className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Key Projects
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {company.projects.map((project, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="px-2 py-1 text-[10px] sm:text-xs rounded-md bg-muted/50 text-foreground border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-default"
                  >
                    {project}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function CompanyTestimonials({ companies = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCompany = companies[activeIndex];

  if (companies.length === 0) return null;

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Mobile: Tabs + Detail View */}
      <div className="lg:hidden">
        {/* Company Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-2 px-2">
          {companies.map((company, index) => (
            <motion.button
              key={company.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-300 border-2 shrink-0",
                activeIndex === index
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/50 text-muted-foreground border-transparent hover:border-border"
              )}
              whileTap={{ scale: 0.95 }}
            >
              <div className={cn(
                "size-5 rounded-full overflow-hidden p-0.5",
                isKeuroCompany(company.name) && company.secondaryLogo ? "bg-black" : "bg-background/50"
              )}>
                {company.logo && (
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={20}
                    height={20}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              <span className="text-xs font-medium">{company.name.split(' ')[0]}</span>
            </motion.button>
          ))}
        </div>

        {/* Detail Panel */}
        <AnimatePresence mode="wait">
          <DetailPanel company={activeCompany} />
        </AnimatePresence>
      </div>

      {/* Desktop: Timeline Layout */}
      <div className="hidden lg:grid lg:grid-cols-[1fr,1.2fr] gap-4 xl:gap-6">
        {/* Left: Timeline */}
        <div className="relative pl-8">
          {/* Timeline line */}
          <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-border to-border" />

          {/* Company Cards */}
          <div className="space-y-1">
            {companies.map((company, index) => (
              <CompanyCard
                key={company.id}
                company={company}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Right: Detail Panel */}
        <div className="sticky top-8 h-fit">
          <AnimatePresence mode="wait">
            <DetailPanel company={activeCompany} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export { CompanyTestimonials, CompanyCard, DetailPanel };
