import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layers, Search, Sparkles, X, Check, Smartphone } from 'lucide-react';
import { Project } from '../../types';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const activeProjects = projects && projects.length > 0 ? projects : [];

  const filteredProjects = activeProjects.filter((proj) => {
    const matchesFilter =
      activeFilter === 'ALL' ||
      (activeFilter === 'FEATURED' && proj.isFeatured) ||
      proj.technologies.toLowerCase().includes(activeFilter.toLowerCase());

    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.technologies.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 border-t border-slate-200/60 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-3 mb-12"
        >
          <span className="text-xs font-mono font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Case Studies & Deployments
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Featured Projects & Engineering Work
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            End-to-end full-stack applications with production PostgreSQL architectures, intuitive frontends, and real-world impact.
          </p>
        </motion.div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs">
            {['ALL', 'FEATURED', 'PostgreSQL', 'React', 'Node.js'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-3.5 py-1.5 rounded-xl font-medium transition-colors ${
                  activeFilter === filter
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {activeFilter === filter && (
                  <motion.div
                    layoutId="projectFilterPill"
                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-sm -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                {filter === 'ALL' ? 'All Work' : filter === 'FEATURED' ? 'Featured ⭐' : filter}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or tech..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Projects Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group rounded-3xl bg-white dark:bg-[#101726] border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-card-light dark:shadow-card-dark hover:border-emerald-500/50 hover:shadow-glow-emerald transition-all duration-300 flex flex-col justify-between"
              >
                <div className="p-6 sm:p-8 space-y-4">
                  {/* Header Tags */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {project.isFeatured && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                          <Sparkles className="w-3 h-3" /> Featured Deployment
                        </span>
                      )}
                      {project.playStoreUrl && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                          <Smartphone className="w-3 h-3" /> Play Store
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      {project.viewsCount} views
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.split(',').map((tech, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 sm:px-8 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    View Case Study Details →
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-emerald-500 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CASE STUDY MODAL with Spring Entrance */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="w-full max-w-2xl bg-white dark:bg-[#101726] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 uppercase">
                      Case Study Breakdown
                    </span>
                    <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
                      {selectedProject.title}
                    </h3>
                  </div>

                  <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                    {selectedProject.problemStatement && (
                      <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20">
                        <h4 className="font-bold text-rose-600 dark:text-rose-400 text-xs mb-1 uppercase tracking-wider">
                          The Problem
                        </h4>
                        <p className="leading-relaxed">{selectedProject.problemStatement}</p>
                      </div>
                    )}

                    {selectedProject.solution && (
                      <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                        <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-xs mb-1 uppercase tracking-wider">
                          The Architecture & Solution
                        </h4>
                        <p className="leading-relaxed">{selectedProject.solution}</p>
                      </div>
                    )}

                    {selectedProject.challenges && (
                      <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                        <h4 className="font-bold text-amber-600 dark:text-amber-400 text-xs mb-1 uppercase tracking-wider">
                          Key Engineering Challenges Overcome
                        </h4>
                        <p className="leading-relaxed">{selectedProject.challenges}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase mb-2">
                      Technologies Applied
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.split(',').map((t, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                        >
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>View GitHub Repository</span>
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Deployment</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
