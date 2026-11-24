import React, { useState, useEffect } from 'react';
import {
  HostedDatabase,
  loadHostedDatabase,
  getCustomJsonUrl,
  setCustomJsonUrl,
  getLoadedSourcePath,
} from '../services/hostedData.ts';

interface HostedDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataReloaded: (db: HostedDatabase) => void;
}

export const HostedDataModal: React.FC<HostedDataModalProps> = ({
  isOpen,
  onClose,
  onDataReloaded,
}) => {
  const [db, setDb] = useState<HostedDatabase | null>(null);
  const [loading, setLoading] = useState(false);
  const [jsonUrlInput, setJsonUrlInput] = useState('');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const fetchLatest = async (force = false) => {
    setLoading(true);
    setError('');
    try {
      const loaded = await loadHostedDatabase(force);
      setDb(loaded);
      onDataReloaded(loaded);
      const customKeys = loaded.customData ? Object.keys(loaded.customData) : [];
      if (customKeys.length > 0 && activeTab === 'overview') {
        setActiveTab(`custom:${customKeys[0]}`);
      }
    } catch (err: any) {
      setError(err?.message || 'Unable to load JSON data from the specified path.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    setJsonUrlInput(getCustomJsonUrl() || getLoadedSourcePath() || '');
    fetchLatest(true);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLoadCustomUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustomJsonUrl(jsonUrlInput);
    await fetchLatest(true);
  };

  const handleResetDefault = async () => {
    setJsonUrlInput('');
    setCustomJsonUrl('');
    await fetchLatest(true);
  };

  const customKeys = db?.customData ? Object.keys(db.customData) : [];
  const q = searchQuery.trim().toLowerCase();

  const renderGenericValue = (val: unknown): string => {
    if (val === null || val === undefined) return '—';
    if (Array.isArray(val)) return val.map(v => (typeof v === 'object' ? JSON.stringify(v) : String(v))).join(', ');
    if (typeof val === 'object') return JSON.stringify(val);
    return String(val);
  };

  const renderCustomCollection = (key: string) => {
    const rawVal = db?.customData?.[key];
    if (Array.isArray(rawVal)) {
      const rows = rawVal.filter(item =>
        !q ? true : JSON.stringify(item).toLowerCase().includes(q)
      );
      if (rows.length === 0) {
        return <p className="text-xs text-slate-400 py-8 text-center">No matching records in "{key}".</p>;
      }

      const firstObj = rows.find(r => r && typeof r === 'object' && !Array.isArray(r)) as Record<string, unknown> | undefined;
      if (firstObj) {
        const columns = Array.from(
          new Set(
            rows.flatMap(r => (r && typeof r === 'object' ? Object.keys(r as Record<string, unknown>) : []))
          )
        );
        return (
          <div className="overflow-x-auto rounded-2xl border border-slate-300/15">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-300 font-mono uppercase text-[10px] tracking-wider border-b border-slate-300/15">
                <tr>
                  {columns.map(col => (
                    <th key={col} className="py-3 px-4 whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300/10 text-slate-200">
                {rows.map((row, idx) => {
                  const rec = (row && typeof row === 'object' ? row : { value: row }) as Record<string, unknown>;
                  return (
                    <tr key={idx} className="hover:bg-white/[0.04] transition-colors">
                      {columns.map(col => (
                        <td key={col} className="py-3 px-4 max-w-xs truncate" title={renderGenericValue(rec[col])}>
                          {renderGenericValue(rec[col])}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }

      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {rows.map((item, i) => (
            <div key={i} className="liquid-glass p-4 rounded-2xl text-xs text-slate-200">
              {renderGenericValue(item)}
            </div>
          ))}
        </div>
      );
    }

    if (rawVal && typeof rawVal === 'object') {
      const entries = Object.entries(rawVal as Record<string, unknown>).filter(
        ([k, v]) => !q || k.toLowerCase().includes(q) || JSON.stringify(v).toLowerCase().includes(q)
      );
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {entries.map(([k, v]) => (
            <div key={k} className="liquid-glass p-4 rounded-2xl space-y-1">
              <span className="text-[10px] font-mono uppercase text-cyan-300">{k}</span>
              <p className="text-xs text-slate-200 break-words">{renderGenericValue(v)}</p>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="liquid-glass p-4 rounded-2xl text-xs text-slate-200">
        {renderGenericValue(rawVal)}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col liquid-glass-elevated rounded-3xl border border-slate-300/30 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-6 border-b border-slate-300/15 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl liquid-pill flex items-center justify-center text-cyan-300">
              <span className="material-symbols-outlined text-[22px]">dataset</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">Institutional Data Directory</h2>
              <p className="text-xs text-slate-400">
                Browse live university records or connect a hosted JSON data file on your domain
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

        {/* Hosted JSON File Path Selector */}
        <div className="p-5 border-b border-slate-300/15 bg-slate-900/50 space-y-3">
          <form onSubmit={handleLoadCustomUrl} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-cyan-300 text-[18px]">
                link
              </span>
              <input
                type="text"
                value={jsonUrlInput}
                onChange={e => setJsonUrlInput(e.target.value)}
                placeholder="Enter hosted JSON file path or URL (e.g. /data.json or /bzu_database.json)..."
                className="w-full bg-slate-950/70 border border-slate-300/20 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-slate-100 font-mono"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-2xl bg-slate-100 text-slate-950 font-bold text-xs hover:bg-white transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load JSON File'}
              </button>
              <button
                type="button"
                onClick={handleResetDefault}
                className="px-4 py-2.5 rounded-2xl liquid-pill text-slate-300 hover:text-white text-xs font-medium cursor-pointer"
              >
                Auto Detect
              </button>
            </div>
          </form>

          {error && (
            <p className="text-xs text-rose-300 font-mono">{error}</p>
          )}

          {/* Category Tabs & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'overview'
                    ? 'bg-slate-100 text-slate-950 font-bold'
                    : 'liquid-pill text-slate-300 hover:text-white'
                }`}
              >
                Summary
              </button>
              {customKeys.map(key => (
                <button
                  key={key}
                  onClick={() => setActiveTab(`custom:${key}`)}
                  className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-all capitalize ${
                    activeTab === `custom:${key}`
                      ? 'bg-cyan-300 text-slate-950 font-bold'
                      : 'liquid-pill text-cyan-300 hover:text-white'
                  }`}
                >
                  {key}
                </button>
              ))}
              <button
                onClick={() => setActiveTab('programs')}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'programs'
                    ? 'bg-slate-100 text-slate-950 font-bold'
                    : 'liquid-pill text-slate-300 hover:text-white'
                }`}
              >
                Programs ({db?.programs.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('faculty')}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'faculty'
                    ? 'bg-slate-100 text-slate-950 font-bold'
                    : 'liquid-pill text-slate-300 hover:text-white'
                }`}
              >
                Faculty ({db?.facultyMembers.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('merit')}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'merit'
                    ? 'bg-slate-100 text-slate-950 font-bold'
                    : 'liquid-pill text-slate-300 hover:text-white'
                }`}
              >
                Merit Lists ({db?.meritEntries.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'results'
                    ? 'bg-slate-100 text-slate-950 font-bold'
                    : 'liquid-pill text-slate-300 hover:text-white'
                }`}
              >
                Results ({db?.examResults.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'news'
                    ? 'bg-slate-100 text-slate-950 font-bold'
                    : 'liquid-pill text-slate-300 hover:text-white'
                }`}
              >
                News ({db?.newsBulletins.length || 0})
              </button>
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter records..."
              className="bg-slate-950/70 border border-slate-300/20 rounded-xl px-3.5 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-slate-100 md:w-56"
            />
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {loading ? (
            <div className="py-16 text-center text-xs text-slate-400 font-mono">
              Loading records from hosted JSON...
            </div>
          ) : !db ? (
            <div className="py-16 text-center text-xs text-slate-400">No data loaded.</div>
          ) : activeTab === 'overview' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'Faculties', count: db.faculties.length, tab: 'programs' },
                { label: 'Departments', count: db.departments.length, tab: 'programs' },
                { label: 'Programs', count: db.programs.length, tab: 'programs' },
                { label: 'Faculty Roster', count: db.facultyMembers.length, tab: 'faculty' },
                { label: 'Merit Entries', count: db.meritEntries.length, tab: 'merit' },
                { label: 'Exam Results', count: db.examResults.length, tab: 'results' },
              ].map(card => (
                <button
                  key={card.label}
                  onClick={() => setActiveTab(card.tab)}
                  className="liquid-glass p-5 rounded-2xl text-left space-y-1 hover:border-slate-200/40 transition-all cursor-pointer"
                >
                  <span className="text-2xl font-extrabold text-slate-100 block">{card.count}</span>
                  <span className="text-[11px] font-mono uppercase text-slate-400">{card.label}</span>
                </button>
              ))}
              {customKeys.map(key => {
                const val = db.customData?.[key];
                const count = Array.isArray(val) ? val.length : typeof val === 'object' && val ? Object.keys(val).length : 1;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(`custom:${key}`)}
                    className="liquid-glass p-5 rounded-2xl text-left space-y-1 border border-cyan-400/25 hover:border-cyan-300/60 transition-all cursor-pointer"
                  >
                    <span className="text-2xl font-extrabold text-cyan-300 block">{count}</span>
                    <span className="text-[11px] font-mono uppercase text-slate-300 truncate block">{key}</span>
                  </button>
                );
              })}
            </div>
          ) : activeTab.startsWith('custom:') ? (
            renderCustomCollection(activeTab.slice('custom:'.length))
          ) : activeTab === 'programs' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {db.programs
                .filter(p => !q || JSON.stringify(p).toLowerCase().includes(q))
                .map(p => (
                  <div key={p.id} className="liquid-glass p-5 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="liquid-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono text-cyan-300">
                        {p.level}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">PKR {p.annualFeePKR?.toLocaleString()}/yr</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-100">{p.title}</h3>
                    <p className="text-xs text-slate-400">{p.departmentName} • {p.facultyName}</p>
                  </div>
                ))}
            </div>
          ) : activeTab === 'faculty' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {db.facultyMembers
                .filter(f => !q || JSON.stringify(f).toLowerCase().includes(q))
                .map(f => (
                  <div key={f.id} className="liquid-glass p-5 rounded-2xl space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-cyan-300">{f.designation}</span>
                    <h3 className="text-sm font-bold text-slate-100">{f.name}</h3>
                    <p className="text-xs text-slate-400">{f.departmentName}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{f.email} • {f.officeRoom}</p>
                  </div>
                ))}
            </div>
          ) : activeTab === 'merit' ? (
            <div className="overflow-x-auto rounded-2xl border border-slate-300/15">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-300 font-mono uppercase text-[10px] border-b border-slate-300/15">
                  <tr>
                    <th className="py-3 px-4">Program</th>
                    <th className="py-3 px-4">List</th>
                    <th className="py-3 px-4">Shift</th>
                    <th className="py-3 px-4">Closing %</th>
                    <th className="py-3 px-4">Fee Deadline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300/10 text-slate-200">
                  {db.meritEntries
                    .filter(m => !q || JSON.stringify(m).toLowerCase().includes(q))
                    .map(m => (
                      <tr key={m.id} className="hover:bg-white/[0.04]">
                        <td className="py-3 px-4 font-semibold">{m.programTitle}</td>
                        <td className="py-3 px-4">{m.listType}</td>
                        <td className="py-3 px-4">{m.shift}</td>
                        <td className="py-3 px-4 font-mono font-bold text-cyan-300">{m.closingAggregate}%</td>
                        <td className="py-3 px-4 font-mono text-slate-400">{m.feeDeadline}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : activeTab === 'results' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {db.examResults
                .filter(r => !q || JSON.stringify(r).toLowerCase().includes(q))
                .map(r => (
                  <div key={r.rollNumber} className="liquid-glass p-5 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-cyan-300 font-bold">{r.rollNumber}</span>
                      <span className="liquid-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono text-emerald-300">
                        CGPA {r.cgpa} • {r.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-100">{r.studentName}</h3>
                    <p className="text-xs text-slate-400">{r.program} • {r.semester}</p>
                  </div>
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {db.newsBulletins
                .filter(n => !q || JSON.stringify(n).toLowerCase().includes(q))
                .map(n => (
                  <div key={n.id} className="liquid-glass p-5 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="liquid-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono text-cyan-300">
                        {n.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{n.publishDate}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-100">{n.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{n.summary}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
