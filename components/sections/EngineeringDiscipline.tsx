"use client";

import { motion } from "framer-motion";

const leetcodeStats = {
  solved: 560,
  profileUrl: "https://leetcode.com/u/bhagvanlodhi9685/",
};

const toolCategories = [
  {
    label: "Frontend",
    tools: ["JavaScript", "HTML5", "CSS3", "React", "Next.js", "Tailwind CSS"],
  },
  {
    label: "Backend",
    tools: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
  {
    label: "Design",
    tools: ["Figma", "Framer Motion"],
  },
  {
    label: "Deploy",
    tools: ["Docker", "Vercel", "Vite", "Postman", "GitHub"],
  },
];

export default function EngineeringDiscipline() {
  return (
    <section id="discipline" className="relative bg-void py-14 sm:py-24 lg:py-32 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left — LeetCode */}
          <div className="flex flex-col justify-center p-8 sm:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.015]">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-heading text-5xl sm:text-6xl font-bold text-white/95 tracking-tighter tabular-nums">
                {leetcodeStats.solved}+
              </span>
              <span className="font-heading text-sm font-medium text-warm-500 tracking-wide">
                solved
              </span>
            </div>
            <p className="font-body text-sm text-warm-400 mb-8">
              Questions solved on LeetCode. Daily practice in algorithmic thinking.
            </p>

            <a
              href={leetcodeStats.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-heading text-[11px] font-semibold tracking-[0.15em] uppercase text-warm-400 hover:text-accent transition-colors duration-500 w-fit"
            >
              <span>View LeetCode Profile</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Right — Tools */}
          <div className="flex flex-col justify-center p-8 sm:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.015]">
            <h3 className="font-heading text-[11px] font-semibold tracking-[0.2em] uppercase text-warm-500 mb-8">
              Tools & Languages
            </h3>
            <div className="space-y-6">
              {toolCategories.map((cat) => (
                <div key={cat.label} className="flex items-start gap-4">
                  <span className="font-heading text-[10px] font-semibold tracking-[0.2em] uppercase text-warm-700 w-20 shrink-0 pt-0.5">
                    {cat.label}
                  </span>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    {cat.tools.map((tool, i) => (
                      <span key={tool} className="flex items-center gap-2">
                        <span className="font-body text-sm text-warm-300 hover:text-warm-100 transition-colors duration-300 cursor-default">
                          {tool}
                        </span>
                        {i < cat.tools.length - 1 && (
                          <span className="text-warm-800 text-[10px]">•</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Closing line */}
        <motion.p
          className="mt-10 lg:mt-16 font-body text-sm text-warm-600 max-w-md leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Quiet consistency compounds over time. I build products by day and sharpen logic by night.
        </motion.p>
      </div>
    </section>
  );
}
