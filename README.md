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
## 🗃️ Dataset Used

We utilize the **[Resume Dataset from Kaggle](https://www.kaggle.com/datasets/gauravduttakiit/resume-dataset)** to train and fine-tune AI resume parsing and job role matching algorithms.

### Dataset Highlights:
- 1000+ real-world resumes
- Labeled with profession categories (HR, Data Science, Developer, etc.)
- Used for:
  - Resume classification
  - Keyword extraction
  - AI screening model fine-tuning

---

## 🖼️ Architecture Design

![Architecture Diagram](https://user-images.githubusercontent.com/46809038/126433985-b84b832a-a029-479f-922c-c344ee88a21e.png)

### Overview:

- 🧑 Candidates register via Clerk, upload resumes (stored in Supabase)
- 🧑‍💼 Hiring Teams post jobs with AI-generated descriptions & requirements
- ⚙️ AI Agents screen applications, rank candidates, detect bias
- 📄 Candidate job matches are shown in real-time
- 🧠 Backend Python services interact with OpenAI API + Supabase
- ✅ All state is synced with PostgreSQL via Supabase client SDK

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

## Authors

Kishore

Amurtha

Mahima

Abhishek

Adinarayana

