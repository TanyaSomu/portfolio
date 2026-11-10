import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, ExternalLink, Trophy, ShieldCheck, Sparkles } from 'lucide-react';
import { Certification, Achievement } from '../../types';

interface CertificationsSectionProps {
  certifications: Certification[];
  achievements: Achievement[];
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  achievements,
}) => {
  const activeCerts = certifications && certifications.length > 0 ? certifications : [];
  const activeAchievements = achievements && achievements.length > 0 ? achievements : [];

  return (
    <section id="certifications" className="py-24 border-t border-slate-200/60 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-3 mb-16"
        >
          <span className="text-xs font-mono font-semibold tracking-wider text-amber-600 dark:text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Validated Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Certifications & Milestones
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Formal technical certifications and real-world deployment milestones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Certifications */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>Official Technical Certifications</span>
            </h3>

            <div className="space-y-4">
              {activeCerts.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="p-6 rounded-2xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-emerald-500/40 transition-all flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-500 shrink-0" />
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {cert.name}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Issued by <span className="font-semibold text-emerald-600 dark:text-emerald-400">{cert.issuingOrg}</span>
                    </p>
                    {cert.credentialId && (
                      <p className="text-[11px] font-mono text-slate-400">
                        Credential ID: {cert.credentialId}
                      </p>
                    )}
                  </div>

                  {cert.verificationUrl && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl text-slate-400 hover:text-emerald-500 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
                      title="Verify Credential"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Achievements & Deployments */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Technical & Production Achievements</span>
            </h3>

            <div className="space-y-4">
              {activeAchievements.map((ach, idx) => (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="p-6 rounded-2xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-amber-500/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-semibold text-amber-500">
                      {ach.year}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      {ach.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {ach.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {ach.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
