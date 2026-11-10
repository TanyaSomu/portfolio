import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Code2, Layout, Server, Database, Wrench, Shield, Check } from 'lucide-react';
import { SkillCategory } from '../../types';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeCategories = categories && categories.length > 0 ? categories : [];

  const allSkills = activeCategories.flatMap((cat) =>
    cat.skills.map((s) => ({ ...s, categoryName: cat.name, categorySlug: cat.slug }))
  );

  const filteredSkills = allSkills.filter((skill) => {
    const matchesCategory =
      selectedCategory === 'ALL' || skill.categorySlug === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 border-t border-slate-200/60 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-3 mb-12"
        >
          <span className="text-xs font-mono font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Technical Proficiency
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Skills & Architectural Capabilities
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Verified technologies and core computer science competencies used to build scalable production software.
          </p>
        </motion.div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs with Animated Pill */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`relative px-3.5 py-1.5 rounded-xl font-medium transition-colors ${
                selectedCategory === 'ALL'
                  ? 'text-slate-900 dark:text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {selectedCategory === 'ALL' && (
                <motion.div
                  layoutId="skillFilterPill"
                  className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-sm -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              All Skills ({allSkills.length})
            </button>
            {activeCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`relative px-3 py-1.5 rounded-xl font-medium transition-colors ${
                  selectedCategory === cat.slug
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {selectedCategory === cat.slug && (
                  <motion.div
                    layoutId="skillFilterPill"
                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-sm -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. Postgres, React)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Animated Skills Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5"
        >
          <AnimatePresence>
            {filteredSkills.map((skill, idx) => (
              <motion.div
                layout
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: idx * 0.02 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group p-4 rounded-2xl bg-white dark:bg-[#101726] border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/50 hover:shadow-glow-emerald dark:hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Code2 className="w-4 h-4" />
                  </div>
                  {skill.isFeatured && (
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-semibold">
                      Core
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                    {skill.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                    {skill.categoryName}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm">
            No technical skills found matching your search.
          </div>
        )}
      </div>
    </section>
  );
};
