import React, { useState, useEffect } from 'react';
import { Program, FacultyMember, NewsBulletin } from '../types/index.ts';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProgram: (title: string) => void;
  onOpenAdmissions: () => void;
  onOpenResults: () => void;
  onOpenFaculty: () => void;
  onOpenAiAssistant: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProgram,
  onOpenAdmissions,
  onOpenResults,
  onOpenFaculty,
  onOpenAiAssistant,
}) => {
  const [query, setQuery] = useState('');
  const [programs, setPrograms] = useState<Program[]>([]);
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [news, setNews] = useState<NewsBulletin[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    Promise.all([
      fetch('/api/programs').then(r => r.json()),
      fetch('/api/faculty-members').then(r => r.json()),
      fetch('/api/news').then(r => r.json()),
    ])
      .then(([p, f, n]) => {
        setPrograms(p);
        setFaculty(f);
        setNews(n);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedPrograms = q
    ? programs.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.departmentName.toLowerCase().includes(q) ||
          p.facultyName.toLowerCase().includes(q)
      )
    : [];

  const matchedFaculty = q
    ? faculty.filter(
        f =>
          f.name.toLowerCase().includes(q) ||
          f.departmentName.toLowerCase().includes(q) ||
          f.researchInterests.some(r => r.toLowerCase().includes(q))
      )
    : [];

  const matchedNews = q
    ? news.filter(
        n =>
          n.title.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl liquid-glass-elevated rounded-3xl border border-slate-300/30 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-300/20 flex items-center gap-3">
          <span className="material-symbols-outlined text-slate-400 text-[22px]">search</span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type anything (e.g. 'BS Computer Science', 'Admissions', 'Merit', 'Dr. Zubair')..."
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded-lg liquid-pill text-[10px] font-mono text-slate-400">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg liquid-pill text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* Quick Links Row */}
        <div className="px-4 py-2.5 bg-slate-900/50 border-b border-slate-300/10 flex items-center gap-2 overflow-x-auto text-[11px] text-slate-300">
          <span className="text-slate-500 font-mono">Quick:</span>
          <button
            onClick={() => {
              onClose();
              onOpenAdmissions();
            }}
            className="liquid-pill px-2.5 py-1 rounded-lg hover:text-white cursor-pointer"
          >
            Admissions Fall 2026
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenResults();
            }}
            className="liquid-pill px-2.5 py-1 rounded-lg hover:text-white cursor-pointer"
          >
            Exam Results &amp; Slips
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenFaculty();
            }}
            className="liquid-pill px-2.5 py-1 rounded-lg hover:text-white cursor-pointer"
          >
            Faculty Directory
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenAiAssistant();
            }}
            className="liquid-pill px-2.5 py-1 rounded-lg text-cyan-300 hover:text-white cursor-pointer"
          >
            BZU AI Assistant
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="text-center py-10 text-xs text-slate-400 font-mono">Indexing university database...</div>
          ) : !q ? (
            <div className="text-center py-10 space-y-2">
              <span className="material-symbols-outlined text-3xl text-slate-600">travel_explore</span>
              <p className="text-xs text-slate-400">
                Type keywords to explore degree programs, faculty members, and campus notices.
              </p>
            </div>
          ) : matchedPrograms.length === 0 && matchedFaculty.length === 0 && matchedNews.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No results found for "<span className="text-slate-200">{query}</span>"
            </div>
          ) : (
            <>
              {/* Matched Programs */}
              {matchedPrograms.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">
                    Degree Programs ({matchedPrograms.length})
                  </span>
                  {matchedPrograms.slice(0, 4).map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onClose();
                        onSelectProgram(p.title);
                      }}
                      className="p-3 rounded-2xl liquid-glass hover:border-slate-300/40 flex items-center justify-between cursor-pointer group"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-100 group-hover:text-white">{p.title}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{p.departmentName} • {p.level}</p>
                      </div>
                      <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Matched Faculty */}
              {matchedFaculty.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">
                    Faculty Scholars ({matchedFaculty.length})
                  </span>
                  {matchedFaculty.slice(0, 3).map(f => (
                    <div
                      key={f.id}
                      onClick={() => {
                        onClose();
                        onOpenFaculty();
                      }}
                      className="p-3 rounded-2xl liquid-glass hover:border-slate-300/40 flex items-center justify-between cursor-pointer group"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-100">{f.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{f.designation} • {f.departmentName}</p>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300">{f.email}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Matched News */}
              {matchedNews.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">
                    Gazette &amp; Notices ({matchedNews.length})
                  </span>
                  {matchedNews.slice(0, 3).map(n => (
                    <div
                      key={n.id}
                      className="p-3 rounded-2xl liquid-glass space-y-1"
                    >
                      <span className="liquid-pill px-2 py-0.5 rounded text-[9px] font-mono text-cyan-300">
                        {n.category}
                      </span>
                      <p className="text-xs font-semibold text-slate-100">{n.title}</p>
                      <p className="text-[11px] text-slate-400 leading-snug">{n.summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
