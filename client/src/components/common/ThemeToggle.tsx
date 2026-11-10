import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`p-2 rounded-xl transition-all duration-300 border ${
        theme === 'dark'
          ? 'bg-slate-900/80 border-slate-800 text-amber-400 hover:bg-slate-800 hover:border-slate-700'
          : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 shadow-sm'
      } ${className}`}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
};

