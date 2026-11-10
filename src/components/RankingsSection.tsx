import React from 'react';

export const RankingsSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16" id="rankings">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <span className="liquid-pill px-4 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.24em] text-slate-300">
          Global Academic Standing
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          National &amp; International Recognition
        </h2>
        <p className="text-sm sm:text-base text-slate-400 font-normal">
          Rigorous research citation impact and scholastic excellence have placed BZU into the prestigious echelons of global higher education.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="liquid-glass-elevated p-7 rounded-3xl relative overflow-hidden group transition-all spotlight-card sheen-overlay">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono tracking-wider">
            <span>PUNJAB BENCHMARK</span>
            <span className="material-symbols-outlined text-[18px] text-slate-200 group-hover:rotate-12 transition-transform">
              military_tech
            </span>
          </div>
          <div className="my-5">
            <span className="text-5xl font-black text-slate-100 block tracking-tight luminous-text-glow font-display">
              #1
            </span>
            <span className="text-base font-bold text-slate-200 mt-1 block">University in Punjab</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Rated the foremost public sector university in Punjab by the Times Higher Education (THE) 2026 Rankings.
          </p>
        </div>

        {/* Card 2 */}
        <div className="liquid-glass-elevated p-7 rounded-3xl relative overflow-hidden group transition-all spotlight-card sheen-overlay">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono tracking-wider">
            <span>PAKISTAN STANDING</span>
            <span className="material-symbols-outlined text-[18px] text-slate-200 group-hover:scale-110 transition-transform">
              flag
            </span>
          </div>
          <div className="my-5">
            <span className="text-5xl font-black text-slate-100 block tracking-tight luminous-text-glow font-display">
              #2
            </span>
            <span className="text-base font-bold text-slate-200 mt-1 block">University in Pakistan</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Securing national 2nd place for high-impact research output, faculty reputation, and graduate employability.
          </p>
        </div>

        {/* Card 3 */}
        <div className="liquid-glass-elevated p-7 rounded-3xl relative overflow-hidden group transition-all spotlight-card sheen-overlay">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono tracking-wider">
            <span className="liquid-pill px-2.5 py-0.5 rounded-full text-slate-200 font-semibold">THE World 2026</span>
            <span className="material-symbols-outlined text-[18px] text-slate-200 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
              trending_up
            </span>
          </div>
          <div className="my-5">
            <span className="text-4xl font-black text-slate-100 block tracking-tight">#601–800</span>
            <span className="text-sm font-semibold text-slate-300 mt-1 block">400-Point Leap</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Historic climb from 2025, celebrating extensive progress in citation index and international student reach.
          </p>
        </div>

        {/* Card 4 */}
        <div className="liquid-glass-elevated p-7 rounded-3xl relative overflow-hidden group transition-all spotlight-card sheen-overlay">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono tracking-wider">
            <span className="liquid-pill px-2.5 py-0.5 rounded-full text-slate-200 font-semibold">QS Asia 2026</span>
            <span className="material-symbols-outlined text-[18px] text-slate-200 group-hover:rotate-45 transition-transform">
              public
            </span>
          </div>
          <div className="my-5">
            <span className="text-4xl font-black text-slate-100 block tracking-tight">#250–300</span>
            <span className="text-sm font-semibold text-slate-300 mt-1 block">Top 300 Asian Tier</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            A 100-position advance reflecting expansive scholastic partnerships and regional academic impact.
          </p>
        </div>
      </div>

      {/* Statutory Accreditation Glass Pill Ribbon */}
      <div className="mt-8 liquid-glass rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-5 sheen-overlay">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl liquid-pill flex items-center justify-center text-slate-200 shrink-0">
            <span className="material-symbols-outlined text-[22px]">verified_user</span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-100">100% Accredited Academic Programs</p>
            <p className="text-xs text-slate-400">Sanctioned by HEC &amp; statutory professional accreditation councils</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="liquid-pill px-3 py-1 rounded-xl text-[11px] font-mono text-slate-300">HEC Category W4</span>
          <span className="liquid-pill px-3 py-1 rounded-xl text-[11px] font-mono text-slate-300">PEC Engineering</span>
          <span className="liquid-pill px-3 py-1 rounded-xl text-[11px] font-mono text-slate-300">PCP Pharmacy</span>
          <span className="liquid-pill px-3 py-1 rounded-xl text-[11px] font-mono text-slate-300">PVMC Veterinary</span>
          <span className="liquid-pill px-3 py-1 rounded-xl text-[11px] font-mono text-slate-300">NCEAC Computing</span>
          <span className="liquid-pill px-3 py-1 rounded-xl text-[11px] font-mono text-slate-300">NAEAC Agriculture</span>
          <span className="liquid-pill px-3 py-1 rounded-xl text-[11px] font-mono text-slate-300">NBEAC Business</span>
        </div>
      </div>
    </section>
  );
};
