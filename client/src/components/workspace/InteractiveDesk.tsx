import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal as TerminalIcon,
  Headphones,
  Coffee,
  Lightbulb,
  BookOpen,
  Camera,
  X,
  Play,
  Pause,
  Sparkles,
  Flame,
} from 'lucide-react';

export const InteractiveDesk: React.FC = () => {
  // Interactive state
  const [lampOn, setLampOn] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);
  const [cameraSnapped, setCameraSnapped] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [coffeeSips, setCoffeeSips] = useState(0);

  // Terminal CLI state
  const [terminalHistory, setTerminalHistory] = useState<
    Array<{ command: string; output: string | React.ReactNode }>
  >([
    {
      command: 'welcome',
      output: '⚡ Welcome to the Developer Workspace CLI! Type "help" for commands.',
    },
  ]);
  const [cliInput, setCliInput] = useState('');

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    let output: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = 'Available commands: about, skills, projects, contact, clear, matrix, sudo';
        break;
      case 'about':
        output = 'Full-Stack Developer & Database Architect specializing in the PERN stack (PostgreSQL, Express, React, Node.js).';
        break;
      case 'skills':
        output = 'Core: TypeScript, React, Node.js, Express, PostgreSQL, Prisma, Tailwind CSS, RESTful APIs, JWT & RBAC.';
        break;
      case 'projects':
        output = 'Featured: 1) SAAI Physiotherapy Clinic Platform (Play Store) 2) Railway Waiting Hall Billing System 3) Student Placement ERP.';
        break;
      case 'contact':
        output = 'Scrolling to contact form...';
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 400);
        break;
      case 'matrix':
        output = 'Wake up, Neo... Follow the white rabbit 🐇';
        break;
      case 'sudo':
        output = 'Permission granted. You are now the honorary superuser of this portfolio!';
        break;
      case 'clear':
        setTerminalHistory([]);
        setCliInput('');
        return;
      default:
        output = `Command not recognized: "${cmd}". Type "help" to see available commands.`;
    }

    setTerminalHistory((prev) => [...prev, { command: cliInput, output }]);
    setCliInput('');
  };

  const handleCoffeeClick = () => {
    setCoffeeSips((prev) => (prev < 4 ? prev + 1 : 0));
  };

  const handleCameraClick = () => {
    setCameraSnapped(true);
    setTimeout(() => {
      setCameraSnapped(false);
    }, 1800);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-8 select-none">
      {/* Ambient Lamp Lighting Cone Effect */}
      {lampOn && (
        <div className="absolute -top-16 right-16 w-80 h-96 bg-amber-400/10 dark:bg-amber-300/15 rounded-full blur-3xl pointer-events-none transition-opacity duration-700"></div>
      )}

      {/* Desk Mat / Worksurface Container */}
      <div
        className={`relative rounded-3xl p-6 sm:p-10 border transition-all duration-500 overflow-hidden shadow-2xl ${
          lampOn
            ? 'bg-gradient-to-b from-slate-900 via-[#101726] to-[#0A0E17] border-amber-500/20 shadow-amber-950/20'
            : 'bg-gradient-to-b from-slate-950 via-[#0B0F19] to-[#080C14] border-slate-800/80 shadow-black/40'
        }`}
      >
        {/* Subtle Grid Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        {/* Top Header Bar of Workspace */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800/60 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 animate-pulse"></span>
            <span className="text-xs font-mono font-medium text-slate-400 tracking-wider uppercase">
              Interactive Digital Desk • Click objects to explore
            </span>
          </div>

          {/* Lamp Quick Toggle */}
          <button
            onClick={() => setLampOn(!lampOn)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
              lampOn
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/20'
                : 'bg-slate-800/50 text-slate-400 border-slate-700/60 hover:text-slate-200'
            }`}
          >
            <Lightbulb className={`w-3.5 h-3.5 ${lampOn ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>{lampOn ? 'Lamp Lit' : 'Lamp Off'}</span>
          </button>
        </div>

        {/* Desktop Surface Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 relative z-10">
          {/* 1. Developer Laptop / CLI Terminal */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setTerminalOpen(true)}
            className="group cursor-pointer col-span-2 sm:col-span-2 p-5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/60 hover:border-emerald-500/50 backdrop-blur-sm transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <TerminalIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    Developer Laptop
                  </h4>
                  <p className="text-[11px] text-slate-400">Click to open interactive CLI</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ACTIVE
              </span>
            </div>

            {/* Laptop Screen Preview */}
            <div className="w-full bg-slate-950 rounded-xl p-3 border border-slate-800/80 font-mono text-[11px] space-y-1 text-slate-300">
              <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-800/60 text-slate-500">
                <span className="w-2 h-2 rounded-full bg-rose-500/70"></span>
                <span className="w-2 h-2 rounded-full bg-amber-500/70"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-500/70"></span>
                <span className="text-[10px] ml-1">bash — 80x24</span>
              </div>
              <p className="text-emerald-400">$ node --version</p>
              <p className="text-slate-400">v24.16.0 (PERN Architecture ready)</p>
              <p className="text-emerald-400 animate-pulse">$ type "help" to start_</p>
            </div>
          </motion.div>

          {/* 2. Headphones / Ambient Lo-Fi Beats */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setAudioPlaying(!audioPlaying)}
            className={`group cursor-pointer p-5 rounded-2xl border backdrop-blur-sm transition-all shadow-lg flex flex-col justify-between ${
              audioPlaying
                ? 'bg-violet-950/30 border-violet-500/50 shadow-violet-900/20'
                : 'bg-slate-800/40 hover:bg-slate-800/70 border-slate-700/60 hover:border-violet-500/40'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 border border-violet-500/30 flex items-center justify-center">
                <Headphones className="w-4 h-4" />
              </div>
              {audioPlaying ? (
                <Pause className="w-3.5 h-3.5 text-violet-400" />
              ) : (
                <Play className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
              )}
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white group-hover:text-violet-400 transition-colors">
                Studio Headphones
              </h4>
              <p className="text-[11px] text-slate-400">
                {audioPlaying ? 'Chill synth flow active' : 'Click to tune into lo-fi'}
              </p>
            </div>

            {/* Audio Wave Visualizer Animation */}
            <div className="flex items-end gap-1 h-6 pt-2">
              {[40, 70, 30, 90, 60, 80, 45, 95].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    audioPlaying
                      ? 'bg-violet-400 animate-pulse'
                      : 'bg-slate-700 h-2'
                  }`}
                  style={{
                    height: audioPlaying ? `${h}%` : '4px',
                    animationDelay: `${i * 100}ms`,
                  }}
                ></span>
              ))}
            </div>
          </motion.div>

          {/* 3. Ceramic Coffee Mug */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleCoffeeClick}
            className="group cursor-pointer p-5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/60 hover:border-amber-500/40 backdrop-blur-sm transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center relative">
                <Coffee className="w-4 h-4" />
                {/* Steam particles */}
                <motion.span
                  animate={{ y: [-2, -8, -12], opacity: [0.8, 0.4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute -top-1 w-1 h-1 bg-amber-300 rounded-full"
                ></motion.span>
              </div>
              <span className="text-[10px] font-mono text-amber-400">
                {['Full', '3/4', '1/2', 'Refilled!'][coffeeSips]}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                Coffee Mug
              </h4>
              <p className="text-[11px] text-slate-400">
                Fueling late-night query optimizations
              </p>
            </div>

            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden mt-3">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${100 - coffeeSips * 25}%` }}
              ></div>
            </div>
          </motion.div>

          {/* 4. Leather Journal / Philosophy Notebook */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setJournalOpen(true)}
            className="group cursor-pointer col-span-1 p-5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/60 hover:border-indigo-500/40 backdrop-blur-sm transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mb-3">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                Dev Journal
              </h4>
              <p className="text-[11px] text-slate-400">Click to flip open notes & ethos</p>
            </div>
          </motion.div>

          {/* 5. Instant Polaroid Camera */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCameraClick}
            className="group cursor-pointer col-span-1 p-5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/60 hover:border-rose-500/40 backdrop-blur-sm transition-all shadow-lg flex flex-col justify-between relative overflow-hidden"
          >
            {cameraSnapped && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-white z-20"
              />
            )}
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mb-3">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors">
                Polaroid
              </h4>
              <p className="text-[11px] text-slate-400">Click to snap a snapshot</p>
            </div>
          </motion.div>

          {/* 6. Pinned Sticky Notes */}
          <div className="col-span-2 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm shadow-lg flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Pinned Philosophy</span>
            </div>
            <p className="text-xs text-amber-200/90 italic leading-relaxed">
              "Normalize relational schemas to 3NF where clarity matters, index query execution paths for scale, and build UIs that feel like second nature."
            </p>
            <div className="mt-2 text-[10px] font-mono text-amber-400/80">
              #DatabaseDesign #CleanCode #FullStack
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Interactive Terminal Popout */}
      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          >
            <div className="w-full max-w-2xl bg-[#0B0F19] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden font-mono">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="text-xs text-slate-400 ml-2">portfolio-shell — interactive session</span>
                </div>
                <button
                  onClick={() => setTerminalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Terminal Scroll Area */}
              <div className="p-4 h-72 overflow-y-auto space-y-2 text-xs">
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-emerald-400">
                      <span className="text-slate-500">visitor@portfolio:~$</span> {item.command}
                    </p>
                    <div className="text-slate-300 pl-4">{item.output}</div>
                  </div>
                ))}
              </div>

              {/* Terminal Command Input Form */}
              <form
                onSubmit={handleCliSubmit}
                className="flex items-center gap-2 px-4 py-3 bg-slate-900/60 border-t border-slate-800"
              >
                <span className="text-emerald-400 text-xs font-mono">visitor@portfolio:~$</span>
                <input
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder="type a command (e.g. help, skills, contact)..."
                  autoFocus
                  className="flex-1 bg-transparent text-white text-xs font-mono outline-none placeholder:text-slate-600"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Dev Journal / Philosophy Popout */}
      <AnimatePresence>
        {journalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          >
            <div className="w-full max-w-lg bg-slate-900 rounded-2xl border border-indigo-500/30 p-6 shadow-2xl relative">
              <button
                onClick={() => setJournalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white font-display">
                  Developer Journal & Ethos
                </h3>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <h4 className="font-semibold text-emerald-400 text-xs mb-1">
                    1. Data Integrity & Normalization
                  </h4>
                  <p className="text-xs text-slate-400">
                    A solid relational foundation eliminates entire categories of application bugs before frontend code is even rendered.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <h4 className="font-semibold text-cyan-400 text-xs mb-1">
                    2. Resilient Micro-architectures
                  </h4>
                  <p className="text-xs text-slate-400">
                    REST APIs should fail gracefully, validate rigorously (Zod/TypeScript), and isolate critical database operations.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <h4 className="font-semibold text-violet-400 text-xs mb-1">
                    3. Delightful Digital Craft
                  </h4>
                  <p className="text-xs text-slate-400">
                    Functionality and visual poetry should coexist. Micro-interactions should reward curiosity without causing cognitive fatigue.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

