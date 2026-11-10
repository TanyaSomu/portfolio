import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Terminal } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-slate-50 dark:bg-[#070A12]">
      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mb-6">
        <Terminal className="w-8 h-8" />
      </div>
      <h1 className="text-6xl font-display font-extrabold text-slate-900 dark:text-white mb-2">
        404
      </h1>
      <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
        Page or Route Not Found
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-6">
        The requested URL was not found on this developer portfolio server. Check your link or return to safety.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
};

