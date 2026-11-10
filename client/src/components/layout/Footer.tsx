import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#070A12]/50 backdrop-blur-sm transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200/60 dark:border-slate-800/60">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-mono font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
                System Status: Ready for Production
              </span>
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
              Full-Stack Developer & Database Architect
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Crafting production-grade web systems, relational data structures, and intuitive digital experiences with the PERN stack.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#about" className="hover:text-emerald-500 transition-colors">About Story</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-emerald-500 transition-colors">Featured Projects</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-emerald-500 transition-colors">Skills Matrix</a>
              </li>
              <li>
                <a href="#playground" className="hover:text-emerald-500 transition-colors">Creative Playground</a>
              </li>
              <li>
                <a href="#blog" className="hover:text-emerald-500 transition-colors">Technical Journal</a>
              </li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
              Connect
            </h4>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-emerald-500/50 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-500 hover:border-blue-500/50 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@portfolio.local"
                aria-label="Send Email"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-500 hover:border-emerald-500/50 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Response time: typically within 24 hours.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <span>Engineered with precision using React, Express & PostgreSQL</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/admin/login"
              className="flex items-center gap-1 hover:text-emerald-500 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-500 transition-all"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

