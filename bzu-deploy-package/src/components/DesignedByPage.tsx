import React from 'react';

interface DesignedByPageProps {
  onBackToHome: () => void;
  onOpenAdmissions: () => void;
  onOpenAcademics: () => void;
  onOpenAiAssistant: () => void;
}

export const DesignedByPage: React.FC<DesignedByPageProps> = ({
  onBackToHome,
  onOpenAdmissions,
  onOpenAcademics,
  onOpenAiAssistant,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-12 animate-in fade-in duration-300">
      {/* Top Navigation Bar / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-300/15">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <button
            onClick={onBackToHome}
            className="hover:text-slate-200 transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="text-slate-300">Institutional Projects</span>
          <span>/</span>
          <span className="text-cyan-300 font-semibold">Designed By</span>
        </div>

        <button
          onClick={onBackToHome}
          className="liquid-pill px-4 py-2 rounded-2xl text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 self-start sm:self-auto cursor-pointer active:scale-95 transition-all group"
        >
          <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          <span>Back to University Portal</span>
        </button>
      </div>

      {/* Main Profile Showcase Section */}
      <section className="relative liquid-glass-elevated rounded-3xl p-6 sm:p-12 overflow-hidden border border-slate-300/25 spotlight-card sheen-overlay">
        {/* Background Ambient Glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(248,250,252,0.15)_0%,transparent_70%)] blur-2xl pointer-events-none orb-anim-1"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1)_0%,transparent_70%)] blur-2xl pointer-events-none orb-anim-2"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Avatar Column */}
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="relative group">
              {/* Profile Avatar Outer Ring */}
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1.5 liquid-glass-elevated border-2 border-slate-200/40 shadow-[0_0_35px_rgba(241,245,249,0.3)] transition-all duration-500 group-hover:scale-105 group-hover:border-slate-100 flex items-center justify-center">
                {/* Inner Image / Monogram Placeholder */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-slate-300/20 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="w-20 h-20 rounded-2xl liquid-pill flex items-center justify-center text-slate-100 shadow-inner mb-1">
                    <span className="material-symbols-outlined text-4xl text-cyan-300">
                      terminal
                    </span>
                  </div>
                  <span className="font-display font-black text-lg text-slate-100 tracking-wider">
                    MSA
                  </span>
                  <span className="text-[9px] font-mono uppercase text-slate-400 tracking-widest">
                    Dev Profile
                  </span>
                </div>
              </div>

              {/* Verified Beacon Badge */}
              <div className="absolute bottom-2 right-4 liquid-glass-elevated px-3 py-1 rounded-full text-[10px] font-mono text-slate-100 border border-slate-300/40 flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 beacon-dot"></span>
                <span>Verified Author</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="liquid-pill px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-300 font-semibold inline-block">
                Developer Credentials
              </span>
              <p className="text-xs text-slate-400 font-mono">
                Department of Computer Science &amp; IT
              </p>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-8 space-y-6 text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-pill text-[11px] font-mono uppercase text-slate-300">
                <span className="material-symbols-outlined text-[14px] text-cyan-300">code</span>
                Website Designer &amp; Developer
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-50 tracking-tight luminous-text-glow">
                Muhammad Shaaf Azhar
              </h1>

              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                Undergraduate Scholar in <strong className="text-slate-100 font-semibold">BS Data Science</strong> at{' '}
                <strong className="text-slate-100 font-semibold">Bahauddin Zakariya University (BZU), Multan</strong>.
              </p>
            </div>

            {/* Prominent Credit Callout Banner */}
            <div className="p-4 rounded-2xl liquid-glass border border-slate-300/30 flex items-center gap-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl liquid-pill flex items-center justify-center text-slate-100 shrink-0">
                <span className="material-symbols-outlined text-[20px] text-cyan-300">verified</span>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                  Official Attributed Credit
                </p>
                <p className="text-sm sm:text-base font-bold text-slate-100">
                  Designed &amp; Developed by Muhammad Shaaf Azhar
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onBackToHome}
                className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(241,245,249,0.35)] cursor-pointer active:scale-95"
              >
                Explore BZU Website
              </button>
              <button
                onClick={onOpenAdmissions}
                className="px-5 py-3 rounded-2xl liquid-pill text-slate-200 hover:text-white font-medium text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95"
              >
                Admissions Fall 2026
              </button>
              <button
                onClick={onOpenAiAssistant}
                className="px-5 py-3 rounded-2xl liquid-glass text-cyan-300 hover:text-white font-medium text-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                Ask BZU AI
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Academic Information Cards Grid */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="liquid-pill px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
            Official Academic Roster
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Full Name */}
          <div className="liquid-glass-elevated p-6 rounded-3xl space-y-2 spotlight-card transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
              <span>Full Name</span>
              <span className="material-symbols-outlined text-[18px] text-slate-300">badge</span>
            </div>
            <span className="text-lg font-bold text-slate-100 block">Muhammad Shaaf Azhar</span>
            <p className="text-[11px] text-slate-400 font-mono">Lead Author &amp; Architect</p>
          </div>

          {/* Card 2: Degree & Class */}
          <div className="liquid-glass-elevated p-6 rounded-3xl space-y-2 spotlight-card transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
              <span>Class &amp; Major</span>
              <span className="material-symbols-outlined text-[18px] text-cyan-300">school</span>
            </div>
            <span className="text-lg font-bold text-slate-100 block">BS Data Science</span>
            <p className="text-[11px] text-slate-400 font-mono">Computing &amp; Analytics</p>
          </div>

          {/* Card 3: Session & Semester */}
          <div className="liquid-glass-elevated p-6 rounded-3xl space-y-2 spotlight-card transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
              <span>Session &amp; Term</span>
              <span className="material-symbols-outlined text-[18px] text-slate-300">date_range</span>
            </div>
            <span className="text-lg font-bold text-slate-100 block">2026–2030</span>
            <p className="text-[11px] text-slate-400 font-mono">1st Semester</p>
          </div>

          {/* Card 4: Roll Number */}
          <div className="liquid-glass-elevated p-6 rounded-3xl space-y-2 spotlight-card transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
              <span>Roll Number</span>
              <span className="material-symbols-outlined text-[18px] text-emerald-300">pin</span>
            </div>
            <span className="text-lg font-bold text-cyan-300 block font-mono">BSDSMF-26-29</span>
            <p className="text-[11px] text-slate-400 font-mono">Morning Regular Batch</p>
          </div>
        </div>

        {/* Secondary Row: Institutional Affiliation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
          <div className="liquid-glass p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl liquid-pill flex items-center justify-center text-slate-200 shrink-0">
              <span className="material-symbols-outlined text-[24px]">account_balance</span>
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 block">University</span>
              <span className="text-sm font-bold text-slate-100">
                Bahauddin Zakariya University (BZU), Multan
              </span>
            </div>
          </div>

          <div className="liquid-glass p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl liquid-pill flex items-center justify-center text-slate-200 shrink-0">
              <span className="material-symbols-outlined text-[24px]">domain</span>
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 block">Department</span>
              <span className="text-sm font-bold text-slate-100">
                Department of Computer Science &amp; IT
              </span>
            </div>
          </div>

          <div className="liquid-glass p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl liquid-pill flex items-center justify-center text-slate-200 shrink-0">
              <span className="material-symbols-outlined text-[24px]">hub</span>
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 block">Role in Project</span>
              <span className="text-sm font-bold text-cyan-300">
                Website Designer &amp; Developer
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About This Project Section */}
      <section className="relative liquid-glass-elevated rounded-3xl p-8 sm:p-12 overflow-hidden border border-slate-300/25 space-y-5 spotlight-card">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 beacon-dot"></span>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-300">
            Project Overview
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          About This Project
        </h2>

        {/* Exact description required by instruction */}
        <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-300/15">
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            "This website has been designed and developed as an academic project to provide a modern, accessible, and user-friendly digital experience. The project focuses on intuitive navigation, responsive design, and effective presentation of university-related information."
          </p>
        </div>

        {/* Technical Highlights Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
          <div className="liquid-glass p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-cyan-300">
              <span className="material-symbols-outlined text-[20px]">palette</span>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                Glacier Glassmorphism
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Crafted with high-fidelity frosted glass surfaces, subtle luminous borders, dynamic spotlight refractions, and responsive typography.
            </p>
          </div>

          <div className="liquid-glass p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-cyan-300">
              <span className="material-symbols-outlined text-[20px]">database</span>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                Full-Stack Architecture
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete backend REST APIs, relational PostgreSQL schemas, 10 Faculties, 72 Departments, and verified examination transcripts.
            </p>
          </div>

          <div className="liquid-glass p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-cyan-300">
              <span className="material-symbols-outlined text-[20px]">psychology</span>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                AI Academic Assistant
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Integrated dual-mode intelligence with low-latency responses via <span className="text-slate-200 font-mono">gemini-3.1-flash-lite</span> and high-thinking advisory via <span className="text-slate-200 font-mono">gemini-4-carbon</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Action Footer */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 border-t border-slate-300/15">
        <p className="font-mono text-[11px]">
          Academic Project • Bahauddin Zakariya University Multan • 2026
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-950 font-bold text-xs hover:bg-white transition-all cursor-pointer active:scale-95"
          >
            ← Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};
