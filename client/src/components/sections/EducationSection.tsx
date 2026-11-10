import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Calendar } from 'lucide-react';
import { Education } from '../../types';

interface EducationSectionProps {
  education: Education[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const activeEducation = education && education.length > 0 ? education : [];

  return (
    <section id="education" className="py-24 border-t border-slate-200/60 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-3 mb-16"
        >
          <span className="text-xs font-mono font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Academic Foundation
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Education & Theoretical Rigor
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Formal training in Information Technology, algorithmic design, and database systems.
          </p>
        </motion.div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {activeEducation.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -4 }}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800/80 shadow-card-light dark:shadow-card-dark hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    Graduation: {edu.graduationYear}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-1">
                  {edu.degree}
                </h3>
                <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                  {edu.department}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-1.5 font-medium">
                  <span>{edu.institution}</span>
                </p>

                {edu.achievements && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                    {edu.achievements}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{edu.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
