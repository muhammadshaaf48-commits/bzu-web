import React, { useState } from 'react';

interface HeaderProps {
  onOpenAdmissions: () => void;
  onOpenAcademics: (level?: string) => void;
  onOpenResults: () => void;
  onOpenFaculty: () => void;
  onOpenSearch: () => void;
  onOpenContact: () => void;
  onOpenAiAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAdmissions,
  onOpenAcademics,
  onOpenResults,
  onOpenFaculty,
  onOpenSearch,
  onOpenContact,
  onOpenAiAssistant,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Real-time Streamer Pill */}
      <div className="relative z-50 w-full pt-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto liquid-pill rounded-full py-1.5 px-4 sm:px-6 flex items-center justify-between text-xs text-slate-300 sheen-overlay">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-950 font-semibold text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded-full shrink-0 shadow-[0_0_14px_rgba(241,245,249,0.55)]">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 beacon-dot"></span>
              Live Stream
            </span>
            <div className="relative overflow-hidden whitespace-nowrap text-slate-300 font-normal">
              <div className="inline-flex items-center gap-8 animate-marquee text-[12px]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-slate-100 font-medium">Holiday Notice:</span>
                  BZU Closed Nov 9 for Allama Iqbal Day
                </span>
                <span className="text-slate-400/40">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-slate-100 font-medium">Admissions Fall 2026:</span>
                  3rd Merit Lists Declared for BS &amp; Graduate Programs
                </span>
                <span className="text-slate-400/40">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-slate-100 font-medium">Financial Aid:</span>
                  HEC Need-Based Scholarships Open (3,900+ Allocated)
                </span>
                <span className="text-slate-400/40">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-slate-100 font-medium">Professorial Vacancies:</span>
                  Engineering, Pharmacy &amp; Natural Sciences
                </span>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-slate-400 text-[11px] shrink-0 font-medium pl-4 border-l border-slate-300/15">
            <a className="hover:text-slate-100 transition-colors active:scale-95" href="tel:+92619210071">
              (+92) 61 9210071
            </a>
            <span className="text-slate-500/40">|</span>
            <button onClick={() => onOpenContact()} className="hover:text-slate-100 transition-colors cursor-pointer active:scale-95">
              Registrar Desk
            </button>
            <span className="text-slate-500/40">|</span>
            <button onClick={() => onOpenResults()} className="hover:text-slate-100 transition-colors cursor-pointer active:scale-95">
              Roll Slips &amp; Results
            </button>
            <span className="inline-flex items-center gap-1 text-slate-200 bg-slate-200/10 px-2 py-0.5 rounded-full border border-slate-300/25 text-[10px] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200 beacon-dot"></span> HEC Verified
            </span>
          </div>
        </div>
      </div>

      {/* Floating Liquid Glass Island Navigation */}
      <header className="sticky top-4 z-50 w-full px-4 sm:px-8 mt-2">
        <div className="max-w-7xl mx-auto liquid-glass-elevated rounded-3xl px-5 sm:px-8 py-3.5 flex items-center justify-between transition-all duration-300 sheen-overlay">
          {/* Crest & Name */}
          <a className="flex items-center gap-3.5 group active:scale-95 transition-transform" href="#">
            <div className="relative p-1.5 rounded-2xl liquid-pill group-hover:border-slate-200/50 transition-colors shadow-sm">
              <img
                alt="BZU Crest"
                className="h-8 w-auto object-contain brightness-0 invert opacity-95 group-hover:scale-110 transition-transform duration-300"
                src="https://lh3.googleusercontent.com/aida/ALJJyrAYIcjrV7aPgIrZRDwcnduL1RAFi0MHk5awlP4KIjHyBSBjXokZXYwBA07HCS95IR_Mw23VitRUNPSkqg0JzeUvd_uXnmBB9wN_E9t1JGzKmZAq2whQ_aE-_31yZdI-FZpVCwnqwYP2Zn2Dg8aXTLGJfMViNu1Fkn9cj1mv8eJOt4X85URaek1Tj7fwcM_P8IyT3DzMC1Vk0P8v3vBd6i4xaGqc-YF-AveY1rI3Oh7W"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-[15px] sm:text-[16px] text-slate-100 group-hover:text-white transition-colors flex items-center gap-1.5">
                Bahauddin Zakariya University
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-[0.22em] text-slate-400">
                Multan, PK • Est. 1975
              </span>
            </div>
          </a>

          {/* Glass Pill Navigation */}
          <nav className="hidden xl:flex items-center liquid-pill rounded-full px-2 py-1 gap-1 text-[13px] tracking-wide text-slate-300 font-medium">
            <a
              className="px-4 py-1.5 rounded-full hover:text-slate-100 hover:bg-slate-100/10 transition-all active:scale-95"
              href="#about-section"
            >
              About
            </a>
            <button
              onClick={() => onOpenAcademics()}
              className="px-4 py-1.5 rounded-full hover:text-slate-100 hover:bg-slate-100/10 transition-all cursor-pointer active:scale-95"
            >
              Academics
            </button>
            <button
              onClick={() => onOpenAdmissions()}
              className="px-4 py-1.5 rounded-full bg-slate-100/15 text-slate-100 font-semibold shadow-[0_0_14px_rgba(241,245,249,0.2)] border border-slate-300/30 transition-all cursor-pointer active:scale-95"
            >
              Admissions
            </button>
            <button
              onClick={() => onOpenResults()}
              className="px-4 py-1.5 rounded-full hover:text-slate-100 hover:bg-slate-100/10 transition-all cursor-pointer active:scale-95"
            >
              Results
            </button>
            <a
              className="px-4 py-1.5 rounded-full hover:text-slate-100 hover:bg-slate-100/10 transition-all active:scale-95"
              href="#research"
            >
              Research
            </a>
            <button
              onClick={() => onOpenFaculty()}
              className="px-4 py-1.5 rounded-full hover:text-slate-100 hover:bg-slate-100/10 transition-all cursor-pointer active:scale-95"
            >
              Faculty
            </button>
            <a
              className="px-4 py-1.5 rounded-full hover:text-slate-100 hover:bg-slate-100/10 transition-all active:scale-95"
              href="#portals"
            >
              Portals
            </a>
          </nav>

          {/* Glass Action Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              aria-label="Global Search"
              className="w-10 h-10 rounded-2xl liquid-pill text-slate-300 hover:text-white hover:border-slate-300/50 flex items-center justify-center transition-all cursor-pointer active:scale-90"
              title="Search (Ctrl + K)"
            >
              <span className="material-symbols-outlined text-[19px]">search</span>
            </button>

            <button
              onClick={onOpenAiAssistant}
              aria-label="BZU AI Assistant"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-2xl liquid-pill text-slate-200 hover:text-white hover:border-slate-300/50 text-xs font-medium transition-all cursor-pointer active:scale-90"
              title="BZU Academic AI Assistant"
            >
              <span className="material-symbols-outlined text-[17px] text-cyan-300">psychology</span>
              <span className="hidden md:inline">BZU AI</span>
            </button>

            <button
              onClick={onOpenAdmissions}
              className="relative group overflow-hidden px-4 sm:px-5 py-2.5 rounded-2xl bg-slate-100 text-slate-950 text-[12px] font-bold tracking-wider uppercase hover:bg-white transition-all shadow-[0_0_25px_rgba(241,245,249,0.45)] flex items-center gap-1.5 sheen-overlay cursor-pointer active:scale-95"
            >
              <span>Apply Online</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
                north_east
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-10 h-10 rounded-2xl liquid-pill text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-90"
              aria-label="Open Mobile Menu"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 max-w-7xl mx-auto liquid-glass-elevated rounded-3xl p-5 border border-slate-300/20 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAcademics();
                }}
                className="p-3 rounded-2xl liquid-pill text-left text-slate-200 font-medium flex items-center gap-2 hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                Academics
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmissions();
                }}
                className="p-3 rounded-2xl liquid-pill text-left text-slate-200 font-medium flex items-center gap-2 hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-[18px]">school</span>
                Admissions Fall 2026
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResults();
                }}
                className="p-3 rounded-2xl liquid-pill text-left text-slate-200 font-medium flex items-center gap-2 hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-[18px]">fact_check</span>
                Results &amp; Slips
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFaculty();
                }}
                className="p-3 rounded-2xl liquid-pill text-left text-slate-200 font-medium flex items-center gap-2 hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-[18px]">co_present</span>
                Faculty Directory
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiAssistant();
                }}
                className="p-3 rounded-2xl liquid-pill text-left text-cyan-300 font-medium flex items-center gap-2 hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-[18px]">psychology</span>
                BZU AI Assistant
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="p-3 rounded-2xl liquid-pill text-left text-slate-200 font-medium flex items-center gap-2 hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-[18px]">contact_support</span>
                Contact Desk
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
