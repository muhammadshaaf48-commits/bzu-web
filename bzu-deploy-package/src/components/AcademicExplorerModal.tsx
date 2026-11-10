import React, { useState, useEffect } from 'react';
import { Faculty, Program, DegreeLevel } from '../types/index.ts';

interface AcademicExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLevel?: string;
  initialFacultyId?: string;
  onApplyForProgram: (programTitle: string) => void;
}

export const AcademicExplorerModal: React.FC<AcademicExplorerModalProps> = ({
  isOpen,
  onClose,
  initialLevel,
  initialFacultyId,
  onApplyForProgram,
}) => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string>(initialLevel || 'All');
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>(initialFacultyId || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProgram, setActiveProgram] = useState<Program | null>(null);

  useEffect(() => {
    if (initialLevel) setSelectedLevel(initialLevel);
  }, [initialLevel]);

  useEffect(() => {
    if (initialFacultyId) setSelectedFacultyId(initialFacultyId);
  }, [initialFacultyId]);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    Promise.all([
      fetch('/api/faculties').then(res => res.json()),
      fetch('/api/programs').then(res => res.json()),
    ])
      .then(([facData, progData]) => {
        setFaculties(facData);
        setPrograms(progData);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [isOpen]);

  if (!isOpen) return null;

  const levels: string[] = [
    'All',
    'Undergraduate',
    'Lateral BS (5th Sem)',
    'MS / M.Phil',
    'Doctoral (PhD)',
    'Associate Degree (ADP)',
    'Diploma',
  ];

  const filteredPrograms = programs.filter(prog => {
    if (selectedLevel !== 'All' && prog.level !== selectedLevel) return false;
    if (selectedFacultyId !== 'All' && prog.facultyId !== selectedFacultyId) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        prog.title.toLowerCase().includes(q) ||
        prog.departmentName.toLowerCase().includes(q) ||
        prog.description.toLowerCase().includes(q) ||
        prog.eligibility.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col liquid-glass-elevated rounded-3xl border border-slate-300/30 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-300/15 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl liquid-pill flex items-center justify-center text-slate-100">
              <span className="material-symbols-outlined text-[22px]">menu_book</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                BZU Academic Degree Explorer
                <span className="text-xs px-2.5 py-0.5 rounded-full liquid-pill font-mono text-cyan-300">
                  Fall 2026
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Browse official accredited programs across 10 faculties and 72 departments
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl liquid-pill text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-90"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="p-5 border-b border-slate-300/15 bg-slate-900/40 space-y-3.5">
          {/* Degree Level Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            {levels.map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer font-medium ${
                  selectedLevel === lvl
                    ? 'bg-slate-100 text-slate-950 font-bold shadow-[0_0_15px_rgba(241,245,249,0.35)]'
                    : 'liquid-pill text-slate-300 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Search & Faculty Select */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-8 relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search programs by title, department, or keyword (e.g. AI, Civil, Pharmacy, Law)..."
                className="w-full bg-slate-950/70 border border-slate-300/20 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-slate-100 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="sm:col-span-4">
              <select
                value={selectedFacultyId}
                onChange={e => setSelectedFacultyId(e.target.value)}
                aria-label="Filter by Faculty"
                className="w-full bg-slate-950/70 border border-slate-300/20 rounded-2xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-slate-100 transition-colors"
              >
                <option value="All">All 10 Faculties</option>
                {faculties.map(fac => (
                  <option key={fac.id} value={fac.id}>
                    {fac.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content Body: Program Grid or Detail */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <div className="w-8 h-8 rounded-full border-2 border-slate-300 border-t-transparent animate-spin"></div>
              <p className="text-xs text-slate-400 font-mono">Loading university curriculum database...</p>
            </div>
          ) : filteredPrograms.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <span className="material-symbols-outlined text-4xl text-slate-500">search_off</span>
              <p className="text-sm font-semibold text-slate-300">No matching degree programs found</p>
              <p className="text-xs text-slate-500">Try adjusting your filters or search keywords.</p>
              <button
                onClick={() => {
                  setSelectedLevel('All');
                  setSelectedFacultyId('All');
                  setSearchQuery('');
                }}
                className="px-4 py-1.5 rounded-xl liquid-pill text-xs text-slate-300 hover:text-white cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPrograms.map(prog => (
                <div
                  key={prog.id}
                  className="liquid-glass rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-300/40 transition-all spotlight-card group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full liquid-pill text-[10px] font-mono text-cyan-300 font-medium">
                        {prog.level}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {prog.duration}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-100 group-hover:text-white transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-slate-500">domain</span>
                      {prog.departmentName}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {prog.description}
                    </p>

                    <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-300/10 text-[11px] text-slate-300 space-y-1">
                      <p className="font-semibold text-slate-200 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-amber-300">check_circle</span>
                        Eligibility:
                      </p>
                      <p className="text-slate-400 leading-snug">{prog.eligibility}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-300/15 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-500 block">Semester Fee</span>
                      <span className="font-bold text-slate-200">
                        PKR {prog.annualFeePKR.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveProgram(prog)}
                        className="px-3 py-1.5 rounded-xl liquid-pill text-slate-300 hover:text-white font-medium cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          onApplyForProgram(prog.title);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-950 font-bold hover:bg-white transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                      >
                        <span>Apply</span>
                        <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-300/15 bg-slate-950/40 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filteredPrograms.length} degree programs</span>
          <span className="font-mono text-[11px] text-slate-400">
            Admissions Desk: registrar@bzu.edu.pk | UAN 111-222-298
          </span>
        </div>
      </div>

      {/* Program Details Modal */}
      {activeProgram && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-2xl w-full liquid-glass-elevated rounded-3xl p-6 border border-slate-300/30 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="liquid-pill px-3 py-1 rounded-full text-[10px] font-mono text-cyan-300">
                  {activeProgram.level}
                </span>
                <h3 className="text-xl font-bold text-slate-100 mt-2">{activeProgram.title}</h3>
                <p className="text-xs text-slate-400">{activeProgram.facultyName} • {activeProgram.departmentName}</p>
              </div>
              <button
                onClick={() => setActiveProgram(null)}
                className="w-8 h-8 rounded-lg liquid-pill text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{activeProgram.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="liquid-glass p-3 rounded-xl">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Duration</span>
                <span className="font-bold text-slate-100">{activeProgram.duration}</span>
              </div>
              <div className="liquid-glass p-3 rounded-xl">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Total Credits</span>
                <span className="font-bold text-slate-100">{activeProgram.creditHours} Credit Hours</span>
              </div>
              <div className="liquid-glass p-3 rounded-xl">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Approx. Fee</span>
                <span className="font-bold text-slate-100">PKR {activeProgram.annualFeePKR.toLocaleString()}</span>
              </div>
            </div>

            <div className="liquid-glass p-3.5 rounded-xl space-y-1 text-xs">
              <p className="font-bold text-slate-200">Statutory Eligibility:</p>
              <p className="text-slate-300">{activeProgram.eligibility}</p>
            </div>

            {activeProgram.careerProspects && activeProgram.careerProspects.length > 0 && (
              <div className="space-y-1.5 text-xs">
                <p className="font-bold text-slate-300 font-mono text-[11px] uppercase">Career &amp; Industry Tracks:</p>
                <div className="flex flex-wrap gap-1.5">
                  {activeProgram.careerProspects.map((c, i) => (
                    <span key={i} className="liquid-pill px-2.5 py-1 rounded-lg text-slate-300">
                      • {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-300/15 flex justify-end gap-3">
              <button
                onClick={() => setActiveProgram(null)}
                className="px-4 py-2 rounded-xl liquid-pill text-xs text-slate-300 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const title = activeProgram.title;
                  setActiveProgram(null);
                  onClose();
                  onApplyForProgram(title);
                }}
                className="px-5 py-2 rounded-xl bg-slate-100 text-slate-950 text-xs font-bold hover:bg-white transition-all cursor-pointer"
              >
                Apply for {activeProgram.title}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
