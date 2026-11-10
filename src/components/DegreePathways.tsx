import React from 'react';

interface DegreePathwaysProps {
  onSelectLevel: (level: string) => void;
  onOpenAdmissions: () => void;
}

export const DegreePathways: React.FC<DegreePathwaysProps> = ({ onSelectLevel, onOpenAdmissions }) => {
  const pathways = [
    {
      title: 'Undergraduate Programs',
      level: 'Undergraduate',
      badge: '117 Programs',
      duration: '4–5 Yrs • Morning/Evening',
      description: '4-Year BS & professional honors degrees spanning Computer Science, Engineering, Law, Pharmacy, and Agricultural Sciences.',
      cta: 'Explore BS',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjdsggp5zbPtlyVd6UOCAnrCB7gFOWMRqNAOQO-gwju7bp0oFRnc8LYgj3ofEMHIhx8LVNQsLo5Ia-VvABGllB6B2v_iN9P5fn-B-Up6P2Z6sGoX2XGm-x2qTE7qMonFaSCiuJ7wY_VrRl1eCJKOoi4Xh51yfOgsuvCn6ivPfXZlmqMER0Kz60KKzqMhVddD2mNOZZ8uZIyiJL37guvdi7Yfa1IiJsyKIl_6N25c0',
    },
    {
      title: 'BS (5th Sem) Lateral Entry',
      level: 'Lateral BS (5th Sem)',
      badge: '47 Pathways',
      duration: '2-Year Duration (Sem 5–8)',
      description: 'Direct lateral admission into the 5th semester for holders of 14 years of education (BA / B.Sc / Associate Degree credentials).',
      cta: 'View Routes',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMAbp16jnFDSivefwtJPGCOVpYNLJWCk--_Js3FrTaK8b2ldVC3qdDS_sPlUYZv2YX6x1eAl6Ne28aisa_6l3Ji21uZ5siZeEoCHZwMj891h8cjY6OQrI6lS8PUZk1gdw9Izcj-e8K2XYqdLgOSalP2orGxZ0ztyHVRhgldzHmQfHiqQmzQaTFn-1jnBPoDq9mvaDweXTQHHvk_gu8T8SMRNK5Km0znNpZRXM3zyw',
    },
    {
      title: 'Graduate (MS / M.Phil)',
      level: 'MS / M.Phil',
      badge: '79 Disciplines',
      duration: '2 to 3 Years • Thesis Track',
      description: 'Rigorous research-driven master\'s degrees tailored for scholastic depth, industrial problem-solving, and thesis-based scholarship.',
      cta: 'Explore MS',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQlgwlMobnf3hsTeCgq4n9X6AzvL6AX2EP60a0Z3-GW8RSLCxFczFsBX6TfBDnqmn20JrwA_LOYoQZhxb7y6vAt3hiEhWuCYUAxWmjQv2iGRL_NcNiytoFwNxAJXI0cCtFNcHmkywYwm8BVZ0E-uRZZuM-6to9ekuQZaNyz3F1VeVaonOhVvkkBofcoYNd_Bof6LVxYqTOE72d6lgq5WXrW5DYbTC8VewgsF2meVA',
    },
    {
      title: 'Doctoral (PhD) Programs',
      level: 'Doctoral (PhD)',
      badge: '35 Fields',
      duration: '3 to 5 Years • Funded',
      description: 'Highest academic qualification with full laboratory funding, international co-supervision options, and HEC scholarship allocations.',
      cta: 'PhD Admissions',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhpRF_HEu2BAxYor-DcnpmhEOfMZmxco7ummOoYiLGiQUEucjHinf5kPbMKFa14ElJXr2DIVTEVU0xDMpib1txfqH75PfKl-0iPNXmgGroQgXGic-A0DQI7U4E9eQ-DzyHN8aa-EYz9Q5O6W9SCNUriuIl0LDrbSr9QbxlGj761mX2kYHqpnYfljs_zG5hlLOiGEuDZClmq9qic8vp9FMhD604Uyywq7qVZS3FR7U',
    },
    {
      title: 'Associate Degrees (ADP)',
      level: 'Associate Degree (ADP)',
      badge: '41 Programs',
      duration: '2-Year Fast Track',
      description: 'Market-aligned 2-year degrees created for immediate industry entry and articulated direct bridge to senior university semesters.',
      cta: 'View ADP List',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAraN7pYJu45rlSrK4doBRzY1bosNGsv74N85fT2llU-voSUuAF351unZJLK-7SiF3qYPHEY1jCVau1lCzpXwY3FHwWJbqlnE3vG7DJ_nNC1j0vEnK01McaGY-PRjIUVgvToAk1RAuWrjBLBiYF7UoYmA0ObudD7hQEG0VNiGxHHzpMGhrwUBzGJEIPL20FqpaA6l7NSds5EX_G6Mtd9kHxfL0HEBcyGVIINT5-hXQ',
    },
    {
      title: 'Diplomas & Certificates',
      level: 'Diploma',
      badge: 'Postgraduate Diplomas',
      duration: '1-Year Intensive',
      description: 'Includes Advance Diploma in Clinical Psychology (ADCP), Environmental Auditing, Corporate Law, and Islamic Banking credentials.',
      cta: 'Explore Diplomas',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrQSSWlfhcWFzDAHbtqvZ84L-zxuDXtmtSqNc0v6EAVwQHba8iXEzMH66mPVMTADK9iTZDVT8jNkoDDCmRjtZs4nbuCK3tWOtEDaq4iDQpXhqJE_33wurYNZv6phfYABANVMsJR-p8Jq080vM0N6sXB-49wgARBcvIGBzHBjRXL0PqKHYhDu0W4mQxxRplR-1_Ibz3E_2Th2lKOs9KiZFC4O6KuHC_O41vgO0yz58',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16" id="academic-explorer">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="liquid-pill px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
            Academic Degrees
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-2">
            Explore Degree Pathways
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mt-1">
            Choose from comprehensive undergraduate tracks, evening programs, master's degrees, and doctoral fellowships across 10 faculties.
          </p>
        </div>

        <button
          onClick={() => onSelectLevel('All')}
          className="liquid-pill hover:bg-slate-100 hover:text-slate-950 px-5 py-2.5 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer active:scale-95"
        >
          <span>Search Full Catalog</span>
          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {pathways.map((item, idx) => (
          <div
            key={idx}
            className="liquid-glass-elevated rounded-3xl overflow-hidden group flex flex-col transition-all spotlight-card sheen-overlay"
          >
            <div className="h-48 relative overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out card-img-zoom"
                style={{ backgroundImage: `url("${item.image}")` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
              <span className="absolute top-4 left-4 liquid-pill px-3 py-1 rounded-full text-[10px] font-mono text-slate-200 font-semibold">
                {item.badge}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-300/15 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">{item.duration}</span>
                <button
                  onClick={() => onSelectLevel(item.level)}
                  className="text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                >
                  <span>{item.cta}</span>
                  <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
