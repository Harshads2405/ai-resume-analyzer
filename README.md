# 🧠 AI Resume Coach  
**AI-powered ATS Resume Analyzer, Rewriter & Builder**

AI Resume Coach is a full-stack web application that helps users analyze, improve, rewrite, and build ATS-friendly resumes using modern AI models.  
It simulates how real Applicant Tracking Systems (ATS) evaluate resumes and provides actionable insights to improve hiring success.

---

## 🚀 Live Features

### ✅ Authentication & Security
- Email & password authentication (Supabase Auth)
- Secure session handling
- Row Level Security (RLS) – users can only access their own resumes

### 📄 Resume Upload & Extraction
- Upload resume in PDF format
- Automatic text extraction
- Stored securely in Supabase Storage

### 📊 AI Resume Analysis
- ATS Score (0–100)
- Skill Match Percentage
- Matched vs Missing Skills
- Strengths & Weaknesses
- AI-generated improvement suggestions
- Job-role-specific evaluation

### ✍️ AI Resume Rewrite
- ATS-optimized resume rewriting
- Strong action verbs
- Impact-focused bullet points
- Role-specific tailoring

### 🧱 Resume Builder
- Editable resume content
- Multiple resume templates:
  - Modern
  - Classic
- Live editing experience

### 📥 PDF Download
- Generate a clean, professional PDF resume
- AI-generated content
- Ready for job applications

### 🧭 Dashboard & Progress Tracking
- Step-by-step resume journey
- Upload → Analyze → Rewrite → Build → Download
- Resume history (per user)

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14 (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**
- Client-side state management with hooks

### Backend
- **Next.js API Routes**
- **Groq LLM API** (LLaMA models)
- Prompt-engineered structured JSON responses

### Database & Auth
- **Supabase**
  - PostgreSQL
  - Auth
  - Storage
  - Row Level Security (RLS)

### PDF Generation
- **@react-pdf/renderer**
- Server-side PDF streaming

---

## 🧠 AI Capabilities

- ATS-style resume evaluation
- Skill gap detection
- Job-role-specific analysis
- Structured JSON outputs (safe parsing)
- Resume rewriting with AI
- Actionable improvement suggestions

---

## 🔐 Security Highlights

- Supabase Service Role used **only on server**
- Client uses anon key
- Strict RLS policies:
  - Users can only read/write their own resumes
- No AI secrets exposed to client

---

## 📂 Project Structure (Simplified)

app/
├── api/
│ ├── analyze-resume/
│ ├── rewrite-resume/
│ ├── extract-resume-text/
│ └── download-resume/
├── dashboard/
│ ├── upload/
│ ├── analysis/
│ ├── rewrite/
│ ├── builder/
│ └── history/
└── auth/

components/
├── AnalysisStream.tsx
├── ATSScoreMeter.tsx
├── RewritePreview.tsx
├── ResumeTemplateModern.tsx
├── ResumeTemplateClassic.tsx
├── EditableResume.tsx
└── ProgressTracker.tsx

Local Development
- npm install
- npm run dev

App runs on:
- http://localhost:3000
- https://ai-resume-analyzer-xpjz.vercel.app/auth/login
