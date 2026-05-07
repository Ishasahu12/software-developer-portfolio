"use client";

import { motion } from "framer-motion";

const phases = [
  {
    number: "01",
    title: "Understand the problem",
    description:
      "Before a single line of code, I spend time understanding the user, the context, and the constraints. I ask hard questions. The best engineering decisions are made before you open an IDE.",
  },
  {
    number: "02",
    title: "Design the experience",
    description:
      "I prototype in Figma, test interaction flows, and validate mental models. I believe interface design is a form of systems design — every element must earn its place.",
  },
  {
    number: "03",
    title: "Build with intention",
    description:
      "Clean architecture, reusable abstractions, and obsessive attention to the details users feel but cannot name. I optimize for maintainability and developer experience as much as user experience.",
  },
  {
    number: "04",
    title: "Ship and iterate",
    description:
      "I deploy early, measure what matters, and refine based on real usage. A product in production teaches you more than a product in a staging environment ever will.",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Process() {
  return (
    <section id="process" className="relative bg-void py-32 sm:py-44 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-heading text-[11px] font-medium tracking-[0.25em] uppercase text-warm-500 mb-4">
            Method
          </p>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white/95 tracking-tight">
            How I work
          </h2>
          <p className="font-body text-base text-warm-400 mt-5 max-w-lg leading-relaxed">
            I do not have a rigid process — I have a set of principles. Each project demands its own shape, but these four phases are always present in some form.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {phases.map((phase) => (
            <motion.div key={phase.number} variants={item} className="group">
              <div className="flex items-baseline gap-4 mb-5">
                <span className="font-heading text-[11px] font-semibold tracking-widest text-warm-700">
                  {phase.number}
                </span>
                <div className="flex-1 h-px bg-white/[0.06] group-hover:bg-accent/20 transition-colors duration-500" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-warm-200 tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">
                {phase.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-warm-400 group-hover:text-warm-300 transition-colors duration-300">
                {phase.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
