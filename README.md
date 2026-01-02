# Voice-Agent-Analytics

A professional, internal-style analytics dashboard for visualizing call duration metrics. Built to demonstrate clean UX, state management, and data persistence using modern frontend tooling.

## Key Features
- Professional analytics UI (not a marketing page)
- Area chart visualization for call duration analysis
- Email-based identity context
- Editable analytics data
- Explicit save vs load semantics
- Supabase persistence
- Clear data state indicators

## UX Design Philosophy
- Identity is explicitly committed via a Load action  
- Draft input is separated from active context  
- Data is never saved implicitly  
- Users are clearly informed when data is:
  - System default
  - Loaded but unsaved
  - Persisted custom data

## Analytics Definition
- Chart: Call Duration Analysis  
- X-Axis: Hour(00–23)  
- Y-Axis: Average Call Duration (minutes)

## Application States
- DEFAULT — System data, no user context  
- LOADED_UNSAVED — Email loaded, data not yet persisted  
- CUSTOM_SAVED — User-specific data stored

## Tech Stack
- Next.js (App Router)  
- TypeScript  
- shadcn/ui  
- Recharts  
- Supabase  
- Vercel (deployment)

## Project Structure
```bash

app/  
  ├── page.tsx  
  ├── layout.tsx  
components/  
  ├── charts/  
  ├── EmailContextBanner.tsx  
  ├── EditChartDialog.tsx  
lib/  
  ├── supabase.ts  
  ├── defaultData.ts  
  ├── email.ts  
types/  
  └── analytics.ts
  ```


## Environment Variables
Create a `.env.local` in the project root with public Supabase keys (client-side only):

```bash
# .env.local (example)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_public_anon_key
```

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn
yarn dev
# or
pnpm install
pnpm dev
```

Open http://localhost:3000 in your browser.

## Data Persistence Flow
 -  User enters email (draft)  
 -  Clicks Load  
 -  Dashboard loads existing data (if any)  
 -  User edits values  
 -  Clicks Save  
 -  Data is persisted to Supabase  
 -  Chart updates immediately

## Engineering Highlights
- Strict TypeScript typing  
- Immutable React state handling  
- Explicit user intent before persistence  
- Clean component boundaries  
- Production-grade Supabase usage

##
Last Updated: January 2, 2026