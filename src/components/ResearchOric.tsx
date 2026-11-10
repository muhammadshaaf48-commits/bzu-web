import React from 'react';

interface ResearchOricProps {
  onOpenAdmissions: (tab?: 'apply' | 'track' | 'calculator' | 'merit') => void;
  onOpenAcademics: (level?: string) => void;
}

export const ResearchOric: React.FC<ResearchOricProps> = ({ onOpenAdmissions, onOpenAcademics }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16" id="research">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="liquid-pill px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
            Scientific Discovery
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-2">
            Research &amp; Innovation (ORIC)
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mt-1">
            Ranked No. 09 in Pakistan by the Higher Education Commission, driving breakthrough industrial patents and high-impact scholarship.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="liquid-pill px-3.5 py-1.5 rounded-full text-slate-200 font-semibold text-xs border border-slate-300/25">
            HEC Category 'X'
          </span>
          <button
            onClick={() => onOpenAcademics('Doctoral (PhD)')}
            className="liquid-pill hover:bg-slate-100 hover:text-slate-950 px-4 py-2 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer active:scale-95"
          >
            Research Fellowship →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {/* Pillar 1 */}
        <div className="liquid-glass-elevated rounded-3xl overflow-hidden group flex flex-col transition-all spotlight-card sheen-overlay">
          <div className="h-44 relative overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out card-img-zoom"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBFjikAW2g2TKhVbc4He7ryhqFU9tohXqat3SOZvACR1konMXeV2bpEg3TaXKvduaILBxBtO5TT6gXgUZ3uKF9BCsyq1To8ZegahFlHhi07ySdhudKD6WPe8jinCufasZwlPt225I_Nc1wt9kTiPE29VlrFo4xVQXGWS6jwjyKb4wdNWMiFy-wyB0sIGKimnrdsNHhDBXkMu-jKpZ-mXuSp8AlwEKXZX3tQxHpqr7A")`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Scholarships &amp; Grants
              </span>
              <h3 className="text-xl font-bold text-slate-100 mt-1 group-hover:text-white transition-colors">
                PhD Opportunities
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Funded doctoral research positions with comprehensive lab stipends, international co-supervision options, and publishing mentorship.
              </p>
            </div>
            <button
              onClick={() => onOpenAdmissions('apply')}
              className="text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 uppercase font-mono tracking-wider active:scale-95 transition-all cursor-pointer"
            >
              <span>Apply for Fellowship</span>
              <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                north_east
              </span>
            </button>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="liquid-glass-elevated rounded-3xl overflow-hidden group flex flex-col transition-all spotlight-card sheen-overlay">
          <div className="h-44 relative overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out card-img-zoom"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBYuCyFzELjO6jPI4R4e1kRGl52zaOISAgv8XW3bflLQ-8EJOpHXvU8dUGKGI-TRGYmuBAP3PDjFfOsaR8b09G3d-InPZI1j3HEmps3JNgyYVKqdRPVYNBaqifUmcUIZGF7j0vj2DC41Hq7GY7OvEt91sBwMXgUfDma6OjHNMbmbLJvAfmv7O_9mpN56O4VIkKO0w74ONes5JNKxSRWRcaNV-9GC0_zAs4BKrq0XJw")`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Infrastructure
              </span>
              <h3 className="text-xl font-bold text-slate-100 mt-1 group-hover:text-white transition-colors">
                Advanced Lab Facilities
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Centralized instrumentation suites, specialized agro-genetics cleanrooms, animal surgical theaters, and high performance compute clusters.
              </p>
            </div>
            <button
              onClick={() => onOpenAcademics()}
              className="text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 uppercase font-mono tracking-wider active:scale-95 transition-all cursor-pointer"
            >
              <span>Explore Facilities</span>
              <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                north_east
              </span>
            </button>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="liquid-glass-elevated rounded-3xl overflow-hidden group flex flex-col transition-all spotlight-card sheen-overlay">
          <div className="h-44 relative overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out card-img-zoom"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBGfJnbJS1IJUurQiIDzFIcQtVky8KeGqBMPq9xT4g9SeWgJ0rYn_UJd_G1jwN2IyNYq9Qzw7hJet2UUHqh1VKMidWUhymJ85tJI5TycP7a-xcfyFUxMUoSsv-xBZWl6FbhSNRMVPRwQxJQKNL_WDDisBRxX2b9mkqI2eT8IGR_bM9m9XUlm0KQJKqarmKlKPXrbDO4jcnFtKpAZ63yZlKUEAQZzye9pRsEaI6NxEE")`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Priority Areas
              </span>
              <h3 className="text-xl font-bold text-slate-100 mt-1 group-hover:text-white transition-colors">
                Research Topics &amp; Impact
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Targeted research in climate-resilient cotton agronomy, clean solar technologies, artificial intelligence architectures, and regional history.
              </p>
            </div>
            <button
              onClick={() => onOpenAcademics()}
              className="text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 uppercase font-mono tracking-wider active:scale-95 transition-all cursor-pointer"
            >
              <span>Research Clusters</span>
              <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                north_east
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
