"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    year: "2024 — Present",
    role: "Full Stack Product Engineer",
    context: "Independent / Select Clients",
    description:
      "Building 0-to-1 products end-to-end. I take ideas from sketches to deployed systems — frontend, backend, database, and the UX layer that ties it all together. I work with founders who care about craft.",
  },
  {
    year: "2022 — 2024",
    role: "Senior Product Engineer",
    context: "Healthcare + Healthtech",
    description:
      "The discipline that comes from medicine translates surprisingly well to product engineering. I brought systems thinking, user empathy, and a bias toward outcomes to a team building patient-facing digital health tools.",
  },
  {
    year: "2020 — 2022",
    role: "Solo Builder / Freelance",
    context: "Self-taught, client-funded",
    description:
      "Learned by building. Taught myself Figma, then React, then Node. Shipped my first production app — a medical imaging viewer — and realized I could build things people actually used. That changed everything.",
  },
  {
    year: "2016 — 2020",
    role: "Medical Sciences",
    context: "University + Clinical Training",
    description:
      "Studied medicine. Learned to diagnose complex systems, work under pressure, and care deeply about the human at the end of every process. I left not because I stopped caring — but because I found a better leverage point: building the systems people interact with.",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function History() {
  return (
    <section id="history" className="relative bg-void py-32 sm:py-44 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-heading text-[11px] font-medium tracking-[0.25em] uppercase text-warm-500 mb-4">
            Timeline
          </p>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white/95 tracking-tight">
            The path here
          </h2>
          <p className="font-body text-base text-warm-400 mt-5 max-w-lg leading-relaxed">
            I did not follow a standard route. I studied medicine, then taught myself to build software. That non-linear path is exactly why I think about products differently.
          </p>
        </motion.div>

        <motion.div
          className="space-y-0"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {timeline.map((entry) => (
            <motion.div
              key={entry.year}
              variants={item}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 py-12 border-t border-white/[0.05] first:border-t-0"
            >
              <div className="lg:col-span-3">
                <span className="font-heading text-[11px] tracking-widest text-warm-600">
                  {entry.year}
                </span>
              </div>
              <div className="lg:col-span-3">
                <h3 className="font-heading text-base font-semibold text-warm-200 group-hover:text-accent transition-colors duration-300">
                  {entry.role}
                </h3>
                <p className="font-body text-sm text-warm-500 mt-0.5">{entry.context}</p>
              </div>
              <div className="lg:col-span-6">
                <p className="font-body text-sm leading-relaxed text-warm-400 group-hover:text-warm-300 transition-colors duration-300">
                  {entry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
