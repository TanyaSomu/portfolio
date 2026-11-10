import React, { useEffect, useState } from 'react';
import { FileText, Download, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { fetchActiveResume } from '../../services/api';
import { ResumeMetadata } from '../../types';

export const ResumeSection: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeMetadata | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const data = await fetchActiveResume();
        setIsAvailable(data.available);
        if (data.resume) {
          setResumeData(data.resume);
        }
      } catch (err) {
        setIsAvailable(false);
      } finally {
        setLoading(false);
      }
    };
    loadResume();
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (!bytes) return '0 KB';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(2)} MB`;
  };

  return (
    <section id="resume" className="py-20 border-t border-slate-200/60 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <span className="text-xs font-mono font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Official Curriculum Vitae
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Resume Preview & Verification
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Inspect verified credentials, education, and technical experience in the embedded document viewer.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header Card with Meta & Action Buttons */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800/80 shadow-card-light dark:shadow-card-dark mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {resumeData?.originalName || 'Curriculum Vitae'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {resumeData ? `Size: ${formatFileSize(resumeData.fileSize)} • Downloaded ${resumeData.downloadCount} times` : 'Status: Ready for Upload'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <a
                href="/api/resume/preview"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Tab</span>
              </a>

              <a
                href="/api/resume/download"
                download
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-md shadow-emerald-600/20"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>

          {/* Embedded PDF Viewer Box */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl bg-slate-950">
            {isAvailable ? (
              <iframe
                src="/api/resume/preview#toolbar=1&navpanes=0&scrollbar=1"
                title="Resume Document Preview"
                className="w-full h-[650px] border-none"
              />
            ) : (
              <div className="h-96 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">No Resume PDF Uploaded Yet</h4>
                  <p className="text-xs text-slate-400 max-w-md">
                    The portfolio owner can upload the official document at any time through the secure Admin Dashboard.
                  </p>
                </div>
                <a
                  href="/admin/login"
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors"
                >
                  Upload via Admin Portal
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

