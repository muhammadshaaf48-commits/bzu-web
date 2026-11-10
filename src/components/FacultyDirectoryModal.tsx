import React, { useState, useEffect } from 'react';
import { FacultyMember } from '../types/index.ts';

interface FacultyDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FacultyDirectoryModal: React.FC<FacultyDirectoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [facultyList, setFacultyList] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [designationFilter, setDesignationFilter] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    fetch('/api/faculty-members')
      .then(res => res.json())
      .then(data => setFacultyList(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [isOpen]);

  if (!isOpen) return null;

  const designations = ['All', 'Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer'];

  const filtered = facultyList.filter(f => {
    if (designationFilter !== 'All' && f.designation !== designationFilter) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        f.name.toLowerCase().includes(q) ||
        f.departmentName.toLowerCase().includes(q) ||
        f.qualification.toLowerCase().includes(q) ||
        f.researchInterests.some(r => r.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col liquid-glass-elevated rounded-3xl border border-slate-300/30 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-6 border-b border-slate-300/15 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl liquid-pill flex items-center justify-center text-slate-100">
              <span className="material-symbols-outlined text-[22px]">co_present</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                BZU Faculty Directory &amp; Research Profiles
              </h2>
              <p className="text-xs text-slate-400">
                Official roster of 600 scholars and academic chairs across 72 departments (80.1% PhD qualified)
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

        {/* Filter Bar */}
        <div className="p-5 border-b border-slate-300/15 bg-slate-900/40 space-y-3">
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
            {designations.map(d => (
              <button
                key={d}
                onClick={() => setDesignationFilter(d)}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer font-medium ${
                  designationFilter === d
                    ? 'bg-slate-100 text-slate-950 font-bold'
                    : 'liquid-pill text-slate-300 hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search faculty by name, department, or research specialization (e.g. AI, Nanocatalysis, Power Electronics)..."
              className="w-full bg-slate-950/70 border border-slate-300/20 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-slate-100"
            />
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="text-center py-16 text-xs text-slate-400 font-mono">Loading faculty records...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 space-y-2">
              <span className="material-symbols-outlined text-4xl text-slate-500">person_search</span>
              <p className="text-sm font-semibold text-slate-300">No faculty members found</p>
              <p className="text-xs text-slate-500">Try adjusting your filters or search keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map(member => (
                <div
                  key={member.id}
                  className="liquid-glass rounded-2xl p-5 border border-slate-300/20 space-y-3.5 hover:border-slate-300/40 transition-all spotlight-card"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-100 text-base">{member.name}</h3>
                        {member.degreeHolderPhD && (
                          <span className="liquid-pill px-2 py-0.5 rounded text-[9px] font-mono text-cyan-300 font-semibold">
                            PhD
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 font-medium mt-0.5">{member.designation}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{member.departmentName}</p>
                    </div>

                    <div className="w-10 h-10 rounded-2xl liquid-pill flex items-center justify-center text-slate-200 shrink-0">
                      <span className="material-symbols-outlined text-[20px]">
                        {member.gender === 'Female' ? 'face_3' : 'face_6'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 bg-slate-950/50 p-2.5 rounded-xl border border-slate-300/10 leading-snug">
                    <span className="font-mono text-[10px] text-slate-400 uppercase block">Education:</span>
                    {member.qualification}
                  </p>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Research Interests:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {member.researchInterests.map((r, i) => (
                        <span key={i} className="liquid-pill px-2.5 py-0.5 rounded-lg text-[11px] text-slate-300">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-300/15 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">room</span>
                      {member.officeRoom}
                    </span>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-cyan-300 hover:text-white flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">mail</span>
                      {member.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-300/15 bg-slate-950/40 text-xs text-slate-400 flex items-center justify-between">
          <span>{filtered.length} faculty profiles listed</span>
          <span className="font-mono text-[11px]">BZU Academic HR Directorate</span>
        </div>
      </div>
    </div>
  );
};
