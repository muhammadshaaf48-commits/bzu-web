import React from 'react';
import { NewsBulletin } from '../types/index.ts';

interface NewsDetailModalProps {
  news: NewsBulletin | null;
  onClose: () => void;
  onOpenAdmissions: () => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({
  news,
  onClose,
  onOpenAdmissions,
}) => {
  if (!news) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="max-w-2xl w-full liquid-glass-elevated rounded-3xl p-6 border border-slate-300/30 space-y-5 animate-in fade-in zoom-in-95">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="liquid-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono text-cyan-300 uppercase">
                {news.category}
              </span>
              <span className="text-[11px] font-mono text-slate-400">{news.publishDate}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-100 mt-2 leading-snug">{news.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg liquid-pill text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-300/10 space-y-3 text-xs text-slate-300">
          <p className="font-semibold text-slate-200">{news.summary}</p>
          <p className="leading-relaxed text-slate-400">{news.content}</p>
        </div>

        {news.attachmentName && (
          <div className="p-3 rounded-xl liquid-glass border border-slate-300/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-red-400 text-[20px]">picture_as_pdf</span>
              <div>
                <p className="font-medium text-slate-200">{news.attachmentName}</p>
                <span className="text-[10px] text-slate-400 font-mono">Official PDF Document • 1.2 MB</span>
              </div>
            </div>
            <button
              onClick={() => alert(`Downloading official document: ${news.attachmentName}`)}
              className="px-3 py-1.5 rounded-lg liquid-pill text-cyan-300 hover:text-white text-xs flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">download</span>
              Download
            </button>
          </div>
        )}

        <div className="pt-2 border-t border-slate-300/15 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl liquid-pill text-xs text-slate-300 hover:text-white cursor-pointer"
          >
            Close
          </button>
          {news.category === 'Admissions' && (
            <button
              onClick={() => {
                onClose();
                onOpenAdmissions();
              }}
              className="px-5 py-2 rounded-xl bg-slate-100 text-slate-950 text-xs font-bold hover:bg-white cursor-pointer"
            >
              Go to Admissions Portal
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
