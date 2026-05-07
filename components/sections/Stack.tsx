"use client";

import { motion } from "framer-motion";

const categories = [
  {
    title: "Product Layer",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
  },
  {
    title: "Systems Layer",
    items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Redis", "Socket.io"],
  },
  {
    title: "Infrastructure",
    items: ["AWS", "Docker", "Vercel", "GitHub Actions", "Linux", "Nginx"],
  },
  {
    title: "Design & UX",
    items: ["Figma", "Storybook", "Radix UI", "User Research", "Prototyping", "Accessibility"],
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export default function Stack() {
  return (
    <section id="stack" className="relative bg-void py-32 sm:py-44 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-heading text-[11px] font-medium tracking-[0.25em] uppercase text-warm-500 mb-4">
            Capabilities
          </p>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white/95 tracking-tight">
            What I work with
          </h2>
          <p className="font-body text-base text-warm-400 mt-5 max-w-lg leading-relaxed">
            Tools are secondary. What matters is knowing which tool to reach for, and why. I am technology-agnostic where it counts.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-10"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {categories.map((cat) => (
            <motion.div key={cat.title} variants={item}>
              <h3 className="font-heading text-[11px] font-semibold tracking-[0.2em] uppercase text-warm-500 mb-8">
                {cat.title}
              </h3>
              <ul className="space-y-3.5">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="font-body text-sm text-warm-300 hover:text-accent transition-colors duration-300 cursor-default"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
