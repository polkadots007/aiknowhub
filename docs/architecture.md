# Architecture

## High Level Architecture

Frontend (React + Zustand)
│
|──
│ ├── React | Tailwind | Typescript
│ ├── Zustand State Management
│ ├── Theme Management
| └── Browser Routing
│
|
├── Supabase Auth
│ ├── User Account Creation
│ ├── Login
│ ├── Logout
│ ├── Password Recovery
│ └── Session Management
│
├── Supabase Database
│ ├── Notes CRUD
│ ├── Tags
│ ├── User Profiles
│ ├── Sharing Data
│ ├── Row Level Security
│ └── Chat History
│
└── Node.js API
├── Authentication Logic - JWTs Token Verification
└── AI Orchestration
|
|── AI Provider - Gemini API
| ├── AI Chat
| ├── Note Rewrite
| ├── Append
| ├── Retry
| └── AI Tag Generation
