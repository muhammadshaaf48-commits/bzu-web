import React, { useState, useEffect } from 'react';
import { AdmissionApplication, MeritEntry } from '../types/index.ts';

interface AdmissionsPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'apply' | 'track' | 'calculator' | 'merit';
  preselectedProgram?: string;
}

export const AdmissionsPortalModal: React.FC<AdmissionsPortalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'apply',
  preselectedProgram = '',
}) => {
  const [activeTab, setActiveTab] = useState<'apply' | 'track' | 'calculator' | 'merit'>(initialTab);

  // Form State
  const [formData, setFormData] = useState({
    applicantName: '',
    fatherName: '',
    cnic: '',
    email: '',
    phone: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    dob: '2005-01-01',
    domicile: 'Multan',
    matricRollNo: '',
    matricMarks: 950,
    matricTotal: 1100,
    interRollNo: '',
    interMarks: 440,
    interTotal: 520,
    entryTestScore: 75,
    firstChoiceProgram: preselectedProgram || 'BS Computer Science (BS CS)',
    secondChoiceProgram: 'BS Software Engineering (BS SE)',
    shift: 'Morning' as 'Morning' | 'Evening',
    quota: 'Open Merit',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<AdmissionApplication | null>(null);
  const [submitError, setSubmitError] = useState('');

  // Tracking state
  const [trackQuery, setTrackQuery] = useState('');
  const [trackedRecord, setTrackedRecord] = useState<AdmissionApplication | null>(null);
  const [trackLoading, setTrackLoading] = useState(false);
  const [trackError, setTrackError] = useState('');

  // Merit calculator state
  const [calcMatric, setCalcMatric] = useState(980);
  const [calcMatricTotal, setCalcMatricTotal] = useState(1100);
  const [calcInter, setCalcInter] = useState(450);
  const [calcInterTotal, setCalcInterTotal] = useState(520);
  const [calcTest, setCalcTest] = useState(78);

  // Merit lists state
  const [meritLists, setMeritLists] = useState<MeritEntry[]>([]);
  const [meritFilter, setMeritFilter] = useState('');
  const [meritLoading, setMeritLoading] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (preselectedProgram) {
      setFormData(prev => ({ ...prev, firstChoiceProgram: preselectedProgram }));
    }
  }, [preselectedProgram]);

  useEffect(() => {
    if (activeTab === 'merit' && isOpen) {
      setMeritLoading(true);
      fetch('/api/merit-lists')
        .then(res => res.json())
        .then(data => setMeritLists(data))
        .catch(err => console.error(err))
        .finally(() => setMeritLoading(false));
    }
  }, [activeTab, isOpen]);

  if (!isOpen) return null;

  // Real-time aggregate calculation
  const calculatedAggregate = Number(
    (
      (calcMatric / (calcMatricTotal || 1100)) * 30 +
      (calcInter / (calcInterTotal || 520)) * 50 +
      (calcTest / 100) * 20
    ).toFixed(2)
  );

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/admissions/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmittedApp(data.application);
    } catch (err: any) {
      setSubmitError(err.message || 'Error occurred while saving application');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrackApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;
    setTrackLoading(true);
    setTrackError('');
    setTrackedRecord(null);

    try {
      const res = await fetch(`/api/admissions/status/${encodeURIComponent(trackQuery.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Application record not found');
      }
      setTrackedRecord(data);
    } catch (err: any) {
      setTrackError(err.message || 'Tracking ID not found');
    } finally {
      setTrackLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col liquid-glass-elevated rounded-3xl border border-slate-300/30 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-6 border-b border-slate-300/15 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl liquid-pill flex items-center justify-center text-slate-100">
              <span className="material-symbols-outlined text-[22px]">how_to_reg</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                BZU Admissions Portal
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full liquid-pill text-cyan-300">
                  Fall 2026 Intake
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Online registration, application verification, aggregate calculation, and merit lists
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

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-slate-300/15 bg-slate-900/40 flex items-center gap-2 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => {
              setActiveTab('apply');
              setSubmittedApp(null);
            }}
            className={`pb-3 px-3.5 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'apply'
                ? 'border-slate-100 text-slate-100 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">edit_document</span>
            <span>Apply Online</span>
          </button>

          <button
            onClick={() => setActiveTab('track')}
            className={`pb-3 px-3.5 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'track'
                ? 'border-slate-100 text-slate-100 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">travel_explore</span>
            <span>Track Application</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`pb-3 px-3.5 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'calculator'
                ? 'border-slate-100 text-slate-100 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">calculate</span>
            <span>Aggregate Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab('merit')}
            className={`pb-3 px-3.5 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'merit'
                ? 'border-slate-100 text-slate-100 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">checklist</span>
            <span>Merit Lists</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: APPLY ONLINE */}
          {activeTab === 'apply' && (
            <div>
              {submittedApp ? (
                /* SUCCESS RECEIPT & FEE CHALLAN */
                <div className="liquid-glass-elevated rounded-2xl p-6 border border-emerald-400/30 space-y-6 animate-in fade-in">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-100">Application Submitted Successfully!</h3>
                      <p className="text-xs text-emerald-300 font-mono">
                        Tracking ID: {submittedApp.appTrackingNo} • Status: {submittedApp.status}
                      </p>
                    </div>
                  </div>

                  {/* Printable Challan Box */}
                  <div
                    id="challan-printable"
                    className="p-5 rounded-2xl bg-slate-950/80 border border-slate-300/20 text-xs text-slate-300 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-700">
                      <div>
                        <p className="font-bold text-sm text-slate-100">Bahauddin Zakariya University Multan</p>
                        <p className="text-[10px] text-slate-400 font-mono uppercase">
                          Bank Copy / Student Copy — Admission Processing Voucher
                        </p>
                      </div>
                      <div className="text-right font-mono text-[11px] mt-2 sm:mt-0">
                        <p className="text-slate-400">Challan No: <span className="font-bold text-slate-100">{submittedApp.challanNumber}</span></p>
                        <p className="text-slate-400">Fee Amount: <span className="font-bold text-cyan-300">PKR {submittedApp.challanAmount}</span></p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                      <div>
                        <span className="text-slate-500 block uppercase font-mono text-[9px]">Candidate Name</span>
                        <span className="font-semibold text-slate-100">{submittedApp.applicantName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block uppercase font-mono text-[9px]">Father Name</span>
                        <span className="font-semibold text-slate-100">{submittedApp.fatherName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block uppercase font-mono text-[9px]">CNIC / B-Form</span>
                        <span className="font-semibold text-slate-100">{submittedApp.cnic}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block uppercase font-mono text-[9px]">Calculated Aggregate</span>
                        <span className="font-bold text-cyan-300 text-sm">{submittedApp.calculatedAggregate}%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] pt-2 border-t border-slate-800">
                      <div>
                        <span className="text-slate-500 block uppercase font-mono text-[9px]">Applied Program</span>
                        <span className="font-semibold text-slate-100">{submittedApp.firstChoiceProgram} ({submittedApp.shift})</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block uppercase font-mono text-[9px]">Collection Bank Branches</span>
                        <span className="text-slate-300">The Bank of Punjab (A/C: 6580004928) or HBL BZU Branch</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <p className="text-xs text-slate-400">
                      Keep your tracking code <span className="font-mono text-slate-200 font-bold">{submittedApp.appTrackingNo}</span> safe to check merit list status.
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.print()}
                        className="px-4 py-2 rounded-xl liquid-pill text-xs text-slate-200 hover:text-white flex items-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">print</span>
                        Print Voucher
                      </button>
                      <button
                        onClick={() => setSubmittedApp(null)}
                        className="px-4 py-2 rounded-xl bg-slate-100 text-slate-950 font-bold text-xs hover:bg-white cursor-pointer"
                      >
                        Submit Another Form
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* FORM */
                <form onSubmit={handleSubmitApplication} className="space-y-6">
                  {submitError && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                      {submitError}
                    </div>
                  )}

                  {/* Section 1: Candidate Bio */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-bold">
                      <span className="material-symbols-outlined text-[16px] text-slate-300">person</span>
                      1. Personal &amp; Identification Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-400 mb-1">Applicant Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.applicantName}
                          onChange={e => setFormData({ ...formData, applicantName: e.target.value })}
                          placeholder="e.g. Muhammad Shaaf"
                          className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Father's Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.fatherName}
                          onChange={e => setFormData({ ...formData, fatherName: e.target.value })}
                          placeholder="e.g. Muhammad Arshad"
                          className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">CNIC / B-Form Number *</label>
                        <input
                          type="text"
                          required
                          value={formData.cnic}
                          onChange={e => setFormData({ ...formData, cnic: e.target.value })}
                          placeholder="36302-XXXXXXX-X"
                          className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="candidate@gmail.com"
                          className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Mobile Contact Phone *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+92 300 XXXXXXX"
                          className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">District of Domicile</label>
                        <input
                          type="text"
                          value={formData.domicile}
                          onChange={e => setFormData({ ...formData, domicile: e.target.value })}
                          placeholder="e.g. Multan / Vehari / Lodhran"
                          className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Academic Record */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-bold">
                      <span className="material-symbols-outlined text-[16px] text-slate-300">school</span>
                      2. Academic Record &amp; Examination Scores
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-400 mb-1">Matric Roll No</label>
                        <input
                          type="text"
                          value={formData.matricRollNo}
                          onChange={e => setFormData({ ...formData, matricRollNo: e.target.value })}
                          placeholder="e.g. 482910"
                          className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Matric Marks</label>
                        <input
                          type="number"
                          value={formData.matricMarks}
                          onChange={e => setFormData({ ...formData, matricMarks: Number(e.target.value) })}
                          className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Matric Total</label>
                        <input
                          type="number"
                          value={formData.matricTotal}
                          onChange={e => setFormData({ ...formData, matricTotal: Number(e.target.value) })}
                          className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Inter Roll No</label>
                        <input
                          type="text"
                          value={formData.interRollNo}
                          onChange={e => setFormData({ ...formData, interRollNo: e.target.value })}
                          placeholder="e.g. 319201"
                          className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Inter Marks</label>
                        <input
                          type="number"
                          value={formData.interMarks}
                          onChange={e => setFormData({ ...formData, interMarks: Number(e.target.value) })}
                          className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Inter Total</label>
                        <input
                          type="number"
                          value={formData.interTotal}
                          onChange={e => setFormData({ ...formData, interTotal: Number(e.target.value) })}
                          className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Program Preferences */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-bold">
                      <span className="material-symbols-outlined text-[16px] text-slate-300">hub</span>
                      3. Program Choice &amp; Quota Preferences
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block text-slate-400 mb-1">First Choice Degree Track *</label>
                        <select
                          value={formData.firstChoiceProgram}
                          onChange={e => setFormData({ ...formData, firstChoiceProgram: e.target.value })}
                          className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                        >
                          <option value="BS Computer Science (BS CS)">BS Computer Science (BS CS)</option>
                          <option value="BS Software Engineering (BS SE)">BS Software Engineering (BS SE)</option>
                          <option value="BS Artificial Intelligence (BS AI)">BS Artificial Intelligence (BS AI)</option>
                          <option value="Doctor of Pharmacy (Pharm-D)">Doctor of Pharmacy (Pharm-D)</option>
                          <option value="B.Sc Civil Engineering">B.Sc Civil Engineering</option>
                          <option value="Doctor of Veterinary Medicine (DVM)">Doctor of Veterinary Medicine (DVM)</option>
                          <option value="Bachelor of Business Administration (BBA Hons)">Bachelor of Business Administration (BBA Hons)</option>
                          <option value="Bachelor of Laws (LLB 5-Year)">Bachelor of Laws (LLB 5-Year)</option>
                          <option value="BS Computer Science (5th Semester Lateral)">BS Computer Science (5th Semester Lateral)</option>
                          <option value="MS Computer Science (MS CS)">MS Computer Science (MS CS)</option>
                          <option value="Ph.D. in Computer Science">Ph.D. in Computer Science</option>
                          <option value="Associate Degree in Computer Science (ADP CS)">Associate Degree in Computer Science (ADP CS)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">Shift</label>
                        <select
                          value={formData.shift}
                          onChange={e => setFormData({ ...formData, shift: e.target.value as any })}
                          className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                        >
                          <option value="Morning">Morning Shift</option>
                          <option value="Evening">Evening / Self-Finance</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">Quota Category</label>
                        <select
                          value={formData.quota}
                          onChange={e => setFormData({ ...formData, quota: e.target.value })}
                          className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                        >
                          <option value="Open Merit">Open Merit</option>
                          <option value="South Punjab Quota">South Punjab Reserved</option>
                          <option value="Sports Quota">Sports Quota</option>
                          <option value="Disabled Quota">Disabled Persons Quota</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submission Row */}
                  <div className="pt-4 border-t border-slate-300/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-xs text-slate-400">
                      Admission voucher PKR 1,500 will be generated upon form submission.
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-7 py-3 rounded-2xl bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(241,245,249,0.35)] cursor-pointer active:scale-95 disabled:opacity-50"
                    >
                      {submitting ? 'Submitting Application...' : 'Submit & Generate Challan'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: TRACK APPLICATION */}
          {activeTab === 'track' && (
            <div className="max-w-2xl mx-auto space-y-6 py-4">
              <div className="text-center space-y-1.5">
                <h3 className="text-base font-bold text-slate-100">Check Your Admission Application Status</h3>
                <p className="text-xs text-slate-400">
                  Enter your assigned Application Tracking Number (e.g. <span className="font-mono text-cyan-300">BZU-F26-1029</span>) or CNIC.
                </p>
              </div>

              <form onSubmit={handleTrackApplication} className="flex gap-2">
                <input
                  type="text"
                  value={trackQuery}
                  onChange={e => setTrackQuery(e.target.value)}
                  placeholder="Enter Tracking ID (e.g. BZU-F26-1029)..."
                  className="flex-1 bg-slate-950/60 border border-slate-300/20 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-slate-100"
                />
                <button
                  type="submit"
                  disabled={trackLoading}
                  className="px-5 py-2.5 bg-slate-100 text-slate-950 font-bold text-xs rounded-xl hover:bg-white transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {trackLoading ? 'Searching...' : 'Track'}
                </button>
              </form>

              {/* Sample Quick Fill */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Try sample tracking code:</span>
                <button
                  type="button"
                  onClick={() => setTrackQuery('BZU-F26-1029')}
                  className="text-cyan-300 hover:underline font-mono"
                >
                  BZU-F26-1029
                </button>
              </div>

              {trackError && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {trackError}
                </div>
              )}

              {trackedRecord && (
                <div className="liquid-glass rounded-2xl p-5 border border-slate-300/25 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-300/15">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">Tracking ID</span>
                      <span className="text-base font-bold text-slate-100 font-mono">
                        {trackedRecord.appTrackingNo}
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full liquid-pill text-xs font-semibold text-emerald-300">
                      {trackedRecord.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Applicant Name</span>
                      <span className="font-semibold text-slate-200">{trackedRecord.applicantName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Father Name</span>
                      <span className="font-semibold text-slate-200">{trackedRecord.fatherName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Program Applied</span>
                      <span className="font-semibold text-slate-200">{trackedRecord.firstChoiceProgram}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Calculated Aggregate</span>
                      <span className="font-bold text-cyan-300 text-sm">{trackedRecord.calculatedAggregate}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Fee Challan</span>
                      <span className="font-mono text-slate-200">{trackedRecord.challanNumber} (PKR {trackedRecord.challanAmount})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Submission Timestamp</span>
                      <span className="text-slate-300">{new Date(trackedRecord.submissionDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: AGGREGATE CALCULATOR */}
          {activeTab === 'calculator' && (
            <div className="max-w-2xl mx-auto space-y-6 py-2">
              <div className="text-center space-y-1">
                <h3 className="text-base font-bold text-slate-100">HEC Approved Merit Aggregate Formula</h3>
                <p className="text-xs text-slate-400">
                  Matriculation (30%) + Intermediate (50%) + Entry Test Score (20%)
                </p>
              </div>

              <div className="liquid-glass rounded-2xl p-6 border border-slate-300/20 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Matric Marks ({calcMatric} / {calcMatricTotal})</label>
                    <input
                      type="number"
                      value={calcMatric}
                      onChange={e => setCalcMatric(Number(e.target.value))}
                      className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100"
                    />
                    <input
                      type="range"
                      min="400"
                      max={calcMatricTotal}
                      value={calcMatric}
                      onChange={e => setCalcMatric(Number(e.target.value))}
                      className="w-full mt-2 accent-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Inter Marks ({calcInter} / {calcInterTotal})</label>
                    <input
                      type="number"
                      value={calcInter}
                      onChange={e => setCalcInter(Number(e.target.value))}
                      className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100"
                    />
                    <input
                      type="range"
                      min="200"
                      max={calcInterTotal}
                      value={calcInter}
                      onChange={e => setCalcInter(Number(e.target.value))}
                      className="w-full mt-2 accent-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Entry Test Marks ({calcTest} / 100)</label>
                    <input
                      type="number"
                      value={calcTest}
                      onChange={e => setCalcTest(Number(e.target.value))}
                      className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100"
                    />
                    <input
                      type="range"
                      min="33"
                      max="100"
                      value={calcTest}
                      onChange={e => setCalcTest(Number(e.target.value))}
                      className="w-full mt-2 accent-cyan-400"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-400/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Your Computed Aggregate</span>
                    <span className="text-3xl font-black text-cyan-300 font-display">
                      {calculatedAggregate}%
                    </span>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-slate-400 block text-[11px]">Admission Outlook</span>
                    <span className="font-semibold text-emerald-400">
                      {calculatedAggregate >= 85
                        ? 'High Chance for Top Engineering & Computing'
                        : calculatedAggregate >= 75
                        ? 'Competitive for Sciences & Management'
                        : 'Eligible for Arts & Social Sciences'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Comparison with 2026 Cutoffs */}
              <div className="space-y-2 text-xs">
                <p className="font-bold text-slate-300 font-mono text-[11px] uppercase">
                  Fall 2026 1st Merit List Cutoff Benchmarks:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="liquid-pill p-2 rounded-xl text-center">
                    <span className="text-slate-400 block">Pharm-D</span>
                    <span className="font-bold text-slate-200">91.20%</span>
                  </div>
                  <div className="liquid-pill p-2 rounded-xl text-center">
                    <span className="text-slate-400 block">BS CS (Morning)</span>
                    <span className="font-bold text-slate-200">88.45%</span>
                  </div>
                  <div className="liquid-pill p-2 rounded-xl text-center">
                    <span className="text-slate-400 block">BS Software Engg</span>
                    <span className="font-bold text-slate-200">86.90%</span>
                  </div>
                  <div className="liquid-pill p-2 rounded-xl text-center">
                    <span className="text-slate-400 block">B.Sc Civil Engg</span>
                    <span className="font-bold text-slate-200">78.50%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MERIT LISTS */}
          {activeTab === 'merit' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-100">Fall 2026 Departmental Merit Lists</h3>
                  <p className="text-xs text-slate-400">Official closing aggregates verified by Directorate of Student Affairs</p>
                </div>
                <input
                  type="text"
                  value={meritFilter}
                  onChange={e => setMeritFilter(e.target.value)}
                  placeholder="Filter by program..."
                  className="bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
                />
              </div>

              {meritLoading ? (
                <div className="text-center py-12 text-xs text-slate-400 font-mono">Loading merit registers...</div>
              ) : (
                <div className="overflow-x-auto rounded-2xl liquid-glass border border-slate-300/15">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/60 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-300/15">
                      <tr>
                        <th className="p-3.5">Degree Program</th>
                        <th className="p-3.5 text-center">List Stage</th>
                        <th className="p-3.5 text-center">Shift</th>
                        <th className="p-3.5 text-center">Quota</th>
                        <th className="p-3.5 text-center text-cyan-300 font-bold">Closing Aggregate</th>
                        <th className="p-3.5 text-center">Fee Deadline</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-300/15 text-slate-300">
                      {meritLists
                        .filter(m => !meritFilter || m.programTitle.toLowerCase().includes(meritFilter.toLowerCase()))
                        .map(item => (
                          <tr key={item.id} className="hover:bg-slate-100/5 transition-colors">
                            <td className="p-3.5 font-semibold text-slate-100">{item.programTitle}</td>
                            <td className="p-3.5 text-center">
                              <span className="liquid-pill px-2 py-0.5 rounded text-[10px] text-slate-300 font-mono">
                                {item.listType}
                              </span>
                            </td>
                            <td className="p-3.5 text-center font-mono">{item.shift}</td>
                            <td className="p-3.5 text-center text-slate-400">{item.quota}</td>
                            <td className="p-3.5 text-center font-bold text-cyan-300 text-sm font-display">
                              {item.closingAggregate}%
                            </td>
                            <td className="p-3.5 text-center font-mono text-slate-400">{item.feeDeadline}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
