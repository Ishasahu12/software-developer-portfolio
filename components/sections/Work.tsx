"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Meridian",
    description: "A supply chain visibility tool with real-time tracking and focused dashboard design.",
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind"],
    live: "https://meridian-demo.vercel.app",
    github: "https://github.com/bhagvansingh/meridian",
  },
  {
    title: "Aether",
    description: "A markdown-native note-taking app with tagging, search, and a distraction-free writing surface.",
    stack: ["React", "TypeScript", "IndexedDB", "Zustand", "Tailwind"],
    live: "https://aether-notes.vercel.app",
    github: "https://github.com/bhagvansingh/aether",
  },
  {
    title: "Cortex",
    description: "A reusable component system with accessibility-first design tokens and dark-mode theming.",
    stack: ["TypeScript", "Storybook", "Radix UI", "CSS Variables", "Vite"],
    live: "https://cortex-ui.vercel.app",
    github: "https://github.com/bhagvansingh/cortex",
  },
  {
    title: "Forma",
    description: "An AI-assisted form builder that generates question flows from natural language prompts.",
    stack: ["React", "OpenAI API", "Express", "PostgreSQL", "Framer Motion"],
    live: "https://forma-builder.vercel.app",
    github: "https://github.com/bhagvansingh/forma",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Work() {
  return (
    <section id="work" className="relative bg-void py-14 sm:py-32 lg:py-44">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <motion.div
          className="mb-12 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white/95 tracking-tight">
            Selected Work
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={item}
              className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-700"
            >
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-warm-200 tracking-tight mb-3 group-hover:text-accent transition-colors duration-500">
                  {project.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-warm-400 mb-8">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-body text-[11px] tracking-wide text-warm-500 border border-white/[0.06] px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 font-heading text-[11px] font-semibold tracking-[0.15em] uppercase text-warm-300 hover:text-accent transition-colors duration-500"
                >
                  <span>Live Preview</span>
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 font-heading text-[11px] font-semibold tracking-[0.15em] uppercase text-warm-500 hover:text-warm-200 transition-colors duration-500"
                >
                  <span>GitHub</span>
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
