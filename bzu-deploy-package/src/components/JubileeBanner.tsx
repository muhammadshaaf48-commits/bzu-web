import React from 'react';

interface JubileeBannerProps {
  onOpenAdmissions: () => void;
  onOpenLeadershipMessage: () => void;
}

export const JubileeBanner: React.FC<JubileeBannerProps> = ({
  onOpenAdmissions,
  onOpenLeadershipMessage,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <div className="relative liquid-glass-elevated rounded-3xl p-8 sm:p-14 overflow-hidden border border-slate-300/25 sheen-overlay spotlight-card">
        {/* Inner Specular Orb */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(248,250,252,0.18)_0%,transparent_70%)] blur-2xl pointer-events-none orb-anim-2"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="liquid-pill px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-slate-300">
            Golden Jubilee Era (1975–2026)
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-50 tracking-tight leading-tight">
            Excellence in Every Step.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            From groundbreaking agricultural patents to high-impact computing, Bahauddin Zakariya University Multan sets the standard in research and educational stature across Asia.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAdmissions}
              className="px-7 py-3 rounded-2xl bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-white transition-all luminous-glow shadow-[0_0_25px_rgba(241,245,249,0.45)] cursor-pointer active:scale-95"
            >
              Join the Next Intake
            </button>
            <button
              onClick={onOpenLeadershipMessage}
              className="px-6 py-3 rounded-2xl liquid-pill text-slate-200 font-medium text-xs uppercase tracking-wider hover:bg-slate-200/15 transition-all cursor-pointer active:scale-95"
            >
              Read Leadership Message →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
