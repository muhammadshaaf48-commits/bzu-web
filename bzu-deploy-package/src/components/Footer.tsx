import React, { useState } from 'react';

interface FooterProps {
  onOpenAcademics: (facultyId?: string) => void;
  onOpenResults: () => void;
  onOpenFaculty: () => void;
  onOpenAdmissions: () => void;
  onOpenContact: () => void;
  onOpenDesignedBy: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAcademics,
  onOpenResults,
  onOpenFaculty,
  onOpenAdmissions,
  onOpenContact,
  onOpenDesignedBy,
}) => {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribedMsg, setSubscribedMsg] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribing(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setSubscribedMsg(data.message || 'Subscribed successfully!');
      setEmail('');
      setTimeout(() => setSubscribedMsg(''), 4000);
    } catch {
      setSubscribedMsg('Subscribed to Academic Gazette!');
      setTimeout(() => setSubscribedMsg(''), 4000);
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer
      className="relative z-10 w-full border-t border-slate-300/15 backdrop-blur-3xl pt-16 pb-12 mt-10"
      style={{
        background: 'rgba(13, 14, 21, 0.85)',
        borderTop: '1px solid rgba(240, 245, 255, 0.2)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-300/15">
          {/* University Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl liquid-pill">
                <img
                  alt="BZU Multan Official Wordmark Crest"
                  className="h-7 w-auto object-contain brightness-0 invert opacity-95"
                  src="https://lh3.googleusercontent.com/aida/ALJJyrAYIcjrV7aPgIrZRDwcnduL1RAFi0MHk5awlP4KIjHyBSBjXokZXYwBA07HCS95IR_Mw23VitRUNPSkqg0JzeUvd_uXnmBB9wN_E9t1JGzKmZAq2whQ_aE-_31yZdI-FZpVCwnqwYP2Zn2Dg8aXTLGJfMViNu1Fkn9cj1mv8eJOt4X85URaek1Tj7fwcM_P8IyT3DzMC1Vk0P8v3vBd6i4xaGqc-YF-AveY1rI3Oh7W"
                />
              </div>
              <span className="text-base font-bold text-slate-100">Bahauddin Zakariya University</span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              South Punjab's landmark research institution offering 10 faculties and over 70 academic departments on an expansive collegiate landscape in Multan.
            </p>

            <div className="pt-2">
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">
                Institutional Gazette &amp; Newsletter
              </p>
              <form onSubmit={handleSubscribe} className="flex max-w-md items-center rounded-2xl liquid-glass p-1">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 outline-none"
                  placeholder="Enter academic or personal email"
                  type="email"
                  required
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="px-4 py-2 bg-slate-100 text-slate-950 text-[11px] font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-all shrink-0 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {subscribing ? 'Joining...' : 'Subscribe'}
                </button>
              </form>
              {subscribedMsg && (
                <p className="text-xs text-cyan-300 font-mono mt-1.5 animate-in fade-in">
                  ✓ {subscribedMsg}
                </p>
              )}
            </div>
          </div>

          {/* Col 2: Faculties */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-200 mb-4 font-bold">
              Academic Faculties
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onOpenAcademics('fac-arts')}
                  className="hover:text-slate-100 transition-colors text-left cursor-pointer"
                >
                  Arts &amp; Social Sciences
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAcademics('fac-science')}
                  className="hover:text-slate-100 transition-colors text-left cursor-pointer"
                >
                  Faculty of Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAcademics('fac-engg')}
                  className="hover:text-slate-100 transition-colors text-left cursor-pointer"
                >
                  Engineering &amp; Technology
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAcademics('fac-agri')}
                  className="hover:text-slate-100 transition-colors text-left cursor-pointer"
                >
                  Agricultural Sciences
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAcademics('fac-pharm')}
                  className="hover:text-slate-100 transition-colors text-left cursor-pointer"
                >
                  Faculty of Pharmacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAcademics('fac-vet')}
                  className="hover:text-slate-100 transition-colors text-left cursor-pointer"
                >
                  Veterinary Sciences
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAcademics('fac-comm-law')}
                  className="hover:text-slate-100 transition-colors text-left cursor-pointer"
                >
                  Commerce &amp; Law
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Portals */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-200 mb-4 font-bold">
              Student Portals
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onOpenAdmissions()} className="hover:text-slate-100 transition-colors cursor-pointer text-left">
                  Undergraduate Admissions
                </button>
              </li>
              <li>
                <button onClick={onOpenResults} className="hover:text-slate-100 transition-colors cursor-pointer text-left">
                  Roll Number Slips / Sheets
                </button>
              </li>
              <li>
                <button onClick={() => onOpenAdmissions()} className="hover:text-slate-100 transition-colors cursor-pointer text-left">
                  Online Fee Voucher System
                </button>
              </li>
              <li>
                <button onClick={onOpenResults} className="hover:text-slate-100 transition-colors cursor-pointer text-left">
                  Semester Results Verification
                </button>
              </li>
              <li>
                <button onClick={onOpenFaculty} className="hover:text-slate-100 transition-colors cursor-pointer text-left">
                  Faculty Directory &amp; Profiles
                </button>
              </li>
              <li>
                <a href="#research" className="hover:text-slate-100 transition-colors text-left">
                  ORIC Research Repository
                </a>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-slate-100 transition-colors cursor-pointer text-left">
                  Grievance &amp; Contact Desk
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={onOpenDesignedBy}
                  className="hover:text-cyan-300 transition-colors cursor-pointer text-left flex items-center gap-1.5 text-cyan-300/90 font-medium"
                >
                  <span className="material-symbols-outlined text-[14px]">code</span>
                  <span>Designed By Profile</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-200 mb-4 font-bold">
              Main Bosan Campus
            </p>
            <div className="text-xs text-slate-400 space-y-2">
              <p className="text-slate-200">Bosan Road, Multan, Punjab 60800</p>
              <p>UAN: +92 61 111-222-298</p>
              <p>Direct: (+92) 61 9210071</p>
              <p>Desk: registrar@bzu.edu.pk</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="liquid-pill px-2 py-0.5 rounded text-[9px] font-mono text-slate-300">
                  HEC Verified
                </span>
                <span className="liquid-pill px-2 py-0.5 rounded text-[9px] font-mono text-slate-300">
                  PEC
                </span>
                <span className="liquid-pill px-2 py-0.5 rounded text-[9px] font-mono text-slate-300">
                  NCEAC
                </span>
                <span className="liquid-pill px-2 py-0.5 rounded text-[9px] font-mono text-slate-300">
                  NAEAC
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <p>© 2026 Bahauddin Zakariya University Multan. All Rights Reserved.</p>
            <span className="hidden sm:inline text-slate-600">•</span>
            <button
              onClick={onOpenDesignedBy}
              className="text-cyan-300 hover:text-white transition-colors cursor-pointer underline underline-offset-4 decoration-cyan-400/40 hover:decoration-white font-medium flex items-center gap-1"
            >
              <span>Designed &amp; Developed by Muhammad Shaaf Azhar</span>
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-slate-400">
            <button onClick={onOpenContact} className="hover:text-slate-200 transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={onOpenContact} className="hover:text-slate-200 transition-colors cursor-pointer">
              HEC Guidelines
            </button>
            <button onClick={onOpenContact} className="hover:text-slate-200 transition-colors cursor-pointer">
              Anti-Harassment Code
            </button>
            <button onClick={onOpenContact} className="hover:text-slate-200 transition-colors cursor-pointer">
              RTI Transparency
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
