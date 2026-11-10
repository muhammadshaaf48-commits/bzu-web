import fs from 'fs';
import path from 'path';
import {
  Faculty,
  Department,
  Program,
  FacultyMember,
  MeritEntry,
  ExamResult,
  AdmissionApplication,
  NewsBulletin,
  ContactInquiry,
} from '../types/index.ts';

const DATA_DIR = path.resolve(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'bzu_database.json');

interface DatabaseStore {
  faculties: Faculty[];
  departments: Department[];
  programs: Program[];
  facultyMembers: FacultyMember[];
  meritEntries: MeritEntry[];
  examResults: ExamResult[];
  applications: AdmissionApplication[];
  newsBulletins: NewsBulletin[];
  contactInquiries: ContactInquiry[];
  subscribers: string[];
}

const initialFaculties: Faculty[] = [
  {
    id: 'fac-arts',
    name: 'Faculty of Arts & Social Sciences',
    code: 'FASS',
    dean: 'Prof. Dr. Muhammad Farooq',
    departmentsCount: 12,
    programsCount: 28,
    description: 'Premier seat of humanities, languages, sociology, history, and behavioral research established since 1975.',
  },
  {
    id: 'fac-science',
    name: 'Faculty of Science',
    code: 'FS',
    dean: 'Prof. Dr. Tariq Mahmood Ansari',
    departmentsCount: 11,
    programsCount: 34,
    description: 'Home to cutting-edge physical, chemical, biological, and mathematical research centers.',
  },
  {
    id: 'fac-engg',
    name: 'Faculty of Engineering & Technology',
    code: 'FET',
    dean: 'Prof. Dr. Engr. Rehan Zahid',
    departmentsCount: 6,
    programsCount: 18,
    description: 'PEC-accredited engineering college featuring state-of-the-art automation and advanced fabrication facilities.',
  },
  {
    id: 'fac-agri',
    name: 'Faculty of Agricultural Sciences',
    code: 'FAS',
    dean: 'Prof. Dr. Nazim Hussain',
    departmentsCount: 8,
    programsCount: 22,
    description: 'Leading agricultural innovation hub with 500+ acres experimental farms, cotton genetics, and climate-resilient crop research.',
  },
  {
    id: 'fac-pharm',
    name: 'Faculty of Pharmacy',
    code: 'FP',
    dean: 'Prof. Dr. Bashir Ahmad',
    departmentsCount: 4,
    programsCount: 8,
    description: 'Pharmacy Council of Pakistan (PCP) recognized center for drug discovery, clinical pharmacology, and nanomedicine.',
  },
  {
    id: 'fac-vet',
    name: 'Faculty of Veterinary Sciences',
    code: 'FVS',
    dean: 'Prof. Dr. Mushtaq Ahmad',
    departmentsCount: 6,
    programsCount: 12,
    description: 'PVMC recognized teaching hospital, animal surgical theater, livestock health, and epidemiology wing.',
  },
  {
    id: 'fac-comm-law',
    name: 'Faculty of Commerce, Law & Business Administration',
    code: 'FCLBA',
    dean: 'Prof. Dr. Nauman Abbasi',
    departmentsCount: 5,
    programsCount: 26,
    description: 'NBEAC accredited business school (IMS) and Gillani Law College driving leadership in corporate finance, management, and jurisprudence.',
  },
  {
    id: 'fac-islamic',
    name: 'Faculty of Islamic Studies & Languages',
    code: 'FISL',
    dean: 'Prof. Dr. Abdul Quddus Suhaib',
    departmentsCount: 6,
    programsCount: 14,
    description: 'Dedicated to classical Quranic hermeneutics, Islamic jurisprudence, Arabic, Persian, and comparative theology.',
  },
  {
    id: 'fac-food',
    name: 'Faculty of Food Science & Nutrition',
    code: 'FFSN',
    dean: 'Prof. Dr. Saeed Akhtar',
    departmentsCount: 4,
    programsCount: 10,
    description: 'Pioneering functional foods, sensory evaluation, clinical dietetics, and regional food safety standards.',
  },
  {
    id: 'fac-edu',
    name: 'Faculty of Education',
    code: 'FE',
    dean: 'Prof. Dr. Khalid Khurshid',
    departmentsCount: 3,
    programsCount: 9,
    description: 'Specialized teacher education, educational leadership, instructional technology, and special education pedagogy.',
  },
];

const initialDepartments: Department[] = [
  { id: 'dept-cs', name: 'Department of Computer Science & IT', facultyId: 'fac-science', facultyName: 'Faculty of Science', headOfDepartment: 'Prof. Dr. M. Shahid', contactEmail: 'cs@bzu.edu.pk', location: 'Science Block B, Bosan Campus', description: 'NCEAC \'W\' rated center for Software Engineering, AI, and Cyber Security.' },
  { id: 'dept-chem', name: 'Institute of Chemical Sciences', facultyId: 'fac-science', facultyName: 'Faculty of Science', headOfDepartment: 'Prof. Dr. M. Yaqub', contactEmail: 'chemistry@bzu.edu.pk', location: 'Chemistry Complex', description: 'Advanced spectrometry, polymers, organic synthesis, and biochemistry.' },
  { id: 'dept-phys', name: 'Department of Physics', facultyId: 'fac-science', facultyName: 'Faculty of Science', headOfDepartment: 'Prof. Dr. M. Farooq', contactEmail: 'physics@bzu.edu.pk', location: 'Physics Block', description: 'Solid-state physics, renewable solar energy cells, and computational physics.' },
  { id: 'dept-math', name: 'Department of Mathematics', facultyId: 'fac-science', facultyName: 'Faculty of Science', headOfDepartment: 'Prof. Dr. Imran Javaid', contactEmail: 'math@bzu.edu.pk', location: 'Mathematical Sciences Wing', description: 'Pure & applied mathematics, fluid dynamics, and statistical modeling.' },
  { id: 'dept-biotech', name: 'Institute of Pure & Applied Biology (Zoology/Botany)', facultyId: 'fac-science', facultyName: 'Faculty of Science', headOfDepartment: 'Prof. Dr. S. Rana', contactEmail: 'biology@bzu.edu.pk', location: 'Biology Complex', description: 'Genomics, entomology, environmental microbiology, and molecular genetics.' },

  { id: 'dept-civil', name: 'Department of Civil Engineering', facultyId: 'fac-engg', facultyName: 'Faculty of Engineering & Technology', headOfDepartment: 'Prof. Dr. Engr. Asad', contactEmail: 'civil@bzu.edu.pk', location: 'Engineering College Wing A', description: 'Structural mechanics, geotechnical testing, hydraulics, and highway engineering.' },
  { id: 'dept-elect', name: 'Department of Electrical Engineering', facultyId: 'fac-engg', facultyName: 'Faculty of Engineering & Technology', headOfDepartment: 'Prof. Dr. Engr. K. Babar', contactEmail: 'electrical@bzu.edu.pk', location: 'Engineering College Wing B', description: 'Power systems, microelectronics, embedded automation, and telecommunications.' },
  { id: 'dept-mech', name: 'Department of Mechanical Engineering', facultyId: 'fac-engg', facultyName: 'Faculty of Engineering & Technology', headOfDepartment: 'Prof. Dr. Engr. Usman', contactEmail: 'mechanical@bzu.edu.pk', location: 'Engineering Workshop Complex', description: 'Thermal dynamics, robotics, additive manufacturing, and CFD design.' },
  { id: 'dept-chem-eng', name: 'Department of Chemical Engineering', facultyId: 'fac-engg', facultyName: 'Faculty of Engineering & Technology', headOfDepartment: 'Prof. Dr. Engr. Tariq', contactEmail: 'chemengg@bzu.edu.pk', location: 'Engineering College Wing C', description: 'Process control, petroleum refining, water desalination, and catalysis.' },
  { id: 'dept-textile', name: 'Department of Textile Engineering', facultyId: 'fac-engg', facultyName: 'Faculty of Engineering & Technology', headOfDepartment: 'Dr. Engr. M. Naveed', contactEmail: 'textile@bzu.edu.pk', location: 'Textile Research Labs', description: 'Yarn spinning, textile wet processing, technical fiber synthesis.' },

  { id: 'dept-ims', name: 'Institute of Management Sciences (IMS)', facultyId: 'fac-comm-law', facultyName: 'Faculty of Commerce, Law & Business Administration', headOfDepartment: 'Prof. Dr. Nauman Abbasi', contactEmail: 'ims@bzu.edu.pk', location: 'IMS Executive Tower', description: 'Premier business school offering BBA, MBA, MS, and PhD in corporate management.' },
  { id: 'dept-law', name: 'Gillani Law College', facultyId: 'fac-comm-law', facultyName: 'Faculty of Commerce, Law & Business Administration', headOfDepartment: 'Prof. Dr. Samia Liaqat', contactEmail: 'law@bzu.edu.pk', location: 'Gillani Law Complex', description: 'Constitutional law, corporate jurisprudence, international human rights law.' },
  { id: 'dept-comm', name: 'Department of Commerce', facultyId: 'fac-comm-law', facultyName: 'Faculty of Commerce, Law & Business Administration', headOfDepartment: 'Prof. Dr. M. Akram', contactEmail: 'commerce@bzu.edu.pk', location: 'Commerce Block', description: 'Forensic accounting, chartered finance, taxation, and fintech analytics.' },

  { id: 'dept-pharm-chem', name: 'Department of Pharmaceutical Chemistry', facultyId: 'fac-pharm', facultyName: 'Faculty of Pharmacy', headOfDepartment: 'Prof. Dr. Bashir Ahmad', contactEmail: 'pharmacy@bzu.edu.pk', location: 'Pharmacy Institute', description: 'Pharmacognosy, drug formulation, medicinal chemistry, clinical trial design.' },
  { id: 'dept-agronomy', name: 'Department of Agronomy', facultyId: 'fac-agri', facultyName: 'Faculty of Agricultural Sciences', headOfDepartment: 'Prof. Dr. Nazim Hussain', contactEmail: 'agronomy@bzu.edu.pk', location: 'Agriculture Faculty Block', description: 'Precision farming, cereal crops, weed science, and irrigation optimization.' },
  { id: 'dept-entomology', name: 'Department of Entomology', facultyId: 'fac-agri', facultyName: 'Faculty of Agricultural Sciences', headOfDepartment: 'Prof. Dr. Shafqat Saeed', contactEmail: 'entomology@bzu.edu.pk', location: 'Agri Labs', description: 'Pest management, apiculture, biopesticides, and pollinator conservation.' },
  { id: 'dept-dvm', name: 'Faculty of Veterinary Medicine & Surgery', facultyId: 'fac-vet', facultyName: 'Faculty of Veterinary Sciences', headOfDepartment: 'Prof. Dr. Mushtaq Ahmad', contactEmail: 'veterinary@bzu.edu.pk', location: 'Veterinary Complex & Animal Hospital', description: '5-Year DVM, clinical diagnostics, pathology, and herd health.' },
  { id: 'dept-english', name: 'Department of English', facultyId: 'fac-arts', facultyName: 'Faculty of Arts & Social Sciences', headOfDepartment: 'Prof. Dr. Naveed Ahmad', contactEmail: 'english@bzu.edu.pk', location: 'Arts Complex', description: 'English literature, linguistics, post-colonial discourse, and critical theory.' },
  { id: 'dept-econ', name: 'Department of Economics', facultyId: 'fac-arts', facultyName: 'Faculty of Arts & Social Sciences', headOfDepartment: 'Prof. Dr. Imran Sharif', contactEmail: 'economics@bzu.edu.pk', location: 'Social Sciences Wing', description: 'Macroeconomics, econometric modeling, development policy, and agricultural trade.' },
];

const initialPrograms: Program[] = [
  // Undergraduate
  {
    id: 'prog-bscs',
    title: 'BS Computer Science (BS CS)',
    level: 'Undergraduate',
    facultyId: 'fac-science',
    facultyName: 'Faculty of Science',
    departmentId: 'dept-cs',
    departmentName: 'Department of Computer Science & IT',
    duration: '4 Years (8 Semesters)',
    creditHours: 134,
    eligibility: 'F.Sc Pre-Engineering / ICS / General Science with Mathematics (minimum 50% marks).',
    annualFeePKR: 48500,
    shifts: ['Morning', 'Evening'],
    description: 'Comprehensive curriculum in algorithms, distributed systems, web architectures, AI, and cloud software engineering.',
    careerProspects: ['Full-Stack Software Engineer', 'Cloud Architect', 'Systems Analyst', 'Data Scientist'],
  },
  {
    id: 'prog-bsse',
    title: 'BS Software Engineering (BS SE)',
    level: 'Undergraduate',
    facultyId: 'fac-science',
    facultyName: 'Faculty of Science',
    departmentId: 'dept-cs',
    departmentName: 'Department of Computer Science & IT',
    duration: '4 Years (8 Semesters)',
    creditHours: 136,
    eligibility: 'Intermediate with Mathematics (Pre-Engg / ICS with min 50% marks). NCEAC accredited.',
    annualFeePKR: 49500,
    shifts: ['Morning', 'Evening'],
    description: 'Focuses on agile methodologies, enterprise architecture, software testing, DevSecOps, and software verification.',
    careerProspects: ['Software Quality Engineer', 'Enterprise Application Developer', 'DevOps Specialist'],
  },
  {
    id: 'prog-bsai',
    title: 'BS Artificial Intelligence (BS AI)',
    level: 'Undergraduate',
    facultyId: 'fac-science',
    facultyName: 'Faculty of Science',
    departmentId: 'dept-cs',
    departmentName: 'Department of Computer Science & IT',
    duration: '4 Years (8 Semesters)',
    creditHours: 132,
    eligibility: 'F.Sc / ICS with Mathematics (min 50% marks).',
    annualFeePKR: 52000,
    shifts: ['Morning', 'Evening'],
    description: 'Deep learning, neural networks, natural language processing, computer vision, and robotics integration.',
    careerProspects: ['AI/ML Engineer', 'Computer Vision Specialist', 'NLP Researcher', 'Automation Architect'],
  },
  {
    id: 'prog-pharmd',
    title: 'Doctor of Pharmacy (Pharm-D)',
    level: 'Undergraduate',
    facultyId: 'fac-pharm',
    facultyName: 'Faculty of Pharmacy',
    departmentId: 'dept-pharm-chem',
    departmentName: 'Department of Pharmaceutical Chemistry',
    duration: '5 Years (10 Semesters)',
    creditHours: 198,
    eligibility: 'F.Sc Pre-Medical with minimum 60% marks. Sanctioned by Pharmacy Council of Pakistan.',
    annualFeePKR: 62000,
    shifts: ['Morning', 'Evening'],
    description: 'Clinical pharmacotherapy, medicinal formulations, toxicological analysis, and hospital residency.',
    careerProspects: ['Hospital Pharmacist', 'Pharmaceutical QC Analyst', 'Regulatory Affairs Officer', 'Drug Researcher'],
  },
  {
    id: 'prog-bsc-civil',
    title: 'B.Sc Civil Engineering',
    level: 'Undergraduate',
    facultyId: 'fac-engg',
    facultyName: 'Faculty of Engineering & Technology',
    departmentId: 'dept-civil',
    departmentName: 'Department of Civil Engineering',
    duration: '4 Years (8 Semesters)',
    creditHours: 138,
    eligibility: 'F.Sc Pre-Engineering with min 60% marks and ECAT entrance score. PEC accredited.',
    annualFeePKR: 58000,
    shifts: ['Morning'],
    description: 'Structural mechanics, geotechnical foundations, water resource systems, and mega-infrastructure design.',
    careerProspects: ['Structural Consultant', 'Project Engineer', 'Highway Specialist', 'Irrigation Engineer'],
  },
  {
    id: 'prog-bba',
    title: 'Bachelor of Business Administration (BBA Hons)',
    level: 'Undergraduate',
    facultyId: 'fac-comm-law',
    facultyName: 'Faculty of Commerce, Law & Business Administration',
    departmentId: 'dept-ims',
    departmentName: 'Institute of Management Sciences (IMS)',
    duration: '4 Years (8 Semesters)',
    creditHours: 130,
    eligibility: 'FA / F.Sc / I.Com / ICS / A-Level with minimum 45% marks.',
    annualFeePKR: 44000,
    shifts: ['Morning', 'Evening'],
    description: 'Marketing strategies, corporate financial modeling, supply chain networks, and venture capital management.',
    careerProspects: ['Brand Manager', 'Financial Analyst', 'Corporate Consultant', 'Entrepreneur'],
  },
  {
    id: 'prog-llb',
    title: 'Bachelor of Laws (LLB 5-Year)',
    level: 'Undergraduate',
    facultyId: 'fac-comm-law',
    facultyName: 'Faculty of Commerce, Law & Business Administration',
    departmentId: 'dept-law',
    departmentName: 'Gillani Law College',
    duration: '5 Years (10 Semesters)',
    creditHours: 166,
    eligibility: 'FA / F.Sc / equivalent with min 45% marks and valid LAT (Law Admission Test) score.',
    annualFeePKR: 46000,
    shifts: ['Morning', 'Evening'],
    description: 'Jurisprudence, constitutional litigation, mercantile legislation, and appellate courtroom practice.',
    careerProspects: ['Advocate High Court', 'Corporate Legal Counsel', 'Judicial Magistrate Candidate'],
  },
  {
    id: 'prog-dvm',
    title: 'Doctor of Veterinary Medicine (DVM)',
    level: 'Undergraduate',
    facultyId: 'fac-vet',
    facultyName: 'Faculty of Veterinary Sciences',
    departmentId: 'dept-dvm',
    departmentName: 'Faculty of Veterinary Medicine & Surgery',
    duration: '5 Years (10 Semesters)',
    creditHours: 194,
    eligibility: 'F.Sc Pre-Medical with minimum 50% marks. PVMC accredited.',
    annualFeePKR: 51000,
    shifts: ['Morning'],
    description: 'Veterinary anatomy, animal breeding, infectious zoonoses, surgery, and commercial dairy management.',
    careerProspects: ['Veterinary Medical Officer', 'Dairy Farm Consultant', 'Livestock Nutritionist'],
  },

  // BS Lateral 5th Semester Entry
  {
    id: 'prog-lat-bscs',
    title: 'BS Computer Science (5th Semester Lateral)',
    level: 'Lateral BS (5th Sem)',
    facultyId: 'fac-science',
    facultyName: 'Faculty of Science',
    departmentId: 'dept-cs',
    departmentName: 'Department of Computer Science & IT',
    duration: '2 Years (Semesters 5–8)',
    creditHours: 68,
    eligibility: '14-Year Education (ADP in CS / B.Sc with Computer Science & Mathematics) with min 45% marks or 2.0 CGPA.',
    annualFeePKR: 48500,
    shifts: ['Morning', 'Evening'],
    description: 'Bridge path for Associate Degree holders to complete their HEC-recognized 4-year BS in 4 semesters.',
    careerProspects: ['Software Developer', 'Database Administrator', 'Network Engineer'],
  },
  {
    id: 'prog-lat-bba',
    title: 'BBA (5th Semester Lateral Entry)',
    level: 'Lateral BS (5th Sem)',
    facultyId: 'fac-comm-law',
    facultyName: 'Faculty of Commerce, Law & Business Administration',
    departmentId: 'dept-ims',
    departmentName: 'Institute of Management Sciences (IMS)',
    duration: '2 Years (Semesters 5–8)',
    creditHours: 66,
    eligibility: '14 Years Education (B.Com / ADP in Commerce / Business) with min 45% marks or 2.0 CGPA.',
    annualFeePKR: 44000,
    shifts: ['Morning', 'Evening'],
    description: 'Specialization coursework in financial analytics, digital marketing, and operations.',
    careerProspects: ['Operations Manager', 'Account Executive', 'HR Specialist'],
  },

  // Graduate MS / M.Phil
  {
    id: 'prog-ms-cs',
    title: 'MS Computer Science (MS CS)',
    level: 'MS / M.Phil',
    facultyId: 'fac-science',
    facultyName: 'Faculty of Science',
    departmentId: 'dept-cs',
    departmentName: 'Department of Computer Science & IT',
    duration: '2 Years (4 Semesters)',
    creditHours: 30,
    eligibility: 'BS CS / BS SE / BS IT / M.Sc CS (16 years) with min 2.5/4.0 CGPA or 50% annual marks + GAT/Departmental Test.',
    annualFeePKR: 42000,
    shifts: ['Morning', 'Evening'],
    description: 'Advanced machine learning, distributed high-performance computing, quantum algorithms, and research thesis.',
    careerProspects: ['Research Scientist', 'Lead Software Architect', 'University Lecturer'],
  },
  {
    id: 'prog-mphil-chem',
    title: 'M.Phil Chemical Sciences',
    level: 'MS / M.Phil',
    facultyId: 'fac-science',
    facultyName: 'Faculty of Science',
    departmentId: 'dept-chem',
    departmentName: 'Institute of Chemical Sciences',
    duration: '2 Years (4 Semesters)',
    creditHours: 32,
    eligibility: '16-year BS/M.Sc Chemistry with minimum 2.5 CGPA and GAT test clearance.',
    annualFeePKR: 38000,
    shifts: ['Morning'],
    description: 'Advanced organic synthesis, nanomaterials, analytical spectrometry, and industrial catalysis thesis.',
    careerProspects: ['Chemical Research Officer', 'Quality Assurance Director', 'R&D Chemist'],
  },

  // Doctoral PhD
  {
    id: 'prog-phd-cs',
    title: 'Ph.D. in Computer Science',
    level: 'Doctoral (PhD)',
    facultyId: 'fac-science',
    facultyName: 'Faculty of Science',
    departmentId: 'dept-cs',
    departmentName: 'Department of Computer Science & IT',
    duration: '3–5 Years',
    creditHours: 48,
    eligibility: 'MS/M.Phil in CS/SE with min 3.0/4.0 CGPA, GRE/GAT Subjective clearance, and approved research proposal.',
    annualFeePKR: 35000,
    shifts: ['Morning'],
    description: 'Fully funded research fellowships, state-of-the-art supercomputing access, and international co-advisors.',
    careerProspects: ['Tenure-Track Professor', 'Principal AI Scientist', 'Director of Computing Research'],
  },
  {
    id: 'prog-phd-agri',
    title: 'Ph.D. in Agronomy & Crop Physiology',
    level: 'Doctoral (PhD)',
    facultyId: 'fac-agri',
    facultyName: 'Faculty of Agricultural Sciences',
    departmentId: 'dept-agronomy',
    departmentName: 'Department of Agronomy',
    duration: '3–5 Years',
    creditHours: 48,
    eligibility: 'M.Sc (Hons) Agronomy with min 3.0 CGPA and approved research synopsis.',
    annualFeePKR: 32000,
    shifts: ['Morning'],
    description: 'Cotton cultivar development, saline soil remediation, and drought stress agronomic modeling.',
    careerProspects: ['Agricultural Research Scientist (PARC/NARC)', 'University Faculty', 'International Agro Consultant'],
  },

  // ADP
  {
    id: 'prog-adp-cs',
    title: 'Associate Degree in Computer Science (ADP CS)',
    level: 'Associate Degree (ADP)',
    facultyId: 'fac-science',
    facultyName: 'Faculty of Science',
    departmentId: 'dept-cs',
    departmentName: 'Department of Computer Science & IT',
    duration: '2 Years (4 Semesters)',
    creditHours: 66,
    eligibility: 'Intermediate (ICS / F.Sc / General Science) with min 45% marks.',
    annualFeePKR: 36000,
    shifts: ['Morning', 'Evening'],
    description: 'Rapid employment track in programming fundamentals, web development, and database administration.',
    careerProspects: ['Junior Web Developer', 'IT Helpdesk Support', 'Direct bridge to BS 5th semester'],
  },

  // Diplomas
  {
    id: 'prog-dip-adcp',
    title: 'Advance Diploma in Clinical Psychology (ADCP)',
    level: 'Diploma',
    facultyId: 'fac-arts',
    facultyName: 'Faculty of Arts & Social Sciences',
    departmentId: 'dept-english',
    departmentName: 'Department of Applied Psychology',
    duration: '1 Year (2 Semesters)',
    creditHours: 36,
    eligibility: 'M.Sc / BS (4-Year) in Psychology with min 2nd Division or 2.5 CGPA.',
    annualFeePKR: 45000,
    shifts: ['Morning'],
    description: 'Intensive clinical internship, psychological assessment, psychotherapeutic counseling, and DSM-5 diagnosis.',
    careerProspects: ['Licensed Clinical Psychologist', 'Hospital Therapist', 'School Counselor'],
  },
];

const initialFacultyMembers: FacultyMember[] = [
  {
    id: 'fac-m-1',
    name: 'Prof. Dr. Muhammad Zubair',
    designation: 'Professor',
    qualification: 'Ph.D. Computer Science (Univ. of Manchester, UK)',
    degreeHolderPhD: true,
    departmentName: 'Department of Computer Science & IT',
    facultyName: 'Faculty of Science',
    gender: 'Male',
    researchInterests: ['Distributed Systems', 'Cloud Security', 'Big Data Engineering'],
    email: 'm.zubair@bzu.edu.pk',
    officeRoom: 'CS Wing, Room 204',
  },
  {
    id: 'fac-m-2',
    name: 'Prof. Dr. Ayesha Siddiqa',
    designation: 'Professor',
    qualification: 'Ph.D. Organic Chemistry (Heidelberg Univ., Germany)',
    degreeHolderPhD: true,
    departmentName: 'Institute of Chemical Sciences',
    facultyName: 'Faculty of Science',
    gender: 'Female',
    researchInterests: ['Nanocatalysis', 'Bioactive Natural Products', 'Spectroscopy'],
    email: 'ayesha.siddiqa@bzu.edu.pk',
    officeRoom: 'Chem Complex, Lab 12',
  },
  {
    id: 'fac-m-3',
    name: 'Prof. Dr. Engr. Rehan Zahid',
    designation: 'Professor',
    qualification: 'Ph.D. Electrical & Electronic Engg (Imperial College London)',
    degreeHolderPhD: true,
    departmentName: 'Department of Electrical Engineering',
    facultyName: 'Faculty of Engineering & Technology',
    gender: 'Male',
    researchInterests: ['Smart Grids', 'Renewable Microgrids', 'Power Electronics'],
    email: 'rehan.zahid@bzu.edu.pk',
    officeRoom: 'Engineering Tower 1',
  },
  {
    id: 'fac-m-4',
    name: 'Dr. Fatima Zahra',
    designation: 'Associate Professor',
    qualification: 'Ph.D. Artificial Intelligence & NLP (Tsinghua Univ., China)',
    degreeHolderPhD: true,
    departmentName: 'Department of Computer Science & IT',
    facultyName: 'Faculty of Science',
    gender: 'Female',
    researchInterests: ['Large Language Models', 'Multilingual NLP for Urdu & Saraiki', 'Computer Vision'],
    email: 'fatima.zahra@bzu.edu.pk',
    officeRoom: 'AI Research Lab 301',
  },
  {
    id: 'fac-m-5',
    name: 'Prof. Dr. Bashir Ahmad',
    designation: 'Professor',
    qualification: 'Ph.D. Pharmacology (King\'s College London, UK)',
    degreeHolderPhD: true,
    departmentName: 'Department of Pharmaceutical Chemistry',
    facultyName: 'Faculty of Pharmacy',
    gender: 'Male',
    researchInterests: ['Cardiovascular Pharmacology', 'Clinical Drug Formulations'],
    email: 'bashir.ahmad@bzu.edu.pk',
    officeRoom: 'Pharmacy Building, Office 101',
  },
  {
    id: 'fac-m-6',
    name: 'Prof. Dr. Nauman Abbasi',
    designation: 'Professor',
    qualification: 'Ph.D. Strategic Management (Melbourne Business School)',
    degreeHolderPhD: true,
    departmentName: 'Institute of Management Sciences (IMS)',
    facultyName: 'Faculty of Commerce, Law & Business Administration',
    gender: 'Male',
    researchInterests: ['Corporate Governance', 'Capital Markets', 'Islamic Banking'],
    email: 'nauman.abbasi@bzu.edu.pk',
    officeRoom: 'IMS Dean Office',
  },
  {
    id: 'fac-m-7',
    name: 'Dr. Usman Khalid',
    designation: 'Assistant Professor',
    qualification: 'Ph.D. Civil & Structural Engg (UTM Malaysia)',
    degreeHolderPhD: true,
    departmentName: 'Department of Civil Engineering',
    facultyName: 'Faculty of Engineering & Technology',
    gender: 'Male',
    researchInterests: ['Earthquake Resistant Structures', 'Geotechnical Mechanics'],
    email: 'usman.khalid@bzu.edu.pk',
    officeRoom: 'Civil Block, Rm 14',
  },
  {
    id: 'fac-m-8',
    name: 'Ms. Sadia Perveen',
    designation: 'Lecturer',
    qualification: 'MS Computer Science (BZU Multan, Gold Medalist)',
    degreeHolderPhD: false,
    departmentName: 'Department of Computer Science & IT',
    facultyName: 'Faculty of Science',
    gender: 'Female',
    researchInterests: ['Human-Computer Interaction', 'UX Engineering', 'Mobile Architecture'],
    email: 'sadia.perveen@bzu.edu.pk',
    officeRoom: 'CS Lab 4',
  },
];

const initialMeritEntries: MeritEntry[] = [
  { id: 'merit-1', programTitle: 'BS Computer Science (Morning)', listType: '1st Merit List', session: 'Fall 2026', shift: 'Morning', quota: 'Open Merit', closingAggregate: 88.45, publicationDate: '2026-10-15', feeDeadline: '2026-10-22' },
  { id: 'merit-2', programTitle: 'BS Computer Science (Evening)', listType: '1st Merit List', session: 'Fall 2026', shift: 'Evening', quota: 'Open Merit', closingAggregate: 81.30, publicationDate: '2026-10-15', feeDeadline: '2026-10-22' },
  { id: 'merit-3', programTitle: 'BS Software Engineering (Morning)', listType: '1st Merit List', session: 'Fall 2026', shift: 'Morning', quota: 'Open Merit', closingAggregate: 86.90, publicationDate: '2026-10-15', feeDeadline: '2026-10-22' },
  { id: 'merit-4', programTitle: 'Doctor of Pharmacy (Pharm-D)', listType: '1st Merit List', session: 'Fall 2026', shift: 'Morning', quota: 'Open Merit', closingAggregate: 91.20, publicationDate: '2026-10-15', feeDeadline: '2026-10-22' },
  { id: 'merit-5', programTitle: 'B.Sc Civil Engineering', listType: '1st Merit List', session: 'Fall 2026', shift: 'Morning', quota: 'Open Merit', closingAggregate: 78.50, publicationDate: '2026-10-15', feeDeadline: '2026-10-22' },
  { id: 'merit-6', programTitle: 'Doctor of Veterinary Medicine (DVM)', listType: '1st Merit List', session: 'Fall 2026', shift: 'Morning', quota: 'Open Merit', closingAggregate: 84.15, publicationDate: '2026-10-15', feeDeadline: '2026-10-22' },
  { id: 'merit-7', programTitle: 'BBA (Honors) Morning', listType: '1st Merit List', session: 'Fall 2026', shift: 'Morning', quota: 'Open Merit', closingAggregate: 76.40, publicationDate: '2026-10-15', feeDeadline: '2026-10-22' },
  { id: 'merit-8', programTitle: 'LLB 5-Year Morning', listType: '1st Merit List', session: 'Fall 2026', shift: 'Morning', quota: 'Open Merit', closingAggregate: 79.80, publicationDate: '2026-10-15', feeDeadline: '2026-10-22' },
  { id: 'merit-9', programTitle: 'BS Computer Science (Morning)', listType: '2nd Merit List', session: 'Fall 2026', shift: 'Morning', quota: 'Open Merit', closingAggregate: 86.80, publicationDate: '2026-10-24', feeDeadline: '2026-10-30' },
  { id: 'merit-10', programTitle: 'BS Artificial Intelligence (Morning)', listType: '1st Merit List', session: 'Fall 2026', shift: 'Morning', quota: 'Open Merit', closingAggregate: 85.10, publicationDate: '2026-10-15', feeDeadline: '2026-10-22' },
];

const initialExamResults: ExamResult[] = [
  {
    rollNumber: 'BZU-2024-BSCS-101',
    regNumber: '2024-BZU-CS-0042',
    studentName: 'Hamza Tariq',
    fatherName: 'Tariq Mehmood',
    program: 'BS Computer Science',
    semester: '4th Semester (Spring 2026)',
    session: '2024-2028',
    examType: 'Semester Examination',
    gpa: 3.82,
    cgpa: 3.78,
    status: 'PASSED',
    declarationDate: 'October 28, 2026',
    subjects: [
      { code: 'CS-401', title: 'Design & Analysis of Algorithms', creditHours: 3, marksObtained: 88, totalMarks: 100, grade: 'A', gradePoint: 4.0 },
      { code: 'CS-402', title: 'Database Systems (Theory & Lab)', creditHours: 4, marksObtained: 84, totalMarks: 100, grade: 'A-', gradePoint: 3.7 },
      { code: 'CS-403', title: 'Operating Systems & Concurrency', creditHours: 4, marksObtained: 86, totalMarks: 100, grade: 'A', gradePoint: 4.0 },
      { code: 'MT-401', title: 'Linear Algebra & Numerical Methods', creditHours: 3, marksObtained: 79, totalMarks: 100, grade: 'B+', gradePoint: 3.3 },
      { code: 'SS-401', title: 'Professional Ethics & Cyber Law', creditHours: 3, marksObtained: 91, totalMarks: 100, grade: 'A', gradePoint: 4.0 },
    ],
  },
  {
    rollNumber: 'BZU-2023-ENG-042',
    regNumber: '2023-BZU-ENG-0118',
    studentName: 'Amina Bibi',
    fatherName: 'Ghulam Rasool',
    program: 'B.Sc Civil Engineering',
    semester: '6th Semester (Spring 2026)',
    session: '2023-2027',
    examType: 'Semester Examination',
    gpa: 3.65,
    cgpa: 3.61,
    status: 'PASSED',
    declarationDate: 'November 02, 2026',
    subjects: [
      { code: 'CE-601', title: 'Reinforced Concrete Design II', creditHours: 4, marksObtained: 82, totalMarks: 100, grade: 'A-', gradePoint: 3.7 },
      { code: 'CE-602', title: 'Geotechnical & Foundation Engineering', creditHours: 4, marksObtained: 80, totalMarks: 100, grade: 'A-', gradePoint: 3.7 },
      { code: 'CE-603', title: 'Hydrology & Water Resources', creditHours: 3, marksObtained: 78, totalMarks: 100, grade: 'B+', gradePoint: 3.3 },
      { code: 'CE-604', title: 'Transportation & Pavement Design', creditHours: 3, marksObtained: 85, totalMarks: 100, grade: 'A', gradePoint: 4.0 },
      { code: 'CE-605', title: 'Environmental Engineering Lab', creditHours: 2, marksObtained: 90, totalMarks: 100, grade: 'A', gradePoint: 4.0 },
    ],
  },
  {
    rollNumber: 'BZU-2024-PHARM-019',
    regNumber: '2024-BZU-PH-0089',
    studentName: 'Zainab Qasim',
    fatherName: 'Qasim Ali Hashmi',
    program: 'Doctor of Pharmacy (Pharm-D)',
    semester: '2nd Professional (Annual 2026)',
    session: '2024-2029',
    examType: 'Annual Examination',
    gpa: 3.91,
    cgpa: 3.88,
    status: 'PASSED',
    declarationDate: 'October 30, 2026',
    subjects: [
      { code: 'PH-201', title: 'Pharmaceutical Microbiology', creditHours: 4, marksObtained: 92, totalMarks: 100, grade: 'A', gradePoint: 4.0 },
      { code: 'PH-202', title: 'Pharmacology & Therapeutics I', creditHours: 4, marksObtained: 89, totalMarks: 100, grade: 'A', gradePoint: 4.0 },
      { code: 'PH-203', title: 'Pharmacognosy II', creditHours: 3, marksObtained: 86, totalMarks: 100, grade: 'A', gradePoint: 4.0 },
      { code: 'PH-204', title: 'Pharmaceutical Biochemistry', creditHours: 4, marksObtained: 85, totalMarks: 100, grade: 'A', gradePoint: 4.0 },
      { code: 'PH-205', title: 'Pathology & Biostatistics', creditHours: 3, marksObtained: 82, totalMarks: 100, grade: 'A-', gradePoint: 3.7 },
    ],
  },
  {
    rollNumber: 'BZU-2023-BBA-088',
    regNumber: '2023-BZU-IMS-0204',
    studentName: 'Bilal Mustafa',
    fatherName: 'Mustafa Kamal',
    program: 'Bachelor of Business Administration',
    semester: '6th Semester (Spring 2026)',
    session: '2023-2027',
    examType: 'Semester Examination',
    gpa: 3.42,
    cgpa: 3.38,
    status: 'PASSED',
    declarationDate: 'November 04, 2026',
    subjects: [
      { code: 'MGT-601', title: 'Corporate Financial Strategy', creditHours: 3, marksObtained: 76, totalMarks: 100, grade: 'B+', gradePoint: 3.3 },
      { code: 'MGT-602', title: 'Consumer Behavior & Market Research', creditHours: 3, marksObtained: 81, totalMarks: 100, grade: 'A-', gradePoint: 3.7 },
      { code: 'MGT-603', title: 'International Business & Trade', creditHours: 3, marksObtained: 74, totalMarks: 100, grade: 'B', gradePoint: 3.0 },
      { code: 'MGT-604', title: 'Supply Chain Analytics', creditHours: 3, marksObtained: 82, totalMarks: 100, grade: 'A-', gradePoint: 3.7 },
      { code: 'MGT-605', title: 'Business Law & Ethics', creditHours: 3, marksObtained: 77, totalMarks: 100, grade: 'B+', gradePoint: 3.3 },
    ],
  },
];

const initialNews: NewsBulletin[] = [
  {
    id: 'news-1',
    title: 'Admissions Fall 2026: Third Provisional Merit Lists Released',
    category: 'Admissions',
    publishDate: 'November 08, 2026',
    summary: 'The Directorate of Student Affairs has announced the 3rd provisional merit lists for BS 4-Year and Lateral programs across all faculties.',
    content: 'All selected candidates are instructed to submit their original verified educational documents and bank fee vouchers at respective departmental admission desks before the close of bank hours.',
    isImportant: true,
    attachmentName: 'Merit_List_Notice_Fall2026.pdf',
  },
  {
    id: 'news-2',
    title: 'BZU Multan Ranked #1 University in Punjab in THE World Rankings 2026',
    category: 'Breaking',
    publishDate: 'November 06, 2026',
    summary: 'Times Higher Education World University Rankings 2026 places BZU in the #601–800 global bracket, making it #1 in Punjab and #2 across Pakistan.',
    content: 'Vice Chancellor congratulated the faculty, researchers, and scholars for this monumental 400-point leap reflecting citations, research patents, and academic internationalization.',
    isImportant: true,
  },
  {
    id: 'news-3',
    title: 'HEC Need-Based & Ehsaas Scholarships: 3,900+ Allocations Open',
    category: 'Scholarships',
    publishDate: 'November 04, 2026',
    summary: 'Financial Aid Office opens applications for deserving scholars covering 100% tuition fees, hostel allowance, and monthly stipend.',
    content: 'Eligible students enrolled in regular undergraduate and graduate morning programs can apply online via the BZU scholarship portal.',
    isImportant: false,
    attachmentName: 'HEC_Scholarship_Form_2026.pdf',
  },
  {
    id: 'news-4',
    title: 'Recruitment Notice: Professors, Associate Professors & Lab Technologists',
    category: 'Careers',
    publishDate: 'October 31, 2026',
    summary: 'BZU invites online job applications under Basic Pay Scale (BPS) and Tenure Track System (TTS) across engineering and health sciences.',
    content: 'Detailed eligibility criteria, prescribed application forms, and submission instructions are available at https://jobs.bzu.edu.pk. Last date for receipt of applications is November 28, 2026.',
    isImportant: true,
    attachmentName: 'Advt_Faculty_Vacancies_2026.pdf',
  },
  {
    id: 'news-5',
    title: 'Schedule for Roll Number Slips & Semester Final Examinations Fall 2026',
    category: 'Exams',
    publishDate: 'October 25, 2026',
    summary: 'Controller of Examinations releases digital roll number slips and examination center assignments for affiliated colleges and main campus.',
    content: 'Students can download their verified digital hall tickets using their registration number. Any clash in dates must be reported to the Controller Desk immediately.',
    isImportant: false,
  },
];

class DatabaseManager {
  private data: DatabaseStore;

  constructor() {
    this.data = this.loadFromDisk();
  }

  private loadFromDisk(): DatabaseStore {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DATA_FILE)) {
        const content = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(content);
      }
    } catch (e) {
      console.warn('Could not read existing database file, initializing fresh store:', e);
    }

    const defaultStore: DatabaseStore = {
      faculties: initialFaculties,
      departments: initialDepartments,
      programs: initialPrograms,
      facultyMembers: initialFacultyMembers,
      meritEntries: initialMeritEntries,
      examResults: initialExamResults,
      applications: [
        {
          id: 'app-sample-1',
          appTrackingNo: 'BZU-F26-1029',
          applicantName: 'Muhammad Shaaf',
          fatherName: 'Muhammad Arshad',
          cnic: '36302-1234567-1',
          email: 'shaaf@example.com',
          phone: '+92 300 1234567',
          gender: 'Male',
          dob: '2005-04-12',
          domicile: 'Multan',
          matricRollNo: '482910',
          matricMarks: 1024,
          matricTotal: 1100,
          interRollNo: '319201',
          interMarks: 468,
          interTotal: 520,
          entryTestScore: 82,
          firstChoiceProgram: 'BS Computer Science (BS CS)',
          secondChoiceProgram: 'BS Software Engineering (BS SE)',
          shift: 'Morning',
          quota: 'Open Merit',
          calculatedAggregate: 89.14,
          status: 'Merit List Provisionally Selected',
          submissionDate: '2026-10-14T09:30:00.000Z',
          challanNumber: 'CH-2026-88192',
          challanAmount: 1500,
        },
      ],
      newsBulletins: initialNews,
      contactInquiries: [],
      subscribers: ['registrar@bzu.edu.pk'],
    };

    this.saveToDisk(defaultStore);
    return defaultStore;
  }

  private saveToDisk(store: DatabaseStore) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to write database to disk:', e);
    }
  }

  public getFaculties(): Faculty[] {
    return this.data.faculties;
  }

  public getDepartments(facultyId?: string): Department[] {
    if (facultyId) {
      return this.data.departments.filter(d => d.facultyId === facultyId);
    }
    return this.data.departments;
  }

  public getPrograms(filter?: { level?: string; facultyId?: string; query?: string }): Program[] {
    let list = this.data.programs;
    if (filter?.level && filter.level !== 'All') {
      list = list.filter(p => p.level.toLowerCase() === filter.level?.toLowerCase() || p.level.includes(filter.level!));
    }
    if (filter?.facultyId) {
      list = list.filter(p => p.facultyId === filter.facultyId);
    }
    if (filter?.query) {
      const q = filter.query.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.departmentName.toLowerCase().includes(q) ||
        p.facultyName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return list;
  }

  public getFacultyMembers(filter?: { query?: string; department?: string; designation?: string }): FacultyMember[] {
    let list = this.data.facultyMembers;
    if (filter?.department) {
      list = list.filter(f => f.departmentName === filter.department);
    }
    if (filter?.designation) {
      list = list.filter(f => f.designation === filter.designation);
    }
    if (filter?.query) {
      const q = filter.query.toLowerCase();
      list = list.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.departmentName.toLowerCase().includes(q) ||
        f.researchInterests.some(r => r.toLowerCase().includes(q))
      );
    }
    return list;
  }

  public getMeritEntries(programQuery?: string): MeritEntry[] {
    if (programQuery) {
      const q = programQuery.toLowerCase();
      return this.data.meritEntries.filter(m => m.programTitle.toLowerCase().includes(q));
    }
    return this.data.meritEntries;
  }

  public searchExamResult(query: string): ExamResult | null {
    const q = query.trim().toUpperCase();
    return this.data.examResults.find(r =>
      r.rollNumber.toUpperCase() === q ||
      r.regNumber.toUpperCase() === q ||
      r.studentName.toUpperCase().includes(q)
    ) || null;
  }

  public getAllExamResults(): ExamResult[] {
    return this.data.examResults;
  }

  public createAdmissionApplication(appData: Omit<AdmissionApplication, 'id' | 'appTrackingNo' | 'submissionDate' | 'status' | 'challanNumber' | 'challanAmount' | 'calculatedAggregate'>): AdmissionApplication {
    const matricRatio = (appData.matricMarks / (appData.matricTotal || 1100)) * 30;
    const interRatio = (appData.interMarks / (appData.interTotal || 520)) * 50;
    const entryRatio = (appData.entryTestScore ? (appData.entryTestScore / 100) * 20 : 15);
    const calculatedAggregate = Number((matricRatio + interRatio + entryRatio).toFixed(2));

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingNo = `BZU-F26-${randomSuffix}`;
    const challanNo = `CH-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const newApp: AdmissionApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      appTrackingNo: trackingNo,
      calculatedAggregate,
      status: calculatedAggregate >= 75 ? 'Merit List Provisionally Selected' : 'Under Review',
      submissionDate: new Date().toISOString(),
      challanNumber: challanNo,
      challanAmount: 1500,
    };

    this.data.applications.unshift(newApp);
    this.saveToDisk(this.data);
    return newApp;
  }

  public getApplicationByTrackingNo(trackingNo: string): AdmissionApplication | null {
    const q = trackingNo.trim().toUpperCase();
    return this.data.applications.find(a => a.appTrackingNo.toUpperCase() === q || a.cnic === trackingNo.trim()) || null;
  }

  public getNews(): NewsBulletin[] {
    return this.data.newsBulletins;
  }

  public addContactInquiry(inquiry: Omit<ContactInquiry, 'id' | 'ticketNumber' | 'status' | 'createdAt'>): ContactInquiry {
    const ticket = `BZU-TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newInquiry: ContactInquiry = {
      ...inquiry,
      id: `tkt-${Date.now()}`,
      ticketNumber: ticket,
      status: 'Received',
      createdAt: new Date().toISOString(),
    };
    this.data.contactInquiries.unshift(newInquiry);
    this.saveToDisk(this.data);
    return newInquiry;
  }

  public addSubscriber(email: string): boolean {
    const clean = email.trim().toLowerCase();
    if (!this.data.subscribers.includes(clean)) {
      this.data.subscribers.push(clean);
      this.saveToDisk(this.data);
      return true;
    }
    return false;
  }
}

export const db = new DatabaseManager();
