"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative bg-void pt-32 sm:pt-44 pb-8 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white/95 tracking-tight mb-8">
            Let's build something meaningful.
          </h2>
          <p className="font-body text-base leading-relaxed text-warm-300 mb-8">
            I'm currently looking for opportunities where I can contribute to product-focused teams building thoughtful, scalable, and high-impact digital experiences.
          </p>
          <p className="font-body text-base leading-relaxed text-warm-300 mb-8">
            I'm especially interested in working on modern SaaS products where engineering, usability, and long-term product thinking are valued equally.
          </p>
          <p className="font-body text-base leading-relaxed text-warm-300 mb-12">
            If you think I'd be a strong fit for your team or product, I'd love to connect.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-16">
            <a
              href="mailto:bhagvansinghhere@gmail.com"
              className="group text-sm text-warm-300 hover:text-white transition-colors duration-500"
            >
              <span className="block font-heading text-[11px] tracking-widest text-warm-600 mb-1.5 uppercase">
                Email
              </span>
              <span className="relative font-body">
                bhagvansinghhere@gmail.com
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
              </span>
            </a>
            <a
              href="https://github.com/Bhagvansingh-lodhi"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-sm text-warm-300 hover:text-white transition-colors duration-500"
            >
              <span className="block font-heading text-[11px] tracking-widest text-warm-600 mb-1.5 uppercase">
                GitHub
              </span>
              <span className="relative font-body">
                @Bhagvansingh-lodhi
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/bhagvan-singh-lodhi-0ba7a7313/"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-sm text-warm-300 hover:text-white transition-colors duration-500"
            >
              <span className="block font-heading text-[11px] tracking-widest text-warm-600 mb-1.5 uppercase">
                LinkedIn
              </span>
              <span className="relative font-body">
                /in/bhagvan-singh-lodhi
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
              </span>
            </a>
          </div>

          <motion.a
            href="https://www.linkedin.com/in/bhagvan-singh-lodhi-0ba7a7313/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 font-heading text-[13px] font-semibold tracking-wide text-[#12120F] bg-accent px-8 py-4 rounded-full transition-all duration-500 hover:bg-accent-hover hover:shadow-[0_0_40px_rgba(219,242,65,0.18)]"
          >
            <span>Start a conversation</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 mt-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-white/[0.05]">
          <p className="font-body text-[11px] text-warm-700 tracking-wide">
            &copy; {new Date().getFullYear()} Bhagvan Singh. Built with care.
          </p>
          <p className="font-body text-[11px] text-warm-700 tracking-wide">
            MERN stack, Three.js, and a lot of iteration.
          </p>
        </div>
      </div>
    </section>
  );
}
