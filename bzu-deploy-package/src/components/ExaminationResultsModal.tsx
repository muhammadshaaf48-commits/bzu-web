import React, { useState } from 'react';
import { ExamResult } from '../types/index.ts';

interface ExaminationResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExaminationResultsModal: React.FC<ExaminationResultsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSearch = async (rollNoToSearch?: string) => {
    const searchTerm = (rollNoToSearch || query).trim();
    if (!searchTerm) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/results/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchTerm }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Result record not found');
      }
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Error retrieving result');
    } finally {
      setLoading(false);
    }
  };

  const sampleRollNumbers = [
    { label: 'BS CS', roll: 'BZU-2024-BSCS-101' },
    { label: 'Civil Engg', roll: 'BZU-2023-ENG-042' },
    { label: 'Pharm-D', roll: 'BZU-2024-PHARM-019' },
    { label: 'BBA Hons', roll: 'BZU-2023-BBA-088' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col liquid-glass-elevated rounded-3xl border border-slate-300/30 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-6 border-b border-slate-300/15 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl liquid-pill flex items-center justify-center text-slate-100">
              <span className="material-symbols-outlined text-[22px]">fact_check</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                Examination Results &amp; Marksheet Verification
              </h2>
              <p className="text-xs text-slate-400">
                Official Controller of Examinations online transcript verification portal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl liquid-pill text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-90"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-slate-300/15 bg-slate-900/40 space-y-3">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[18px]">
                badge
              </span>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Enter Roll Number or Registration Number (e.g. BZU-2024-BSCS-101)..."
                className="w-full bg-slate-950/70 border border-slate-300/20 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-slate-100 transition-colors uppercase font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-white transition-all cursor-pointer active:scale-95 disabled:opacity-50 shrink-0"
            >
              {loading ? 'Verifying...' : 'Search Result'}
            </button>
          </form>

          {/* Quick-select chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
            <span className="text-[11px] font-mono">Quick Test Samples:</span>
            {sampleRollNumbers.map(item => (
              <button
                key={item.roll}
                type="button"
                onClick={() => {
                  setQuery(item.roll);
                  handleSearch(item.roll);
                }}
                className="liquid-pill px-2.5 py-1 rounded-lg text-cyan-300 hover:text-white text-[11px] font-mono cursor-pointer transition-colors active:scale-95"
              >
                {item.label}: {item.roll}
              </button>
            ))}
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}
        </div>

        {/* Content Body: Verified Transcript */}
        <div className="p-6 overflow-y-auto flex-1">
          {result ? (
            <div className="liquid-glass rounded-2xl p-6 border border-slate-300/25 space-y-6">
              {/* Transcript Header with Crest */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-300/20 gap-3">
                <div className="flex items-center gap-3">
                  <img
                    alt="BZU Crest"
                    className="h-10 w-auto object-contain brightness-0 invert opacity-95"
                    src="https://lh3.googleusercontent.com/aida/ALJJyrAYIcjrV7aPgIrZRDwcnduL1RAFi0MHk5awlP4KIjHyBSBjXokZXYwBA07HCS95IR_Mw23VitRUNPSkqg0JzeUvd_uXnmBB9wN_E9t1JGzKmZAq2whQ_aE-_31yZdI-FZpVCwnqwYP2Zn2Dg8aXTLGJfMViNu1Fkn9cj1mv8eJOt4X85URaek1Tj7fwcM_P8IyT3DzMC1Vk0P8v3vBd6i4xaGqc-YF-AveY1rI3Oh7W"
                  />
                  <div>
                    <h3 className="font-extrabold text-slate-100 text-sm sm:text-base">
                      Bahauddin Zakariya University Multan
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Office of the Controller of Examinations • Official Grade Transcript
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 rounded-full liquid-pill text-emerald-300 font-mono font-bold text-xs inline-block">
                    ✓ {result.status}
                  </span>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">
                    Declared: {result.declarationDate}
                  </p>
                </div>
              </div>

              {/* Student Metadata Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-300/10 text-xs">
                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Student Name</span>
                  <span className="font-bold text-slate-100">{result.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Father Name</span>
                  <span className="font-bold text-slate-100">{result.fatherName}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Roll Number</span>
                  <span className="font-mono text-cyan-300 font-bold">{result.rollNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Registration No</span>
                  <span className="font-mono text-slate-300">{result.regNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Degree Program</span>
                  <span className="font-semibold text-slate-200">{result.program}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Semester / Term</span>
                  <span className="text-slate-300">{result.semester}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Session</span>
                  <span className="text-slate-300">{result.session}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Exam Type</span>
                  <span className="text-slate-300">{result.examType}</span>
                </div>
              </div>

              {/* Subject Results Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-300/15">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-300/15">
                    <tr>
                      <th className="p-3">Course Code</th>
                      <th className="p-3">Course Title</th>
                      <th className="p-3 text-center">Cr. Hrs</th>
                      <th className="p-3 text-center">Marks</th>
                      <th className="p-3 text-center">Grade</th>
                      <th className="p-3 text-center">Grade Point</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300/15 text-slate-300 font-mono text-[11px]">
                    {result.subjects.map((sub, i) => (
                      <tr key={i} className="hover:bg-slate-100/5">
                        <td className="p-3 font-semibold text-slate-200">{sub.code}</td>
                        <td className="p-3 font-sans font-medium text-slate-100">{sub.title}</td>
                        <td className="p-3 text-center">{sub.creditHours}</td>
                        <td className="p-3 text-center">{sub.marksObtained} / {sub.totalMarks}</td>
                        <td className="p-3 text-center font-bold text-cyan-300">{sub.grade}</td>
                        <td className="p-3 text-center">{sub.gradePoint.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* GPA & CGPA Summary Bar */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-300/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Semester GPA</span>
                    <span className="text-2xl font-black text-cyan-300 font-display">{result.gpa.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Cumulative CGPA</span>
                    <span className="text-2xl font-black text-slate-100 font-display">{result.cgpa.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-950 font-bold text-xs hover:bg-white transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[16px]">print</span>
                    Print Official Marksheet
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 space-y-3">
              <span className="material-symbols-outlined text-4xl text-slate-500">search</span>
              <p className="text-sm font-semibold text-slate-300">
                Enter your Roll Number above or click a test sample
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Verified digital transcripts are certified by the Examination Branch, BZU Main Campus Bosan Road.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
