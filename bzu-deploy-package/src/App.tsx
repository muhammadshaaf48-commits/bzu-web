import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { RankingsSection } from './components/RankingsSection.tsx';
import { MetricsSection } from './components/MetricsSection.tsx';
import { DegreePathways } from './components/DegreePathways.tsx';
import { FacultyCensus } from './components/FacultyCensus.tsx';
import { ResearchOric } from './components/ResearchOric.tsx';
import { CampusNews } from './components/CampusNews.tsx';
import { StudentPortals } from './components/StudentPortals.tsx';
import { JubileeBanner } from './components/JubileeBanner.tsx';
import { Footer } from './components/Footer.tsx';

// Interactive Modals & Drawers
import { AcademicExplorerModal } from './components/AcademicExplorerModal.tsx';
import { AdmissionsPortalModal } from './components/AdmissionsPortalModal.tsx';
import { ExaminationResultsModal } from './components/ExaminationResultsModal.tsx';
import { FacultyDirectoryModal } from './components/FacultyDirectoryModal.tsx';
import { GlobalSearchModal } from './components/GlobalSearchModal.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { AiAssistantDrawer } from './components/AiAssistantDrawer.tsx';
import { NewsDetailModal } from './components/NewsDetailModal.tsx';
import { LeadershipModal } from './components/LeadershipModal.tsx';
import { NewsBulletin } from './types/index.ts';

export default function App() {
  // Modal states
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [academicsLevel, setAcademicsLevel] = useState<string | undefined>(undefined);
  const [academicsFaculty, setAcademicsFaculty] = useState<string | undefined>(undefined);

  const [admissionsOpen, setAdmissionsOpen] = useState(false);
  const [admissionsTab, setAdmissionsTab] = useState<'apply' | 'track' | 'calculator' | 'merit'>('apply');
  const [selectedProgramForApply, setSelectedProgramForApply] = useState('');

  const [resultsOpen, setResultsOpen] = useState(false);
  const [facultyOpen, setFacultyOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [leadershipOpen, setLeadershipOpen] = useState(false);

  const [selectedNews, setSelectedNews] = useState<NewsBulletin | null>(null);
  const [newsList, setNewsList] = useState<NewsBulletin[]>([]);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => setNewsList(data))
      .catch(console.error);
  }, []);

  // Keyboard shortcut for Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openAcademicsWithLevel = (level?: string) => {
    setAcademicsLevel(level);
    setAcademicsFaculty(undefined);
    setAcademicsOpen(true);
  };

  const openAcademicsWithFaculty = (facultyId?: string) => {
    setAcademicsFaculty(facultyId);
    setAcademicsLevel(undefined);
    setAcademicsOpen(true);
  };

  const openAdmissionsWithTab = (tab: 'apply' | 'track' | 'calculator' | 'merit' = 'apply') => {
    setAdmissionsTab(tab);
    setAdmissionsOpen(true);
  };

  const handleApplyForProgram = (programTitle: string) => {
    setSelectedProgramForApply(programTitle);
    setAdmissionsTab('apply');
    setAdmissionsOpen(true);
  };

  return (
    <div
      className="text-slate-100 selection:bg-slate-200 selection:text-black antialiased overflow-x-hidden relative min-h-screen"
      style={{
        background: 'radial-gradient(circle at 50% 0%, rgb(21, 24, 36) 0%, rgb(13, 14, 21) 45%, rgb(7, 7, 11) 100%) fixed',
      }}
    >
      {/* Ambient Light Orbs & Optical Depth Backdrops with Opaline Pearlescent Floating Refraction */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-[radial-gradient(circle_at_center,rgba(226,232,240,0.18)_0%,rgba(203,213,225,0.1)_40%,transparent_75%)] blur-[100px] orb-anim-1"></div>
        <div className="absolute top-[25%] -left-36 w-[850px] h-[850px] bg-[radial-gradient(circle_at_center,rgba(241,245,249,0.14)_0%,rgba(148,163,184,0.08)_45%,transparent_70%)] blur-[120px] orb-anim-2"></div>
        <div className="absolute top-[50%] -right-36 w-[950px] h-[950px] bg-[radial-gradient(circle_at_center,rgba(226,232,240,0.14)_0%,rgba(100,116,139,0.08)_45%,transparent_70%)] blur-[130px] orb-anim-3"></div>
        <div className="absolute bottom-10 left-1/4 w-[1000px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(248,250,252,0.12)_0%,rgba(203,213,225,0.07)_50%,transparent_75%)] blur-[110px] orb-anim-1"></div>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(248,250,252,0.06)_1px,transparent_1px)] [background-size:32px_32px] opacity-60"></div>
      </div>

      {/* Main Header & Navbar */}
      <Header
        onOpenAdmissions={() => openAdmissionsWithTab('apply')}
        onOpenAcademics={openAcademicsWithLevel}
        onOpenResults={() => setResultsOpen(true)}
        onOpenFaculty={() => setFacultyOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
      />

      <main className="relative z-10 w-full pt-4 sm:pt-8 pb-16">
        {/* Hero Section */}
        <Hero
          onOpenAdmissions={openAdmissionsWithTab}
          onOpenAiAssistant={() => setAiAssistantOpen(true)}
          onOpenResults={() => setResultsOpen(true)}
          onOpenAcademics={() => openAcademicsWithLevel('All')}
        />

        {/* Global Academic Standings & Rankings */}
        <RankingsSection />

        {/* Scale & Institutional Stature */}
        <MetricsSection />

        {/* Explore Degree Pathways (6 Pathways) */}
        <DegreePathways
          onSelectLevel={openAcademicsWithLevel}
          onOpenAdmissions={() => openAdmissionsWithTab('apply')}
        />

        {/* Faculty Census & Academic Strength */}
        <FacultyCensus onOpenFacultyDirectory={() => setFacultyOpen(true)} />

        {/* Research & Innovation (ORIC) */}
        <ResearchOric
          onOpenAdmissions={openAdmissionsWithTab}
          onOpenAcademics={openAcademicsWithLevel}
        />

        {/* Campus News, Schedules, Results & Vacancies */}
        <CampusNews
          newsList={newsList}
          onOpenAdmissions={openAdmissionsWithTab}
          onOpenResults={() => setResultsOpen(true)}
          onSelectNews={news => setSelectedNews(news)}
        />

        {/* Student & Affiliated Portals */}
        <StudentPortals
          onOpenAdmissions={openAdmissionsWithTab}
          onOpenResults={() => setResultsOpen(true)}
        />

        {/* 50th Golden Jubilee Era Banner */}
        <JubileeBanner
          onOpenAdmissions={() => openAdmissionsWithTab('apply')}
          onOpenLeadershipMessage={() => setLeadershipOpen(true)}
        />
      </main>

      {/* Liquid Glass Footer */}
      <Footer
        onOpenAcademics={openAcademicsWithFaculty}
        onOpenResults={() => setResultsOpen(true)}
        onOpenFaculty={() => setFacultyOpen(true)}
        onOpenAdmissions={() => openAdmissionsWithTab('apply')}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Floating BZU AI Quick Assistant Trigger Button */}
      <button
        onClick={() => setAiAssistantOpen(true)}
        className="fixed bottom-6 right-6 z-40 liquid-glass-elevated px-4 py-3 rounded-full flex items-center gap-2.5 text-slate-100 hover:text-white border border-slate-300/30 shadow-[0_0_30px_rgba(241,245,249,0.3)] hover:scale-105 transition-all cursor-pointer active:scale-95 group"
        title="BZU Academic AI Assistant"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 beacon-dot"></span>
        <span className="material-symbols-outlined text-[20px] text-cyan-300 group-hover:rotate-12 transition-transform">
          psychology
        </span>
        <span className="text-xs font-bold tracking-wide">BZU AI</span>
      </button>

      {/* Modals & Dialogs */}
      <AcademicExplorerModal
        isOpen={academicsOpen}
        onClose={() => setAcademicsOpen(false)}
        initialLevel={academicsLevel}
        initialFacultyId={academicsFaculty}
        onApplyForProgram={handleApplyForProgram}
      />

      <AdmissionsPortalModal
        isOpen={admissionsOpen}
        onClose={() => setAdmissionsOpen(false)}
        initialTab={admissionsTab}
        preselectedProgram={selectedProgramForApply}
      />

      <ExaminationResultsModal
        isOpen={resultsOpen}
        onClose={() => setResultsOpen(false)}
      />

      <FacultyDirectoryModal
        isOpen={facultyOpen}
        onClose={() => setFacultyOpen(false)}
      />

      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProgram={handleApplyForProgram}
        onOpenAdmissions={() => openAdmissionsWithTab('apply')}
        onOpenResults={() => setResultsOpen(true)}
        onOpenFaculty={() => setFacultyOpen(true)}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <AiAssistantDrawer
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />

      <NewsDetailModal
        news={selectedNews}
        onClose={() => setSelectedNews(null)}
        onOpenAdmissions={() => openAdmissionsWithTab('apply')}
      />

      <LeadershipModal
        isOpen={leadershipOpen}
        onClose={() => setLeadershipOpen(false)}
        onOpenAdmissions={() => openAdmissionsWithTab('apply')}
      />
    </div>
  );
}
