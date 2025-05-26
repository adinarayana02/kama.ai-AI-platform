# 🤖 AI Recruitment Platform – End-to-End AI Hiring SaaS

An intelligent recruitment platform that automates hiring processes using AI agents. It supports both **Hiring Teams** and **Candidates** with a fully functional SaaS ecosystem including login, job creation, candidate applications, AI-powered screening, video interview analysis, and onboarding—all powered by **Next.js, Python, Supabase, Clerk, and OpenAI**.

---

## 🌐 Live Demo
> Coming soon (URL of deployed project)

---

## ⚙️ Tech Stack

| Area        | Technology                                  |
|-------------|---------------------------------------------|
| Frontend    | Next.js (React), Tailwind CSS               |
| Backend     | Python (FastAPI or Flask), OpenAI API       |
| Database    | Supabase (PostgreSQL + Storage)             |
| Auth        | Clerk (Multi-role login/register support)   |
| AI Models   | OpenAI GPT (Text), Whisper (Audio), Vision  |
| Storage     | Supabase Buckets (Resume upload, Files)     |

---

## 👤 User Roles

### 🧑 Candidate
- Register/Login using Clerk
- Create profile and upload resume
- Discover jobs matched by AI
- Apply for jobs, take AI-assessed tests/interviews
- Track application status
- Get smart interview prep and feedback

### 🧑‍💼 Hiring Team
- Register/Login using Clerk (work email)
- Post new job listings (with AI-generated descriptions)
- Enable AI-powered resume screening and ranking
- Send automated interview invites
- Review candidate AI reports and interview feedback
- Hire and onboard with AI-generated offer letters

---

## 📁 Features

### 🎯 Job Creation
- Job title, description, salary, location
- AI-generated responsibilities, requirements, and questions
- Enable resume screening, bias detection, auto ranking

### 📥 Candidate Screening
- Resume parser + keyword matcher
- Rank candidates via OpenAI agents
- Analyze bias/fairness
- Video interview transcription, tone, and sentiment analysis

### 🧠 AI Modules
| Module              | Description                          |
|---------------------|--------------------------------------|
| Resume Parser       | Extracts structured data             |
| AI Screening Agent  | Ranks candidates by match score      |
| Bias Detector       | Flags biased language or scores      |
| Interview Analyzer  | Analyzes tone, facial cues, content  |
| Chatbot             | FAQ, job discovery, status updates   |
| Recommender System  | Suggests best candidates & jobs      |

---

## 🔐 Authentication with Clerk

- Clerk supports both Candidate and Hiring Team logins
- Role-based routing and dashboard separation
- Magic link + password login supported

---

## 📦 Supabase Database Tables

### 1. `candidates`
- id, full_name, email, password_hash
- resume_url, skills, experience, created_at

### 2. `hiring_teams`
- id, company_name, full_name, work_email, password_hash

### 3. `jobs`
- id, title, location, job_type, salary_min, salary_max
- description, responsibilities, requirements
- hiring_team_id (foreign key)

### 4. `applications`
- id, job_id, candidate_id, resume_url
- status, cover_letter, portfolio_url
- ai_score, feedback, created_at

---

## 🎙️ Supabase Storage – Resume Bucket Setup

1. **Bucket**: `resumes`
2. **RLS Policies** (set via dashboard):
   - Users can upload, read, update, and delete files under their own UID folder.
   - Example path: `user_uid/resume.pdf`

---

## 📜 API Endpoints (Python - FastAPI/Flask)

| Endpoint                     | Description                           |
|-----------------------------|---------------------------------------|
| `POST /api/generate-jd`     | Generate JD using OpenAI              |
| `POST /api/rank-resume`     | Rank candidate resume via AI          |
| `POST /api/interview-analyze` | Analyze tone, emotion, response       |
| `GET /api/job-matches`      | Recommend jobs to a candidate         |
| `POST /api/submit-application` | Candidate applies to job             |

---

## 🧪 Running the App Locally

### Frontend (Next.js + Tailwind + Clerk)
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, NEXT_PUBLIC_SUPABASE_URL, etc.
npm run dev
Backend (Python + OpenAI)
bash
Copy
Edit
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Add OPENAI_API_KEY, SUPABASE credentials
python app.py
📄 Environment Variables
.env.local (Frontend)
makefile
Copy
Edit
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLERK_FRONTEND_API=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
.env (Backend)
makefile
Copy
Edit
OPENAI_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
✨ Future Enhancements
Subscription + Billing with Stripe

Admin Dashboard

AI Job Fit Scoring

Multilingual Job & Resume support

In-app Video Interview UI with Whisper/Realtime

📜 License
MIT License

🧠 Credits
Built using:

OpenAI

Supabase

Clerk

Next.js

Tailwind CSS

Python

🚀 Start hiring smarter, not harder.
yaml
Copy
Edit

---

Let me know if you want a **versioned structure**, or **separate documentation for API usage**, or to connect **Stripe for subscriptions**.




