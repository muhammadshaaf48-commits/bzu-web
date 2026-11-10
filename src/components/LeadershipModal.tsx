import React from 'react';

interface LeadershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmissions: () => void;
}

export const LeadershipModal: React.FC<LeadershipModalProps> = ({
  isOpen,
  onClose,
  onOpenAdmissions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="max-w-2xl w-full liquid-glass-elevated rounded-3xl p-6 border border-slate-300/30 space-y-5 animate-in fade-in zoom-in-95">
        <div className="flex items-start justify-between">
          <div>
            <span className="liquid-pill px-3 py-1 rounded-full text-[10px] font-mono uppercase text-cyan-300">
              Golden Jubilee Convocation Message (1975–2026)
            </span>
            <h3 className="text-xl font-bold text-slate-100 mt-2">
              Message from the Vice Chancellor
            </h3>
            <p className="text-xs text-slate-400">
              Bahauddin Zakariya University Multan, Pakistan
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg liquid-pill text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-3 text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-5 rounded-2xl border border-slate-300/10 max-h-[60vh] overflow-y-auto">
          <p className="font-semibold text-slate-100">
            Dear Faculty, Researchers, Scholars, and Incoming Students,
          </p>
          <p>
            It is a matter of profound honor and pride as Bahauddin Zakariya University Multan marks its historic <strong>50th Golden Jubilee Era (1975–2026)</strong>. Established by an Act of the Provincial Assembly of the Punjab, BZU has transformed from a modest seat of learning into South Punjab’s pre-eminent research conglomerate.
          </p>
          <p>
            Our recent attainment of <strong>#1 University in Punjab and #2 across Pakistan</strong> in the Times Higher Education (THE) World University Rankings 2026—coupled with our leap into the global Top 800 tier—demonstrates our unwavering commitment to scholastic rigor, cutting-edge laboratory research, and socioeconomic impact.
          </p>
          <p>
            With over 600 faculty members (more than 80% holding terminal PhDs), 72 departments across 10 faculties, and an expansive 960+ acre collegiate campus on Bosan Road, BZU offers a fertile ecosystem for inquiry, invention, and intellectual leadership.
          </p>
          <p>
            As we welcome the <strong>Fall 2026 intake</strong> across our Undergraduate, Lateral BS 5th Semester, MS/M.Phil, and PhD programs, I invite aspiring students from across Pakistan and abroad to make BZU their home of learning.
          </p>
          <div className="pt-2 text-right font-mono text-[11px] text-slate-400">
            <p className="font-bold text-slate-200">Office of the Vice Chancellor</p>
            <p>Bahauddin Zakariya University Multan</p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-300/15 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl liquid-pill text-xs text-slate-300 hover:text-white cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenAdmissions();
            }}
            className="px-5 py-2 rounded-xl bg-slate-100 text-slate-950 text-xs font-bold hover:bg-white cursor-pointer"
          >
            Apply for Fall 2026
          </button>
        </div>
      </div>
    </div>
  );
};
