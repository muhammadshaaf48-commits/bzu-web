import {
  AdmissionApplication,
  ContactInquiry,
  Department,
  ExamResult,
  Faculty,
  FacultyMember,
  MeritEntry,
  NewsBulletin,
  Program,
} from '../types/index.ts';

export interface HostedDatabase {
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
  customData?: Record<string, unknown>;
}

const CUSTOM_JSON_STORAGE_KEY = 'bzu_hosted_json_url';
const LOCAL_APPS_STORAGE_KEY = 'bzu_local_applications';
const LOCAL_INQUIRIES_STORAGE_KEY = 'bzu_local_inquiries';
const LOCAL_SUBSCRIBERS_STORAGE_KEY = 'bzu_local_subscribers';

const KNOWN_KEYS = new Set([
  'faculties',
  'departments',
  'programs',
  'courses',
  'facultyMembers',
  'faculty',
  'meritEntries',
  'meritLists',
  'merit',
  'examResults',
  'results',
  'applications',
  'newsBulletins',
  'news',
  'contactInquiries',
  'subscribers',
  'customData',
]);

const DEFAULT_HOSTED_CANDIDATES = [
  './data.json',
  './bzu-data.json',
  './data/data.json',
  './data/bzu_database.json',
  './db.json',
  './bzu_database.json',
];

let cachedDatabase: HostedDatabase | null = null;
let cachedSourcePath: string = '';

export function getCustomJsonUrl(): string {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('data') || params.get('json') || params.get('dataUrl');
  if (fromQuery) {
    localStorage.setItem(CUSTOM_JSON_STORAGE_KEY, fromQuery);
    return fromQuery;
  }
  return localStorage.getItem(CUSTOM_JSON_STORAGE_KEY) || '';
}

export function setCustomJsonUrl(url: string): void {
  if (typeof window === 'undefined') return;
  const trimmed = url.trim();
  if (trimmed) {
    localStorage.setItem(CUSTOM_JSON_STORAGE_KEY, trimmed);
  } else {
    localStorage.removeItem(CUSTOM_JSON_STORAGE_KEY);
  }
  cachedDatabase = null;
  cachedSourcePath = '';
}

export function clearHostedDataCache(): void {
  cachedDatabase = null;
  cachedSourcePath = '';
}

export function getLoadedSourcePath(): string {
  return cachedSourcePath;
}

function normalizeDatabase(raw: unknown): HostedDatabase {
  const empty: HostedDatabase = {
    faculties: [],
    departments: [],
    programs: [],
    facultyMembers: [],
    meritEntries: [],
    examResults: [],
    applications: [],
    newsBulletins: [],
    contactInquiries: [],
    subscribers: [],
  };

  if (Array.isArray(raw)) {
    return {
      ...empty,
      customData: { records: raw },
    };
  }

  if (!raw || typeof raw !== 'object') {
    return empty;
  }

  const obj = raw as Record<string, unknown>;
  const customData: Record<string, unknown> = {};

  for (const [k, v] of Object.entries(obj)) {
    if (!KNOWN_KEYS.has(k)) {
      customData[k] = v;
    }
  }

  if (obj.customData && typeof obj.customData === 'object') {
    Object.assign(customData, obj.customData as Record<string, unknown>);
  }

  return {
    faculties: Array.isArray(obj.faculties) ? (obj.faculties as Faculty[]) : [],
    departments: Array.isArray(obj.departments) ? (obj.departments as Department[]) : [],
    programs: Array.isArray(obj.programs)
      ? (obj.programs as Program[])
      : Array.isArray(obj.courses)
      ? (obj.courses as Program[])
      : [],
    facultyMembers: Array.isArray(obj.facultyMembers)
      ? (obj.facultyMembers as FacultyMember[])
      : Array.isArray(obj.faculty)
      ? (obj.faculty as FacultyMember[])
      : [],
    meritEntries: Array.isArray(obj.meritEntries)
      ? (obj.meritEntries as MeritEntry[])
      : Array.isArray(obj.meritLists)
      ? (obj.meritLists as MeritEntry[])
      : Array.isArray(obj.merit)
      ? (obj.merit as MeritEntry[])
      : [],
    examResults: Array.isArray(obj.examResults)
      ? (obj.examResults as ExamResult[])
      : Array.isArray(obj.results)
      ? (obj.results as ExamResult[])
      : [],
    applications: Array.isArray(obj.applications)
      ? (obj.applications as AdmissionApplication[])
      : [],
    newsBulletins: Array.isArray(obj.newsBulletins)
      ? (obj.newsBulletins as NewsBulletin[])
      : Array.isArray(obj.news)
      ? (obj.news as NewsBulletin[])
      : [],
    contactInquiries: Array.isArray(obj.contactInquiries)
      ? (obj.contactInquiries as ContactInquiry[])
      : [],
    subscribers: Array.isArray(obj.subscribers) ? (obj.subscribers as string[]) : [],
    ...(Object.keys(customData).length > 0 ? { customData } : {}),
  };
}

async function fetchJsonSafely(url: string): Promise<unknown | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type') || '';
    const text = await res.text();
    if (!text.trim()) return null;
    // Guard against static host SPA fallback returning index.html
    if (contentType.includes('text/html') || text.trim().startsWith('<!doctype') || text.trim().startsWith('<html')) {
      return null;
    }
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function loadHostedDatabase(forceRefresh = false): Promise<HostedDatabase> {
  if (cachedDatabase && !forceRefresh) {
    return cachedDatabase;
  }

  const customUrl = getCustomJsonUrl();
  if (customUrl) {
    const customParsed = await fetchJsonSafely(customUrl);
    if (customParsed !== null) {
      cachedDatabase = normalizeDatabase(customParsed);
      cachedSourcePath = customUrl;
      return cachedDatabase;
    }
  }

  // Try Express backend API first (handles auto-reloading data.json / bzu_database.json / .data)
  const apiParsed = await fetchJsonSafely('/api/database');
  if (apiParsed !== null) {
    cachedDatabase = normalizeDatabase(apiParsed);
    cachedSourcePath = '/api/database';
    return cachedDatabase;
  }

  // Static / shared website host fallback: scan hosted JSON files directly
  for (const candidate of DEFAULT_HOSTED_CANDIDATES) {
    const parsed = await fetchJsonSafely(candidate);
    if (parsed !== null) {
      cachedDatabase = normalizeDatabase(parsed);
      cachedSourcePath = candidate;
      return cachedDatabase;
    }
  }

  return normalizeDatabase({});
}

export async function fetchFaculties(): Promise<Faculty[]> {
  const db = await loadHostedDatabase();
  return db.faculties;
}

export async function fetchDepartments(facultyId?: string): Promise<Department[]> {
  const db = await loadHostedDatabase();
  if (facultyId) {
    return db.departments.filter(d => d.facultyId === facultyId);
  }
  return db.departments;
}

export async function fetchPrograms(): Promise<Program[]> {
  const db = await loadHostedDatabase();
  return db.programs;
}

export async function fetchFacultyMembers(): Promise<FacultyMember[]> {
  const db = await loadHostedDatabase();
  return db.facultyMembers;
}

export async function fetchMeritLists(): Promise<MeritEntry[]> {
  const db = await loadHostedDatabase();
  return db.meritEntries;
}

export async function fetchNews(): Promise<NewsBulletin[]> {
  const db = await loadHostedDatabase();
  return db.newsBulletins;
}

export async function searchExamResult(query: string): Promise<ExamResult> {
  try {
    const res = await fetch('/api/results/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Result record not found');
      }
      return data as ExamResult;
    }
  } catch (err: any) {
    if (err?.message && err.message.includes('No record found')) {
      throw err;
    }
  }

  const db = await loadHostedDatabase();
  const q = query.trim().toUpperCase();
  const match = db.examResults.find(
    r =>
      r.rollNumber.toUpperCase() === q ||
      r.regNumber.toUpperCase() === q ||
      r.studentName.toUpperCase().includes(q)
  );
  if (!match) {
    throw new Error(
      `No record found for '${query}'. Please verify your Roll Number (e.g. BZU-2024-BSCS-101) or Registration Number.`
    );
  }
  return match;
}

export async function submitAdmissionApplication(
  appData: Omit<
    AdmissionApplication,
    'id' | 'appTrackingNo' | 'submissionDate' | 'status' | 'challanNumber' | 'challanAmount' | 'calculatedAggregate'
  >
): Promise<AdmissionApplication> {
  try {
    const res = await fetch('/api/admissions/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appData),
    });
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }
      return data.application as AdmissionApplication;
    }
  } catch (err: any) {
    if (err?.message && err.message.includes('Required fields')) {
      throw err;
    }
  }

  // Static host fallback using official BZU aggregate formula
  const matricRatio = (appData.matricMarks / (appData.matricTotal || 1100)) * 30;
  const interRatio = (appData.interMarks / (appData.interTotal || 520)) * 50;
  const entryRatio = appData.entryTestScore ? (appData.entryTestScore / 100) * 20 : 15;
  const calculatedAggregate = Number((matricRatio + interRatio + entryRatio).toFixed(2));

  const newApp: AdmissionApplication = {
    ...appData,
    id: `app-${Date.now()}`,
    appTrackingNo: `BZU-F26-${Math.floor(1000 + Math.random() * 9000)}`,
    calculatedAggregate,
    status: calculatedAggregate >= 75 ? 'Merit List Provisionally Selected' : 'Under Review',
    submissionDate: new Date().toISOString(),
    challanNumber: `CH-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    challanAmount: 1500,
  };

  const existing: AdmissionApplication[] = JSON.parse(localStorage.getItem(LOCAL_APPS_STORAGE_KEY) || '[]');
  existing.unshift(newApp);
  localStorage.setItem(LOCAL_APPS_STORAGE_KEY, JSON.stringify(existing));
  return newApp;
}

export async function trackAdmissionApplication(trackingNo: string): Promise<AdmissionApplication> {
  try {
    const res = await fetch(`/api/admissions/status/${encodeURIComponent(trackingNo.trim())}`);
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (res.ok) return data as AdmissionApplication;
    }
  } catch {
    // fallback to static JSON + localStorage
  }

  const db = await loadHostedDatabase();
  const localApps: AdmissionApplication[] = JSON.parse(localStorage.getItem(LOCAL_APPS_STORAGE_KEY) || '[]');
  const allApps = [...localApps, ...db.applications];
  const q = trackingNo.trim().toUpperCase();
  const match = allApps.find(a => a.appTrackingNo.toUpperCase() === q || a.cnic === trackingNo.trim());
  if (!match) {
    throw new Error('Application tracking number not found');
  }
  return match;
}

export async function submitContactInquiry(
  inquiry: Omit<ContactInquiry, 'id' | 'ticketNumber' | 'status' | 'createdAt'>
): Promise<ContactInquiry> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    });
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry');
      return data.ticket as ContactInquiry;
    }
  } catch (err: any) {
    if (err?.message && err.message.includes('required')) throw err;
  }

  const ticket: ContactInquiry = {
    ...inquiry,
    id: `tkt-${Date.now()}`,
    ticketNumber: `BZU-TKT-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 'Received',
    createdAt: new Date().toISOString(),
  };
  const existing: ContactInquiry[] = JSON.parse(localStorage.getItem(LOCAL_INQUIRIES_STORAGE_KEY) || '[]');
  existing.unshift(ticket);
  localStorage.setItem(LOCAL_INQUIRIES_STORAGE_KEY, JSON.stringify(existing));
  return ticket;
}

export async function subscribeNewsletter(email: string): Promise<{ message: string }> {
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      return { message: data.message || 'Subscribed to BZU Academic Gazette' };
    }
  } catch {
    // static fallback
  }

  const clean = email.trim().toLowerCase();
  const existing: string[] = JSON.parse(localStorage.getItem(LOCAL_SUBSCRIBERS_STORAGE_KEY) || '[]');
  if (!existing.includes(clean)) {
    existing.push(clean);
    localStorage.setItem(LOCAL_SUBSCRIBERS_STORAGE_KEY, JSON.stringify(existing));
    return { message: 'Subscribed to BZU Academic Gazette' };
  }
  return { message: 'Already subscribed' };
}
