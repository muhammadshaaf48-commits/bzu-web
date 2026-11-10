import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { db } from './src/server/db.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// REST API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', university: 'Bahauddin Zakariya University Multan', timestamp: new Date() });
});

app.get('/api/faculties', (req, res) => {
  res.json(db.getFaculties());
});

app.get('/api/departments', (req, res) => {
  const facultyId = req.query.facultyId as string | undefined;
  res.json(db.getDepartments(facultyId));
});

app.get('/api/programs', (req, res) => {
  const level = req.query.level as string | undefined;
  const facultyId = req.query.facultyId as string | undefined;
  const query = req.query.query as string | undefined;
  res.json(db.getPrograms({ level, facultyId, query }));
});

app.get('/api/faculty-members', (req, res) => {
  const query = req.query.query as string | undefined;
  const department = req.query.department as string | undefined;
  const designation = req.query.designation as string | undefined;
  res.json(db.getFacultyMembers({ query, department, designation }));
});

app.get('/api/merit-lists', (req, res) => {
  const query = req.query.query as string | undefined;
  res.json(db.getMeritEntries(query));
});

app.get('/api/results/samples', (req, res) => {
  const samples = db.getAllExamResults().map(r => ({
    rollNumber: r.rollNumber,
    regNumber: r.regNumber,
    studentName: r.studentName,
    program: r.program,
    cgpa: r.cgpa,
  }));
  res.json(samples);
});

app.post('/api/results/search', (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Roll number or registration number is required' });
  }
  const result = db.searchExamResult(query);
  if (!result) {
    return res.status(404).json({
      error: `No record found for '${query}'. Please verify your Roll Number (e.g. BZU-2024-BSCS-101) or Registration Number.`,
    });
  }
  return res.json(result);
});

app.post('/api/admissions/apply', (req, res) => {
  try {
    const {
      applicantName,
      fatherName,
      cnic,
      email,
      phone,
      gender,
      dob,
      domicile,
      matricRollNo,
      matricMarks,
      matricTotal,
      interRollNo,
      interMarks,
      interTotal,
      entryTestScore,
      firstChoiceProgram,
      secondChoiceProgram,
      shift,
      quota,
    } = req.body;

    if (!applicantName || !fatherName || !cnic || !email || !firstChoiceProgram) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const application = db.createAdmissionApplication({
      applicantName,
      fatherName,
      cnic,
      email,
      phone: phone || '',
      gender: gender || 'Male',
      dob: dob || '',
      domicile: domicile || 'Multan',
      matricRollNo: matricRollNo || '',
      matricMarks: Number(matricMarks) || 0,
      matricTotal: Number(matricTotal) || 1100,
      interRollNo: interRollNo || '',
      interMarks: Number(interMarks) || 0,
      interTotal: Number(interTotal) || 520,
      entryTestScore: entryTestScore ? Number(entryTestScore) : undefined,
      firstChoiceProgram,
      secondChoiceProgram,
      shift: shift || 'Morning',
      quota: quota || 'Open Merit',
    });

    res.status(201).json({
      message: 'Admission Application Submitted Successfully',
      application,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to submit application' });
  }
});

app.get('/api/admissions/status/:trackingNo', (req, res) => {
  const { trackingNo } = req.params;
  const appRecord = db.getApplicationByTrackingNo(trackingNo);
  if (!appRecord) {
    return res.status(404).json({ error: 'Application tracking number not found' });
  }
  res.json(appRecord);
});

app.get('/api/news', (req, res) => {
  res.json(db.getNews());
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, departmentTarget, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }
  const ticket = db.addContactInquiry({
    name,
    email,
    phone: phone || '',
    departmentTarget: departmentTarget || 'Registrar Office',
    subject: subject || 'General Inquiry',
    message,
  });
  res.status(201).json({
    message: 'Your inquiry has been logged. Our administrative desk will respond shortly.',
    ticket,
  });
});

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email address is required' });
  }
  const added = db.addSubscriber(email);
  res.json({ success: true, message: added ? 'Subscribed to BZU Academic Gazette' : 'Already subscribed' });
});

// AI Assistant endpoint
app.post('/api/ai/chat', async (req, res) => {
  const { message, mode, history } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const isDeepThinking = mode === 'deep-think';
  const selectedModel = isDeepThinking ? 'gemini-4-carbon' : 'gemini-3.1-flash-lite';

  const systemInstruction = `You are the official AI Academic Assistant for Bahauddin Zakariya University (BZU), Multan, Pakistan.
Founded in 1975, BZU is South Punjab's flagship public research university celebrating its Golden Jubilee (1975-2026).
Key Institutional Facts:
- Main Campus: 960+ acres on Bosan Road, Multan. Sub-campuses in Vehari and Lodhran.
- Rankings: #1 University in Punjab and #2 in Pakistan (THE World Rankings 2026, #601-800 band). Top 300 in QS Asia (#250-300).
- Scale: 10 Faculties, 72+ Academic Departments, 200+ Degree Tracks, 30,000+ Students, 600+ Faculty (80.1% PhDs).
- Accreditations: HEC Category W4, PEC (Engineering), PCP (Pharmacy), PVMC (Veterinary), NCEAC (Computing), NBEAC (Business), NAEAC (Agriculture).
- Key Portals:
  - Online Admission: apply.bzu.edu.pk / admission.bzu.edu.pk
  - Roll No Slips: slip.bzu.edu.pk
  - Semester Results: result.bzu.edu.pk
  - Registration: registration.bzu.edu.pk
- Admissions Fall 2026: Open for Undergraduate (BS 4-Year), Lateral BS (5th Semester for ADP/BA/BSc holders), Graduate (MS/M.Phil in 79 fields), and Doctoral (PhD in 35 fields).
- Merit Calculation: Matric (30%) + Intermediate (50%) + Entry Test (20%).
- Scholarships: Over 3,900 HEC Need-Based, PEEF, Ehsaas, and University Merit Scholarships available.
- Research: ORIC ranked No. 09 in Pakistan, HEC Category 'X'.

Persona & Tone:
- Professional, welcoming, authoritative, and helpful.
- When answering inquiries, format with clear sections, bullet points, and actionable next steps.
- If in Deep Thinking Mode (${isDeepThinking ? 'ACTIVE' : 'INACTIVE'}), provide deep, nuanced comparative analysis, step-by-step academic roadmaps, and detailed curriculum breakdown.
- Always include relevant contact information (Registrar: registrar@bzu.edu.pk, UAN: +92 61 111-222-298) when advising on official procedures.`;

  try {
    if (!process.env.GEMINI_API_KEY) {
      // Intelligent fallback when API key is not yet set
      const lower = message.toLowerCase();
      let fallbackAnswer = '';

      if (lower.includes('admission') || lower.includes('apply') || lower.includes('date')) {
        fallbackAnswer = `**BZU Admissions Fall 2026:**
Applications are actively being processed for all 10 Faculties.
- **Undergraduate (BS 4-Year):** 117 Programs (Computer Science, Software Engineering, AI, Civil Engg, Pharm-D, DVM, BBA, LLB).
- **BS Lateral (5th Semester):** 47 direct-entry routes for 14-year degree (ADP/B.Sc/BA) holders.
- **Graduate (MS/M.Phil):** 79 disciplines with thesis tracks.
- **Doctoral (PhD):** 35 funded programs.

**How to Apply:** Submit your online application directly via the **Apply Online** portal on this website or visit https://apply.bzu.edu.pk.`;
      } else if (lower.includes('merit') || lower.includes('aggregate')) {
        fallbackAnswer = `**Merit Lists & Aggregate Calculation (Fall 2026):**
The university calculates aggregate scores using the official HEC formula:
$$\\text{Aggregate} = (\\text{Matric Marks} \\times 30\\%) + (\\text{Inter Marks} \\times 50\\%) + (\\text{Entry Test} \\times 20\\%)$$
- **BS Computer Science (Morning):** 1st Merit List closed at **88.45%**, 2nd Merit List closed at **86.80%**.
- **BS Software Engineering:** Closed at **86.90%**.
- **Pharm-D:** Closed at **91.20%**.
- **DVM:** Closed at **84.15%**.

You can check your personal aggregate and merit status using the **Merit Lists** tool in the admissions menu.`;
      } else if (lower.includes('result') || lower.includes('slip') || lower.includes('roll')) {
        fallbackAnswer = `**Examination Results & Slips:**
Official semester and annual examination results are accessible directly in the **Results Portal** on this website.
- **Search Format:** Enter your Roll Number (e.g. \`BZU-2024-BSCS-101\` or \`BZU-2023-ENG-042\`).
- Verified digital transcripts include course-by-course marks, GPA, CGPA, and official stamp verification.`;
      } else {
        fallbackAnswer = `Welcome to **Bahauddin Zakariya University (BZU) Multan**!
As South Punjab's foremost research landmark, BZU offers over 200 accredited degree programs across 10 faculties and 72 departments on our 960+ acre Bosan Road campus.

**Key Institutional Services:**
1. **Academic Programs:** Explore Undergraduate, Lateral BS 5th semester, MS/M.Phil, and PhD pathways.
2. **Admissions Fall 2026:** Submit applications online, calculate aggregates, and view merit lists.
3. **Examination Results:** Instantly look up verified grade sheets and roll number slips.
4. **Faculty Census:** Browse our directory of 600 faculty members (80.1% PhD qualified).

Please feel free to ask any specific question regarding eligibility, fees, faculty, or departments!`;
      }

      return res.json({
        reply: fallbackAnswer,
        modelUsed: `${selectedModel} (Institutional Mode)`,
        thinkingMode: isDeepThinking,
      });
    }

    const config: any = {
      systemInstruction,
    };

    if (isDeepThinking) {
      config.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
    }

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: message,
      config,
    });

    const reply = response.text || 'Thank you for contacting BZU Multan. Please rephrase or specify your department.';
    return res.json({
      reply,
      modelUsed: selectedModel,
      thinkingMode: isDeepThinking,
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      error: error.message || 'Error communicating with AI Assistant',
      fallback: 'BZU Information Desk is currently operating. Please visit https://bzu.edu.pk or contact registrar@bzu.edu.pk.',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BZU University Portal Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
