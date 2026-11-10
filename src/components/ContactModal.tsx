import React, { useState } from 'react';
import { ContactInquiry } from '../types/index.ts';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    departmentTarget: 'Registrar Office',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<ContactInquiry | null>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }
      setSubmittedTicket(data.ticket);
    } catch (err: any) {
      setError(err.message || 'Error occurred while logging grievance');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col liquid-glass-elevated rounded-3xl border border-slate-300/30 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-6 border-b border-slate-300/15 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl liquid-pill flex items-center justify-center text-slate-100">
              <span className="material-symbols-outlined text-[22px]">contact_support</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">Registrar &amp; Grievance Help Desk</h2>
              <p className="text-xs text-slate-400">
                Official contact channel for student facilitation, verification, and administrative inquiries
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

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Quick Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="liquid-glass p-3.5 rounded-2xl">
              <span className="material-symbols-outlined text-slate-300 text-[20px] mb-1">call</span>
              <p className="font-bold text-slate-100">Telephone Exchange</p>
              <p className="text-slate-400 font-mono text-[11px] mt-0.5">(+92) 61 9210071–74</p>
              <p className="text-[10px] text-slate-500">UAN: 111-222-298</p>
            </div>

            <div className="liquid-glass p-3.5 rounded-2xl">
              <span className="material-symbols-outlined text-slate-300 text-[20px] mb-1">mail</span>
              <p className="font-bold text-slate-100">Official Webmail</p>
              <p className="text-slate-400 font-mono text-[11px] mt-0.5">registrar@bzu.edu.pk</p>
              <p className="text-[10px] text-slate-500">admissions@bzu.edu.pk</p>
            </div>

            <div className="liquid-glass p-3.5 rounded-2xl">
              <span className="material-symbols-outlined text-slate-300 text-[20px] mb-1">location_on</span>
              <p className="font-bold text-slate-100">Postal Address</p>
              <p className="text-slate-400 text-[11px] mt-0.5">Main Bosan Road, Multan</p>
              <p className="text-[10px] text-slate-500">Punjab 60800, Pakistan</p>
            </div>
          </div>

          {submittedTicket ? (
            <div className="p-6 rounded-2xl liquid-glass border border-emerald-400/30 text-center space-y-4 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[28px]">mark_email_read</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">Inquiry Logged Successfully</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Your tracking ticket has been assigned to the designated department.
                </p>
                <div className="inline-block mt-3 px-4 py-1.5 rounded-xl bg-slate-950 border border-slate-700 font-mono text-cyan-300 font-bold text-sm">
                  {submittedTicket.ticketNumber}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                Please retain this ticket number for future follow-up with the Registrar Office.
              </p>
              <button
                onClick={() => setSubmittedTicket(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 text-slate-950 text-xs font-bold hover:bg-white cursor-pointer"
              >
                Submit Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">edit_note</span>
                Submit Grievance or General Inquiry
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ali Raza"
                    className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Contact Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 XXXXXXX"
                    className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Target Department *</label>
                  <select
                    value={formData.departmentTarget}
                    onChange={e => setFormData({ ...formData, departmentTarget: e.target.value })}
                    className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                  >
                    <option value="Registrar Office">Registrar Office</option>
                    <option value="Admissions Directorate">Admissions Directorate</option>
                    <option value="Controller of Examinations">Controller of Examinations</option>
                    <option value="Treasurer / Fee Branch">Treasurer / Fee Branch</option>
                    <option value="Hostel Administration">Hostel Administration</option>
                    <option value="ORIC Research Office">ORIC Research Office</option>
                  </select>
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-slate-400 mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Inconsistency in Semester Roll Number Slip / Migration Certificate"
                  className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-slate-100"
                />
              </div>

              <div className="text-xs">
                <label className="block text-slate-400 mb-1">Detailed Message / Description *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry, grievance, or verification request clearly..."
                  className="w-full bg-slate-950/60 border border-slate-300/20 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-slate-100"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-white transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
