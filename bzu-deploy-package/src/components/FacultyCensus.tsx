import React from 'react';

interface FacultyCensusProps {
  onOpenFacultyDirectory: () => void;
}

export const FacultyCensus: React.FC<FacultyCensusProps> = ({ onOpenFacultyDirectory }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16" id="faculty">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <span className="liquid-pill px-4 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.24em] text-slate-300">
          Faculty Stature
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Faculty &amp; Academic Strength
        </h2>
        <p className="text-sm text-slate-400">
          Over 80% of our teaching faculty hold terminal doctoral degrees from leading international and national universities.
        </p>
      </div>

      {/* Census Highlights Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="liquid-glass p-6 rounded-3xl space-y-2 spotlight-card">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>Total Faculty</span>
            <span className="material-symbols-outlined text-[18px]">badge</span>
          </div>
          <span className="text-4xl font-extrabold text-slate-100 block">600</span>
          <p className="text-xs text-slate-400">Across 72 academic departments</p>
        </div>

        <div className="liquid-glass-elevated p-6 rounded-3xl space-y-2 spotlight-card">
          <div className="flex items-center justify-between text-slate-100 text-xs font-mono uppercase">
            <span>PhD Degree Holders</span>
            <span className="material-symbols-outlined text-[18px]">school</span>
          </div>
          <span className="text-4xl font-extrabold text-slate-100 block">481</span>
          <p className="text-xs text-slate-300">80.1% Doctoral Ratio</p>
        </div>

        <div className="liquid-glass p-6 rounded-3xl space-y-2 spotlight-card">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>Male Faculty</span>
            <span className="material-symbols-outlined text-[18px]">man</span>
          </div>
          <span className="text-4xl font-extrabold text-slate-100 block">435</span>
          <p className="text-xs text-slate-400">353 PhD • 82 Non-PhD</p>
        </div>

        <div className="liquid-glass p-6 rounded-3xl space-y-2 spotlight-card">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>Female Faculty</span>
            <span className="material-symbols-outlined text-[18px]">woman</span>
          </div>
          <span className="text-4xl font-extrabold text-slate-100 block">168</span>
          <p className="text-xs text-slate-400">131 PhD • 37 Non-PhD</p>
        </div>
      </div>

      {/* Frosted Structured Census Table */}
      <div className="liquid-glass-elevated rounded-3xl overflow-hidden shadow-2xl sheen-overlay">
        <div className="p-6 border-b border-slate-300/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-300 text-[20px]">table_chart</span>
              Faculty Composition by Designation
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Official institutional census by seniority, qualification, and demographics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="liquid-pill px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-slate-200">
              2026 Official Census
            </span>
            <button
              onClick={onOpenFacultyDirectory}
              className="px-4 py-1.5 rounded-xl bg-slate-100 text-slate-950 font-semibold text-xs hover:bg-white transition-all cursor-pointer flex items-center gap-1 active:scale-95"
            >
              <span>Faculty Directory</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body">
            <thead className="bg-slate-200/[0.04] text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-300/15">
              <tr>
                <th className="py-4 px-6" scope="col">Academic Designation</th>
                <th className="py-4 px-6 text-center text-slate-100" scope="col">Total Staff</th>
                <th className="py-4 px-6 text-center text-slate-100 font-bold" scope="col">PhD Holders</th>
                <th className="py-4 px-6 text-center text-slate-400" scope="col">Non-PhD</th>
                <th className="py-4 px-6 text-center text-slate-400" scope="col">Male</th>
                <th className="py-4 px-6 text-center text-slate-400" scope="col">Female</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300/15 text-slate-300">
              <tr className="hover:bg-slate-100/[0.06] transition-colors">
                <td className="py-4 px-6 font-semibold text-slate-100">Professors</td>
                <td className="py-4 px-6 text-center font-bold text-slate-100">127</td>
                <td className="py-4 px-6 text-center text-slate-100 font-medium">127 (100%)</td>
                <td className="py-4 px-6 text-center text-slate-500">0</td>
                <td className="py-4 px-6 text-center">101</td>
                <td className="py-4 px-6 text-center">26</td>
              </tr>
              <tr className="hover:bg-slate-100/[0.06] transition-colors">
                <td className="py-4 px-6 font-semibold text-slate-100">Associate Professors</td>
                <td className="py-4 px-6 text-center font-bold text-slate-100">106</td>
                <td className="py-4 px-6 text-center text-slate-100 font-medium">106 (100%)</td>
                <td className="py-4 px-6 text-center text-slate-500">0</td>
                <td className="py-4 px-6 text-center">87</td>
                <td className="py-4 px-6 text-center">19</td>
              </tr>
              <tr className="hover:bg-slate-100/[0.06] transition-colors">
                <td className="py-4 px-6 font-semibold text-slate-100">Assistant Professors</td>
                <td className="py-4 px-6 text-center font-bold text-slate-100">237</td>
                <td className="py-4 px-6 text-center text-slate-100 font-medium">203</td>
                <td className="py-4 px-6 text-center text-slate-400">34</td>
                <td className="py-4 px-6 text-center">166</td>
                <td className="py-4 px-6 text-center">71</td>
              </tr>
              <tr className="hover:bg-slate-100/[0.06] transition-colors">
                <td className="py-4 px-6 font-semibold text-slate-100">Lecturers</td>
                <td className="py-4 px-6 text-center font-bold text-slate-100">130</td>
                <td className="py-4 px-6 text-center text-slate-100 font-medium">45</td>
                <td className="py-4 px-6 text-center text-slate-400">85</td>
                <td className="py-4 px-6 text-center">81</td>
                <td className="py-4 px-6 text-center">49</td>
              </tr>
              <tr className="bg-slate-100/15 text-slate-100 font-semibold backdrop-blur-md border-t border-slate-300/25">
                <td className="py-4 px-6 font-mono text-[11px] uppercase tracking-wider">Grand Total</td>
                <td className="py-4 px-6 text-center text-sm font-bold">600</td>
                <td className="py-4 px-6 text-center text-sm font-bold">481</td>
                <td className="py-4 px-6 text-center text-sm">119</td>
                <td className="py-4 px-6 text-center text-sm">435</td>
                <td className="py-4 px-6 text-center text-sm">168</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
