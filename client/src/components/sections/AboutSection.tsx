import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Database, Cpu, Compass, CheckCircle2, Terminal } from 'lucide-react';
import { Profile } from '../../types';
import { AnimatedCounter } from '../common/AnimatedCounter';

interface AboutSectionProps {
  profile: Profile | null;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const bio =
    profile?.bio ||
    'Information Technology undergraduate and full-stack software developer with hands-on experience designing, developing, and debugging scalable, database-backed applications—including production platforms published on the Google Play Store and live operational billing systems.';

  const milestones = [
    {
      year: 'Present',
      title: 'Full-Stack & Database Engineering',
      desc: 'Developing scalable web systems with TypeScript, React, Express, and PostgreSQL with a strong focus on data integrity and microservices architecture.',
    },
    {
      year: '2026',
      title: 'Production Healthcare & Railway Deployments',
      desc: 'Architected relational databases for a Google Play Store clinic management platform and a multi-station railway billing system.',
    },
    {
      year: '2025',
      title: 'Agile Database & Backend Development',
      desc: 'Optimized complex database schemas, resolving recurring data integrity bottlenecks and engineering admin-facing modules.',
    },
    {
      year: '2023',
      title: 'B.Tech Information Technology',
      desc: 'Began Bachelor of Technology degree, mastering Object-Oriented Design, Data Structures & Algorithms, and relational database management.',
    },
  ];

  return (
    <section id="about" className="py-24 border-t border-slate-200/60 dark:border-slate-800/60 relative">
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
            About The Developer
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Engineering Systems From Ground Up
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Combining rigorous computer science fundamentals with modern product craftsmanship.
          </p>
        </motion.div>

        {/* Real Statistics Counter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          <div className="p-6 rounded-3xl bg-white dark:bg-[#101726] border border-slate-200/80 dark:border-slate-800/80 shadow-sm text-center">
            <p className="text-3xl sm:text-4xl text-emerald-500 font-extrabold mb-1">
              <AnimatedCounter value={3} suffix="+" />
            </p>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Production Applications
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#101726] border border-slate-200/80 dark:border-slate-800/80 shadow-sm text-center">
            <p className="text-3xl sm:text-4xl text-cyan-500 font-extrabold mb-1">
              <AnimatedCounter value={11} suffix=" Mos" />
            </p>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Internship Experience
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#101726] border border-slate-200/80 dark:border-slate-800/80 shadow-sm text-center">
            <p className="text-3xl sm:text-4xl text-violet-500 font-extrabold mb-1">
              <AnimatedCounter value={100} suffix="%" />
            </p>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Relational Data Integrity
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#101726] border border-slate-200/80 dark:border-slate-800/80 shadow-sm text-center">
            <p className="text-3xl sm:text-4xl text-amber-500 font-extrabold mb-1">
              <AnimatedCounter value={8} suffix="+" />
            </p>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Languages & Technologies
            </p>
          </div>
        </motion.div>

        {/* 2-Column Grid: Bio & Philosophy on left, Interactive Journey on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio & Core Principles */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800/80 shadow-card-light dark:shadow-card-dark">
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-4">
                Architecture First, Interfaces Felt
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                {bio}
              </p>

              {/* Strengths List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Relational Schema Design (3NF)',
                  'RESTful API Architecture',
                  'JWT Authentication & RBAC',
                  'Performance Query Tuning',
                  'Framer Motion & Modern UI',
                  'Data Structures & Algorithms',
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Philosophy Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-4 rounded-2xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 text-center shadow-sm"
              >
                <Database className="w-5 h-5 text-cyan-500 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">Data Integrity</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Strict schemas and zero data inconsistency</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-4 rounded-2xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 text-center shadow-sm"
              >
                <Cpu className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">Performance</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Optimized query complexity and indexing</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-4 rounded-2xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 text-center shadow-sm"
              >
                <Layers className="w-5 h-5 text-violet-500 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">Scalability</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Modular endpoints and role-based flows</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Journey Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800/80 shadow-card-light dark:shadow-card-dark">
              <div className="flex items-center gap-2 mb-6">
                <Compass className="w-5 h-5 text-emerald-500" />
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  Academic & Engineering Journey
                </h3>
              </div>

              {/* Timeline nodes */}
              <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-8 py-2">
                {milestones.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15, duration: 0.5 }}
                    className="relative pl-6 group"
                  >
                    <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-emerald-500 group-hover:scale-125 transition-transform duration-200"></span>
                    <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                      {item.year}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
