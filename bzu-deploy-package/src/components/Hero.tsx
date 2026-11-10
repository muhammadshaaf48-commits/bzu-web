import React from 'react';

interface HeroProps {
  onOpenAdmissions: (tab?: 'apply' | 'track' | 'calculator' | 'merit') => void;
  onOpenAiAssistant: () => void;
  onOpenResults: () => void;
  onOpenAcademics: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAdmissions,
  onOpenAiAssistant,
  onOpenResults,
  onOpenAcademics,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Hero Glass Cluster */}
        <div className="lg:col-span-7 space-y-7">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full liquid-pill text-[11px] font-mono tracking-[0.16em] uppercase text-slate-300">
            <span className="w-2 h-2 rounded-full bg-slate-200 luminous-glow beacon-dot"></span>
            HEC Ranked Category W4 • Golden Jubilee Era
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-50 leading-[1.05] luminous-text-glow">
            FALL 2026 Intake.
            <span className="block mt-2 font-light text-slate-300 text-3xl sm:text-4xl lg:text-5xl tracking-normal">
              Shaping Knowledge &amp; Impact.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 font-normal max-w-2xl leading-relaxed">
            South Punjab's flagship public research university. Explore 200+ comprehensive undergraduate, lateral BS, M.Phil, and Ph.D. degree offerings across 10 faculties on a world-class collegiate campus.
          </p>

          {/* Glass Floating CTA Actions */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={() => onOpenAdmissions('apply')}
              className="px-7 py-3.5 rounded-2xl bg-slate-100 text-slate-950 font-semibold text-[13px] tracking-wide hover:bg-white transition-all flex items-center gap-2 luminous-glow shadow-[0_0_30px_rgba(241,245,249,0.4)] sheen-overlay cursor-pointer active:scale-95"
            >
              <span>Apply Online — Fall 2026</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>

            <button
              onClick={() => onOpenAcademics()}
              className="px-6 py-3.5 rounded-2xl liquid-glass text-slate-100 font-medium text-[13px] hover:border-slate-300/40 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px] text-slate-300">download</span>
              <span>Degree Catalog &amp; Prospectus</span>
            </button>

            <button
              onClick={() => onOpenAdmissions('merit')}
              className="px-5 py-3.5 rounded-2xl liquid-pill text-slate-300 hover:text-white font-medium text-[13px] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px] text-slate-400">checklist</span>
              <span>Merit Lists</span>
            </button>
          </div>

          {/* Glass Direct Gateway Chips */}
          <div className="pt-6 border-t border-slate-300/15">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-slate-400 mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px] text-slate-300">bolt</span>
              Rapid Institutional Gateways
            </p>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={onOpenAiAssistant}
                className="px-3.5 py-1.5 rounded-xl liquid-pill hover:bg-slate-100 hover:text-slate-950 text-slate-300 text-xs font-medium tracking-wide transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[15px] text-cyan-300">psychology</span>
                BZU AI Assistant
              </button>

              <button
                onClick={() => onOpenAdmissions('calculator')}
                className="px-3.5 py-1.5 rounded-xl liquid-pill hover:bg-slate-100 hover:text-slate-950 text-slate-300 text-xs font-medium tracking-wide transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[15px]">calculate</span>
                Aggregate Calculator
              </button>

              <button
                onClick={() => onOpenAdmissions('merit')}
                className="px-3.5 py-1.5 rounded-xl liquid-pill hover:bg-slate-100 hover:text-slate-950 text-slate-300 text-xs font-medium tracking-wide transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[15px]">payments</span>
                Scholarship Cell (3,900+)
              </button>

              <button
                onClick={onOpenResults}
                className="px-3.5 py-1.5 rounded-xl liquid-pill hover:bg-slate-100 hover:text-slate-950 text-slate-300 text-xs font-medium tracking-wide transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[15px]">verified</span>
                Digital Slips &amp; LMS
              </button>
            </div>
          </div>
        </div>

        {/* Right Futuristic Floating Glass Deck */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-slate-200/15 via-transparent to-slate-400/10 rounded-3xl blur-2xl pointer-events-none"></div>
          <div className="relative liquid-glass-elevated rounded-3xl p-3.5 shadow-2xl space-y-3.5 spotlight-card sheen-overlay">
            {/* Architectural Image Stage */}
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-300/20 group">
              <div
                className="w-full h-full bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out card-img-zoom"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCUWsIc8r1wwJwjF56SeTNnBYL89oFfI9INxxgBjPTco2_BrIAlTlIYAilqA8Wq-Gn4KxrU5aZEkJmHqHw6F5bb2ljgjN1rHbt33qhgQBuI8zNcbsa5DINKUNkTwJ5B-cSNJvEobbun2INIYKZn1u2hrzbG0wD6ygvswoWngVCm1026F006na7ZybVsw2zyjZm2D5RAkmR-lVBbvtWD0ul_9RUUKRTxaUQGZEQR49U")`,
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              {/* Top Micro Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="liquid-pill px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase text-slate-100">
                  Main Bosan Road
                </span>
                <span className="liquid-pill px-3 py-1 rounded-full text-[10px] font-semibold text-slate-100 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 beacon-dot"></span> 960+ Acres
                </span>
              </div>

              {/* Bottom Glass Highlight */}
              <div className="absolute bottom-4 left-4 right-4 liquid-glass rounded-2xl p-4 flex items-center justify-between transition-transform group-hover:-translate-y-1">
                <div>
                  <h3 className="text-slate-100 font-bold text-lg leading-tight">Bahauddin Zakariya Campus</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Premier South Asian Research Landmark</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-100 block leading-none">50th</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Jubilee Year</span>
                </div>
              </div>
            </div>

            {/* Hotline & Desk Micro-Glass Pod */}
            <div className="liquid-glass rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl liquid-pill flex items-center justify-center text-slate-100 shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">headset_mic</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-100">Live Admissions Desk</p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">(+92) 61 9210071</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 uppercase block tracking-wider">Registrar</span>
                <span className="text-xs text-slate-200 font-mono">registrar@bzu.edu.pk</span>
              </div>
            </div>
          </div>

          {/* Floating Accent Overlap Badge */}
          <div className="hidden sm:flex -mt-8 -ml-6 liquid-glass-elevated rounded-2xl p-3.5 items-center gap-3 relative z-20 max-w-xs shadow-2xl hover:scale-105 transition-all">
            <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-[0_0_20px_rgba(241,245,249,0.45)]">
              <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-100 leading-tight">#1 University in Punjab</p>
              <p className="text-[11px] text-slate-400">THE World Rankings 2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
