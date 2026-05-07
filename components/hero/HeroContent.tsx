"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.6 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroContent() {
  return (
    <div className="absolute inset-0 z-20 flex items-end sm:items-center pointer-events-none">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pb-16 sm:pb-0">
        <motion.div
          className="max-w-xl pointer-events-auto"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={item}
            className="font-heading text-[11px] sm:text-xs font-medium tracking-[0.3em] uppercase text-[#A09B8C] mb-6"
          >
            Full Stack Product Engineer
          </motion.p>

          <motion.h1
            variants={item}
            className="font-heading text-5xl sm:text-6xl lg:text-[5.5rem] font-bold text-white/95 tracking-tight leading-[0.9] mb-6"
          >
            Systems,
            <span className="block text-white/70">Interfaces,</span>
            <span className="block text-white/70">& Humans</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="font-body text-sm sm:text-base text-[#8A857A] leading-relaxed mb-10 max-w-sm"
          >
            I build end-to-end digital products that feel inevitable.
          </motion.p>

          <motion.div variants={item}>
            <a
              href="#work"
              className="group inline-flex items-center gap-3 font-heading text-[13px] font-semibold tracking-wide text-[#12120F] bg-[#DBF241] px-7 py-3.5 rounded-full transition-all duration-500 hover:bg-[#c5da3a] hover:shadow-[0_0_30px_rgba(219,242,65,0.15)]"
            >
              <span>View Selected Work</span>
              <svg
                className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
