import React, { useState, useRef, useEffect } from 'react';
import { AiChatMessage } from '../types/index.ts';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I am the **BZU Academic AI Assistant**. 
How can I assist you today? You can inquire about **Admissions Fall 2026**, fee schedules, degree tracks, merit cutoffs, faculty research, or roll number slips.

You can switch between **Fast Response** (low latency via \`gemini-3.1-flash-lite\`) and **Deep Thinking** (advanced reasoning via \`gemini-4-carbon\`).`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.1-flash-lite',
    },
  ]);

  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'fast' | 'deep-think'>('fast');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: AiChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          mode,
          history: messages.slice(-6),
        }),
      });

      const data = await res.json();
      const aiReply: AiChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || data.fallback || 'I am ready to help you with your inquiry.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || (mode === 'deep-think' ? 'gemini-4-carbon' : 'gemini-3.1-flash-lite'),
        thinkingMode: mode === 'deep-think',
      };
      setMessages(prev => [...prev, aiReply]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: 'Unable to reach AI Assistant server at the moment. Please contact registrar@bzu.edu.pk or try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestionChips = [
    'Eligibility for BS Computer Science Fall 2026?',
    'Compare BS Software Engineering vs BS Artificial Intelligence.',
    'How does lateral BS 5th semester entry work?',
    'What scholarships are available under HEC Need-Based cell?',
  ];

  return (
    <div className="fixed inset-0 z-60 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg h-full liquid-glass-elevated border-l border-slate-300/25 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-300/15 flex items-center justify-between gap-3 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl liquid-pill flex items-center justify-center text-cyan-300">
              <span className="material-symbols-outlined text-[20px]">psychology</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-1.5">
                BZU AI Assistant
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </h3>
              <p className="text-[10px] text-slate-400 font-mono">
                Model: {mode === 'deep-think' ? 'gemini-4-carbon (Thinking HIGH)' : 'gemini-3.1-flash-lite (Low Latency)'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg liquid-pill text-slate-400 hover:text-white flex items-center justify-center cursor-pointer active:scale-90"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Intelligence Mode Switcher */}
        <div className="p-3 border-b border-slate-300/15 bg-slate-900/50 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono text-[11px]">Reasoning Mode:</span>
          <div className="flex items-center gap-1 liquid-pill p-1 rounded-xl">
            <button
              onClick={() => setMode('fast')}
              className={`px-3 py-1 rounded-lg text-xs transition-all cursor-pointer font-medium flex items-center gap-1 ${
                mode === 'fast'
                  ? 'bg-slate-100 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">bolt</span>
              Fast (Low-Latency)
            </button>
            <button
              onClick={() => setMode('deep-think')}
              className={`px-3 py-1 rounded-lg text-xs transition-all cursor-pointer font-medium flex items-center gap-1 ${
                mode === 'deep-think'
                  ? 'bg-cyan-300 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">network_intelligence</span>
              Deep Thinking
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl ${
                  m.sender === 'user'
                    ? 'bg-slate-100 text-slate-950 font-medium'
                    : 'liquid-glass border border-slate-300/20 text-slate-200'
                }`}
              >
                <div className="prose prose-invert prose-xs text-xs whitespace-pre-wrap leading-relaxed">
                  {m.text}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-500 font-mono">
                <span>{m.timestamp}</span>
                {m.modelUsed && (
                  <>
                    <span>•</span>
                    <span className="text-cyan-300/80">{m.modelUsed}</span>
                  </>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-2">
              <div className="liquid-glass p-3.5 rounded-2xl border border-cyan-400/30 flex items-center gap-2">
                <span className="material-symbols-outlined text-cyan-300 text-[18px] animate-spin">
                  sync
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  {mode === 'deep-think'
                    ? 'Evaluating academic criteria with deep reasoning (Thinking HIGH)...'
                    : 'Generating response with gemini-3.1-flash-lite...'}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="px-3 py-2 border-t border-slate-300/10 bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
          {suggestionChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="liquid-pill px-2.5 py-1 rounded-lg text-slate-300 hover:text-white whitespace-nowrap cursor-pointer transition-all active:scale-95"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-300/15 bg-slate-950/80">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything about BZU Multan admissions, fees, degrees..."
              className="flex-1 bg-slate-900 border border-slate-300/20 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-slate-100"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-xl bg-slate-100 text-slate-950 flex items-center justify-center hover:bg-white transition-all cursor-pointer disabled:opacity-40 active:scale-90 shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
