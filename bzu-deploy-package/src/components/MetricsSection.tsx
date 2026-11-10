import React from 'react';

export const MetricsSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16" id="about-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="liquid-pill px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
            Institutional Stature
          </span>
          <h2 className="text-3xl font-extrabold text-slate-100 mt-2">Why Study at BZU Multan?</h2>
        </div>
        <p className="text-sm text-slate-400 max-w-md">
          A dynamic scholastic ecosystem supporting over thirty thousand scholars across modern laboratory wings and high-tech research centers.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="liquid-glass p-6 rounded-3xl text-center space-y-1.5 transition-all group spotlight-card">
          <span className="material-symbols-outlined text-[24px] text-slate-300 group-hover:scale-110 group-hover:text-white transition-all">
            menu_book
          </span>
          <span className="text-3xl font-extrabold text-slate-100 block">200+</span>
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Degree Tracks</p>
        </div>

        <div className="liquid-glass p-6 rounded-3xl text-center space-y-1.5 transition-all group spotlight-card">
          <span className="material-symbols-outlined text-[24px] text-slate-300 group-hover:scale-110 group-hover:text-white transition-all">
            groups
          </span>
          <span className="text-3xl font-extrabold text-slate-100 block">30,000+</span>
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Scholars</p>
        </div>

        <div className="liquid-glass p-6 rounded-3xl text-center space-y-1.5 transition-all group spotlight-card">
          <span className="material-symbols-outlined text-[24px] text-slate-300 group-hover:scale-110 group-hover:text-white transition-all">
            account_tree
          </span>
          <span className="text-3xl font-extrabold text-slate-100 block">72</span>
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Departments</p>
        </div>

        <div className="liquid-glass p-6 rounded-3xl text-center space-y-1.5 transition-all group spotlight-card">
          <span className="material-symbols-outlined text-[24px] text-slate-300 group-hover:scale-110 group-hover:text-white transition-all">
            domain
          </span>
          <span className="text-3xl font-extrabold text-slate-100 block">10</span>
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Faculties</p>
        </div>

        <div className="liquid-glass p-6 rounded-3xl text-center space-y-1.5 transition-all group spotlight-card">
          <span className="material-symbols-outlined text-[24px] text-slate-300 group-hover:scale-110 group-hover:text-white transition-all">
            military_tech
          </span>
          <span className="text-3xl font-extrabold text-slate-100 block">3,900+</span>
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Scholarships</p>
        </div>

        <div className="liquid-glass p-6 rounded-3xl text-center space-y-1.5 transition-all group spotlight-card">
          <span className="material-symbols-outlined text-[24px] text-slate-300 group-hover:scale-110 group-hover:text-white transition-all">
            co_present
          </span>
          <span className="text-3xl font-extrabold text-slate-100 block">600+</span>
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Faculty</p>
        </div>
      </div>

      {/* Secondary Sub-Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        <div className="liquid-glass p-5 rounded-2xl flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-xl liquid-pill flex items-center justify-center text-slate-200 shrink-0 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">school</span>
          </div>
          <div>
            <span className="text-lg font-bold text-slate-100">10 Lacs+</span>
            <p className="text-xs text-slate-400">Global Alumni Network in 45+ Countries</p>
          </div>
        </div>

        <div className="liquid-glass p-5 rounded-2xl flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-xl liquid-pill flex items-center justify-center text-slate-200 shrink-0 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">science</span>
          </div>
          <div>
            <span className="text-lg font-bold text-slate-100">No. 09 in Pakistan</span>
            <p className="text-xs text-slate-400">HEC Category 'X' ORIC Research Office</p>
          </div>
        </div>

        <div className="liquid-glass p-5 rounded-2xl flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-xl liquid-pill flex items-center justify-center text-slate-200 shrink-0 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">location_city</span>
          </div>
          <div>
            <span className="text-lg font-bold text-slate-100">2 Sub-Campuses</span>
            <p className="text-xs text-slate-400">Vehari &amp; Lodhran Regional Hubs</p>
          </div>
        </div>
      </div>
    </section>
  );
};
