import React, { useState } from 'react';
import { Play, RotateCcw, Database, Code, Sparkles, Terminal, Activity } from 'lucide-react';

export const PlaygroundSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sql' | 'sorting'>('sql');

  // SQL Playground State
  const [sqlQuery, setSqlQuery] = useState<string>(
    `SELECT p.full_name, t.specialization, COUNT(a.id) AS total_sessions\nFROM patients p\nJOIN therapists t ON p.assigned_therapist_id = t.id\nLEFT JOIN assessments a ON a.patient_id = p.id\nGROUP BY p.full_name, t.specialization\nORDER BY total_sessions DESC;`
  );
  const [sqlResult, setSqlResult] = useState<any[]>([
    { full_name: 'Sarah Connor', specialization: 'Orthopedic Rehabilitation', total_sessions: 14 },
    { full_name: 'David Miller', specialization: 'Sports Injury Therapy', total_sessions: 9 },
    { full_name: 'Elena Rostova', specialization: 'Neurological Physio', total_sessions: 6 },
  ]);
  const [queryExecuting, setQueryExecuting] = useState(false);

  // Sorting Visualizer State
  const [array, setArray] = useState<number[]>([45, 12, 85, 32, 89, 21, 64, 55, 98, 14, 73]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const runSqlSimulation = () => {
    setQueryExecuting(true);
    setTimeout(() => {
      setQueryExecuting(false);
    }, 400);
  };

  const randomizeArray = () => {
    if (isSorting) return;
    const newArr = Array.from({ length: 11 }, () => Math.floor(Math.random() * 85) + 15);
    setArray(newArr);
    setActiveIndices([]);
  };

  const runBubbleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        await new Promise((res) => setTimeout(res, 80));

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
        }
      }
    }

    setActiveIndices([]);
    setIsSorting(false);
  };

  return (
    <section id="playground" className="py-20 border-t border-slate-200/60 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <span className="text-xs font-mono font-semibold tracking-wider text-violet-600 dark:text-violet-400 uppercase bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
            Creative Sandbox
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Engineering Playground & Prototypes
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Interactive micro-applications illustrating database querying, relational algebra, and algorithmic principles.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('sql')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'sql'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>SQL Relational Visualizer</span>
            </button>
            <button
              onClick={() => setActiveTab('sorting')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'sorting'
                  ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Algorithm Sorting Canvas</span>
            </button>
          </div>
        </div>

        {/* Experiment 1: SQL Relational Visualizer */}
        {activeTab === 'sql' && (
          <div className="max-w-4xl mx-auto rounded-3xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800/80 shadow-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-500" />
                  <span>PostgreSQL Query Execution Sandbox</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Simulating relational schema joins and indexed aggregation
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={runSqlSimulation}
                  disabled={queryExecuting}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{queryExecuting ? 'Executing...' : 'Run Query'}</span>
                </button>
              </div>
            </div>

            {/* SQL Code Block */}
            <div className="rounded-2xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 border border-slate-800 mb-6 overflow-x-auto">
              <pre className="whitespace-pre-wrap">{sqlQuery}</pre>
            </div>

            {/* Results Table */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>QUERY OUTPUT (3 rows returned in 2.4ms)</span>
                <span className="text-emerald-500 font-semibold">Indexed Index Scan (cost=0.15..8.25)</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3">full_name</th>
                      <th className="p-3">specialization</th>
                      <th className="p-3 text-right">total_sessions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 font-mono text-slate-800 dark:text-slate-200">
                    {sqlResult.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-3 font-sans font-medium">{row.full_name}</td>
                        <td className="p-3 text-slate-500 dark:text-slate-400">{row.specialization}</td>
                        <td className="p-3 text-right text-emerald-500 font-bold">{row.total_sessions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Experiment 2: Algorithm Sorting Canvas */}
        {activeTab === 'sorting' && (
          <div className="max-w-4xl mx-auto rounded-3xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800/80 shadow-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-violet-500" />
                  <span>Sorting Algorithm Execution Visualizer</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Visualizing comparison swaps and in-place algorithmic mutations
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={randomizeArray}
                  disabled={isSorting}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Randomize</span>
                </button>
                <button
                  onClick={runBubbleSort}
                  disabled={isSorting}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isSorting ? 'Sorting...' : 'Start Sort'}</span>
                </button>
              </div>
            </div>

            {/* Bars Visualization Canvas */}
            <div className="h-64 flex items-end justify-center gap-2 sm:gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-4">
              {array.map((val, idx) => {
                const isActive = activeIndices.includes(idx);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400">{val}</span>
                    <div
                      className={`w-full rounded-t-lg transition-all duration-75 ${
                        isActive
                          ? 'bg-amber-400 shadow-glow-amber'
                          : 'bg-violet-500 dark:bg-violet-400'
                      }`}
                      style={{ height: `${val * 2.2}px` }}
                    ></div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2">
              <span>Time Complexity: O(n²) worst / O(n) best</span>
              <span>Space Complexity: O(1) in-place auxiliary space</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

