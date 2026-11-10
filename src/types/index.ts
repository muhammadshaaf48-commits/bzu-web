export interface Faculty {
  id: string;
  name: string;
  code: string;
  dean: string;
  departmentsCount: number;
  programsCount: number;
  description: string;
}

export interface Department {
  id: string;
  name: string;
  facultyId: string;
  facultyName: string;
  headOfDepartment: string;
  contactEmail: string;
  location: string;
  description: string;
}

export type DegreeLevel = 'Undergraduate' | 'Lateral BS (5th Sem)' | 'MS / M.Phil' | 'Doctoral (PhD)' | 'Associate Degree (ADP)' | 'Diploma';

export interface Program {
  id: string;
  title: string;
  level: DegreeLevel;
  facultyId: string;
  facultyName: string;
  departmentId: string;
  departmentName: string;
  duration: string;
  creditHours: number;
  eligibility: string;
  annualFeePKR: number;
  shifts: ('Morning' | 'Evening')[];
  description: string;
  careerProspects: string[];
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: 'Professor' | 'Associate Professor' | 'Assistant Professor' | 'Lecturer';
  qualification: string;
  degreeHolderPhD: boolean;
  departmentName: string;
  facultyName: string;
  gender: 'Male' | 'Female';
  researchInterests: string[];
  email: string;
  officeRoom: string;
}

export interface MeritEntry {
  id: string;
  programTitle: string;
  listType: '1st Merit List' | '2nd Merit List' | '3rd Merit List';
  session: string;
  shift: 'Morning' | 'Evening';
  quota: 'Open Merit' | 'South Punjab Quota' | 'Sports Quota' | 'Disabled Quota';
  closingAggregate: number;
  publicationDate: string;
  feeDeadline: string;
}

export interface SubjectResult {
  code: string;
  title: string;
  creditHours: number;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  gradePoint: number;
}

export interface ExamResult {
  rollNumber: string;
  regNumber: string;
  studentName: string;
  fatherName: string;
  program: string;
  semester: string;
  session: string;
  examType: 'Semester Examination' | 'Annual Examination';
  gpa: number;
  cgpa: number;
  status: 'PASSED' | 'PROMOTED' | 'SUPPLEMENTARY';
  declarationDate: string;
  subjects: SubjectResult[];
}

export interface AdmissionApplication {
  id: string;
  appTrackingNo: string;
  applicantName: string;
  fatherName: string;
  cnic: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  domicile: string;
  matricRollNo: string;
  matricMarks: number;
  matricTotal: number;
  interRollNo: string;
  interMarks: number;
  interTotal: number;
  entryTestScore?: number;
  firstChoiceProgram: string;
  secondChoiceProgram?: string;
  shift: 'Morning' | 'Evening';
  quota: string;
  calculatedAggregate: number;
  status: 'Pending Document Verification' | 'Merit List Provisionally Selected' | 'Enrolled' | 'Under Review';
  submissionDate: string;
  challanNumber: string;
  challanAmount: number;
}

export interface NewsBulletin {
  id: string;
  title: string;
  category: 'Breaking' | 'Admissions' | 'Exams' | 'Careers' | 'Conferences' | 'Scholarships';
  publishDate: string;
  summary: string;
  content: string;
  isImportant: boolean;
  attachmentName?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  departmentTarget: string;
  subject: string;
  message: string;
  ticketNumber: string;
  status: 'Received' | 'Assigned' | 'Resolved';
  createdAt: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  modelUsed?: string;
  thinkingMode?: boolean;
}
