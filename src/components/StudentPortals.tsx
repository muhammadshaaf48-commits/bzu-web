import React from 'react';

interface StudentPortalsProps {
  onOpenAdmissions: (tab?: 'apply' | 'track' | 'calculator' | 'merit') => void;
  onOpenResults: () => void;
}

export const StudentPortals: React.FC<StudentPortalsProps> = ({ onOpenAdmissions, onOpenResults }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16" id="portals">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
        <span className="liquid-pill px-4 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.24em] text-slate-300">
          Affiliation &amp; Digital Services
        </span>
        <h2 className="text-3xl font-extrabold text-slate-100">Student &amp; Affiliated Portals</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Single-window access to essential academic slips, verification, and examination services.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {/* 1. Online Admission */}
        <button
          onClick={() => onOpenAdmissions('apply')}
          className="liquid-glass-elevated p-6 rounded-3xl text-center space-y-3 group transition-all spotlight-card active:scale-95 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl liquid-pill text-slate-200 flex items-center justify-center mx-auto group-hover:bg-slate-100 group-hover:text-slate-950 group-hover:scale-110 transition-all duration-300">
            <span className="material-symbols-outlined text-[24px]">how_to_reg</span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors">
              Online Admission
            </p>
            <span className="text-[11px] text-slate-400 mt-1 block">Private candidate desk</span>
          </div>
        </button>

        {/* 2. Registration Slip */}
        <button
          onClick={onOpenResults}
          className="liquid-glass-elevated p-6 rounded-3xl text-center space-y-3 group transition-all spotlight-card active:scale-95 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl liquid-pill text-slate-200 flex items-center justify-center mx-auto group-hover:bg-slate-100 group-hover:text-slate-950 group-hover:scale-110 transition-all duration-300">
            <span className="material-symbols-outlined text-[24px]">app_registration</span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors">
              Registration Slip
            </p>
            <span className="text-[11px] text-slate-400 mt-1 block">Affiliated college returns</span>
          </div>
        </button>

        {/* 3. Semester Results */}
        <button
          onClick={onOpenResults}
          className="liquid-glass-elevated p-6 rounded-3xl text-center space-y-3 group transition-all spotlight-card active:scale-95 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl liquid-pill text-slate-200 flex items-center justify-center mx-auto group-hover:bg-slate-100 group-hover:text-slate-950 group-hover:scale-110 transition-all duration-300">
            <span className="material-symbols-outlined text-[24px]">fact_check</span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors">
              Semester Results
            </p>
            <span className="text-[11px] text-slate-400 mt-1 block">Official grade verification</span>
          </div>
        </button>

        {/* 4. Roll No. Slips */}
        <button
          onClick={onOpenResults}
          className="liquid-glass-elevated p-6 rounded-3xl text-center space-y-3 group transition-all spotlight-card active:scale-95 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl liquid-pill text-slate-200 flex items-center justify-center mx-auto group-hover:bg-slate-100 group-hover:text-slate-950 group-hover:scale-110 transition-all duration-300">
            <span className="material-symbols-outlined text-[24px]">badge</span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors">
              Roll No. Slips
            </p>
            <span className="text-[11px] text-slate-400 mt-1 block">Exam hall tickets</span>
          </div>
        </button>
      </div>
    </section>
  );
};
