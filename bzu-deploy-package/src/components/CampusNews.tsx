import React from 'react';
import { NewsBulletin } from '../types/index.ts';

interface CampusNewsProps {
  newsList: NewsBulletin[];
  customData?: Record<string, unknown>;
  onOpenAdmissions: (tab?: 'apply' | 'track' | 'calculator' | 'merit') => void;
  onOpenResults: () => void;
  onSelectNews: (news: NewsBulletin) => void;
  onOpenDataDirectory: () => void;
}

export const CampusNews: React.FC<CampusNewsProps> = ({
  newsList,
  customData,
  onOpenAdmissions,
  onOpenResults,
  onSelectNews,
  onOpenDataDirectory,
}) => {
  const customEntries = customData ? Object.entries(customData) : [];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-10" id="news">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="liquid-pill px-4 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.24em] text-slate-300">
          Gazette &amp; Notifications
        </span>
        <h2 className="text-3xl font-extrabold text-slate-100">Campus News &amp; Bulletins</h2>
        <p className="text-sm text-slate-400">
          Stay informed with verified notifications, examination schedules, vacancies, and executive announcements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Breaking News */}
        <div className="liquid-glass-elevated p-6 rounded-3xl flex flex-col justify-between space-y-4 spotlight-card group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-slate-100 text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Breaking
              </span>
              <span className="text-[11px] font-mono text-slate-400">Nov 2026</span>
            </div>
            <h3 className="text-base font-bold text-slate-100 leading-snug group-hover:text-white transition-colors">
              Latest News &amp; Media Coverage
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Press releases, convocations, university ceremonies, and media features.
            </p>
          </div>
          <button
            onClick={() => {
              const item = newsList.find(n => n.category === 'Breaking') || newsList[0];
              if (item) onSelectNews(item);
            }}
            className="text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1 uppercase font-mono active:scale-95 transition-all text-left cursor-pointer"
          >
            <span>All News</span>
            <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Card 2: Admissions & Merit */}
        <div className="liquid-glass-elevated p-6 rounded-3xl flex flex-col justify-between space-y-4 spotlight-card group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="liquid-pill text-slate-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Admissions
              </span>
              <span className="text-[11px] font-mono text-slate-400">Fall 2026</span>
            </div>
            <h3 className="text-base font-bold text-slate-100 leading-snug group-hover:text-white transition-colors">
              Schedules &amp; Merit Lists
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Entry test dates, fee schedules, departmental merit lists, and challan details.
            </p>
          </div>
          <button
            onClick={() => onOpenAdmissions('merit')}
            className="text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1 uppercase font-mono active:scale-95 transition-all text-left cursor-pointer"
          >
            <span>View Merit Lists</span>
            <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Card 3: Results & Date Sheets */}
        <div className="liquid-glass-elevated p-6 rounded-3xl flex flex-col justify-between space-y-4 spotlight-card group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="liquid-pill text-slate-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Controller
              </span>
              <span className="text-[11px] font-mono text-slate-400">Exams</span>
            </div>
            <h3 className="text-base font-bold text-slate-100 leading-snug group-hover:text-white transition-colors">
              Results &amp; Official Date Sheets
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Annual, semester, and supplementary timetables, roll number slips, and transcripts.
            </p>
          </div>
          <button
            onClick={onOpenResults}
            className="text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1 uppercase font-mono active:scale-95 transition-all text-left cursor-pointer"
          >
            <span>Check Results</span>
            <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Card 4: Vacancies */}
        <div className="liquid-glass-elevated p-6 rounded-3xl flex flex-col justify-between space-y-4 spotlight-card group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="liquid-pill text-slate-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Careers
              </span>
              <span className="text-[11px] font-mono text-slate-400">HR Cell</span>
            </div>
            <h3 className="text-base font-bold text-slate-100 leading-snug group-hover:text-white transition-colors">
              Jobs &amp; Faculty Vacancies
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Professors, Associate Professors, lab technologists, and executive administration.
            </p>
          </div>
          <button
            onClick={() => {
              const item = newsList.find(n => n.category === 'Careers') || newsList[3] || newsList[0];
              if (item) onSelectNews(item);
            }}
            className="text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1 uppercase font-mono active:scale-95 transition-all text-left cursor-pointer"
          >
            <span>View Vacancies</span>
            <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Live Official Bulletins Feed loaded from hosted JSON */}
      {newsList.length > 0 && (
        <div className="liquid-glass-elevated rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-300/15">
            <div>
              <h3 className="text-lg font-bold text-slate-100">Official University Notices</h3>
              <p className="text-xs text-slate-400">Live academic notices, scholarship calls, and schedules</p>
            </div>
            <button
              onClick={onOpenDataDirectory}
              className="liquid-pill px-4 py-2 rounded-xl text-xs font-medium text-cyan-300 hover:text-white flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">dataset</span>
              <span>Browse Full Data Directory</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newsList.map(item => (
              <button
                key={item.id}
                onClick={() => onSelectNews(item)}
                className="liquid-glass p-5 rounded-2xl text-left space-y-2.5 hover:border-slate-200/40 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="liquid-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono text-cyan-300">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{item.publishDate}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 group-hover:text-white leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.summary}</p>
                </div>
                <span className="text-[11px] font-mono text-slate-300 group-hover:text-cyan-300 flex items-center gap-1 pt-1">
                  <span>Read Bulletin</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Hosted JSON Collections (if user uploaded custom JSON keys or top-level array) */}
      {customEntries.length > 0 && (
        <div className="liquid-glass-elevated rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-300/15">
            <div>
              <h3 className="text-lg font-bold text-slate-100">Uploaded Host Data Records</h3>
              <p className="text-xs text-slate-400">Records loaded directly from your hosted JSON data file</p>
            </div>
            <button
              onClick={onOpenDataDirectory}
              className="liquid-pill px-4 py-2 rounded-xl text-xs font-medium text-cyan-300 hover:text-white flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">open_in_full</span>
              <span>Open Full Table View</span>
            </button>
          </div>

          {customEntries.map(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
              const firstObj = value.find(r => r && typeof r === 'object' && !Array.isArray(r)) as Record<string, unknown> | undefined;
              if (firstObj) {
                const columns = Object.keys(firstObj).slice(0, 6);
                return (
                  <div key={key} className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300">{key} ({value.length})</h4>
                    <div className="overflow-x-auto rounded-2xl border border-slate-300/15">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900/70 text-slate-300 font-mono uppercase text-[10px] border-b border-slate-300/15">
                          <tr>
                            {columns.map(col => (
                              <th key={col} className="py-3 px-4 whitespace-nowrap">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-300/10 text-slate-200">
                          {value.slice(0, 10).map((row, idx) => {
                            const rec = (row && typeof row === 'object' ? row : { value: row }) as Record<string, unknown>;
                            return (
                              <tr key={idx} className="hover:bg-white/[0.04]">
                                {columns.map(col => (
                                  <td key={col} className="py-3 px-4 max-w-xs truncate">
                                    {rec[col] !== undefined && rec[col] !== null
                                      ? typeof rec[col] === 'object'
                                        ? JSON.stringify(rec[col])
                                        : String(rec[col])
                                      : '—'}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              }
            }

            return (
              <div key={key} className="liquid-glass p-4 rounded-2xl space-y-1">
                <span className="text-[11px] font-mono uppercase text-cyan-300">{key}</span>
                <p className="text-xs text-slate-200 break-words">
                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

