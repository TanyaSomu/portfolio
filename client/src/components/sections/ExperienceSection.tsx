import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, Building2 } from 'lucide-react';
import { Experience } from '../../types';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const activeExperiences = experiences && experiences.length > 0 ? experiences : [];

  return (
    <section id="experience" className="py-24 border-t border-slate-200/60 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-3 mb-16"
        >
          <span className="text-xs font-mono font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Work History
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Experience & Internships
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Professional track record delivering production backend modules and database architectures in agile team settings.
          </p>
        </motion.div>

        {/* Timeline Cards */}
        <div className="max-w-3xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-5 sm:before:left-1/2 sm:before:-translate-x-1/2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {activeExperiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative flex flex-col sm:flex-row items-start ${
                idx % 2 === 0 ? 'sm:flex-row-reverse' : ''
              } gap-6 group`}
            >
              {/* Timeline Center Node */}
              <div className="absolute left-5 sm:left-1/2 -translate-x-1/2 top-6 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 shadow-md z-10 group-hover:scale-125 transition-transform duration-300">
                <Building2 className="w-5 h-5" />
              </div>

              {/* Card Container */}
              <motion.div
                whileHover={{ y: -4 }}
                className="w-full sm:w-[calc(50%-2.5rem)] ml-12 sm:ml-0 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800/80 shadow-card-light dark:shadow-card-dark hover:border-emerald-500/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    {exp.duration}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                    {exp.type}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                  {exp.designation}
                </h3>
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  {exp.organization}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {exp.description}
                </p>

                {exp.responsibilities && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                    <strong>Key Responsibilities:</strong> {exp.responsibilities}
                  </div>
                )}

                {exp.technologies && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.technologies.split(',').map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
