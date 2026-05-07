"use client";

import { motion } from "framer-motion";
import PixelPortrait from "./PixelPortrait";

export default function About() {
  return (
    <section id="about" className="relative bg-void py-20 sm:py-32 lg:py-44 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white/95 tracking-tight mb-12">
              About me
            </h2>
            
            <PixelPortrait />
          </motion.div>

          <motion.div
            className="lg:col-span-8 lg:col-start-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="sm:pt-[88px]">
              <p className="font-body text-base sm:text-lg leading-relaxed text-warm-300 mb-6 sm:mb-8">
                Hey, my name is Bhagvan Singh Lodhi. I'm a full stack MERN developer building scalable web applications with a strong focus on performance, clean architecture, and modern frontend systems.
              </p>
              <p className="font-body text-base sm:text-lg leading-relaxed text-warm-300 mb-8">
                I use AI-powered development workspaces to accelerate building, debugging, and iteration while maintaining strong attention to engineering quality and clean execution. Most of my projects have been independently designed and developed from scratch, which strengthened my ability to handle complete product execution end-to-end.
              </p>
              <p className="font-body text-base sm:text-lg leading-relaxed text-warm-300 mb-8">
                Currently, I'm exploring scalable backend systems, cloud architecture, AI-assisted workflows, and performance-focused development while continuously improving the way I build modern applications for the web.
              </p>
              <p className="font-body text-base sm:text-lg leading-relaxed text-warm-300">
                In the meantime, I enjoy watching iHaveNoTV documentaries, exploring history, and learning about the solar system and space.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}