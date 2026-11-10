import React from 'react';
import { NewsBulletin } from '../types/index.ts';

interface CampusNewsProps {
  newsList: NewsBulletin[];
  onOpenAdmissions: (tab?: 'apply' | 'track' | 'calculator' | 'merit') => void;
  onOpenResults: () => void;
  onSelectNews: (news: NewsBulletin) => void;
}

export const CampusNews: React.FC<CampusNewsProps> = ({
  newsList,
  onOpenAdmissions,
  onOpenResults,
  onSelectNews,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16" id="news">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
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
              const item = newsList.find(n => n.category === 'Careers') || newsList[3];
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
    </section>
  );
};
