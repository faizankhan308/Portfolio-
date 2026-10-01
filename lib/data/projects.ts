export interface ProjectTag {
  id: string
  slug: string
  label: string
  color: string
}

export interface ProjectData {
  id: string
  slug: string
  title: string
  tagline: string
  shortDescription: string
  descriptionMd: string
  role: string
  category: 'personal' | 'freelance'
  keyFeatures: string[]
  liveUrl: string | null
  repoUrl: string | null
  featured: boolean
  published: boolean
  displayOrder: number
  startedAt: string
  endedAt: string | null
  createdAt: string
  updatedAt: string
  tags: ProjectTag[]
  images: { id: string; url: string; alt: string; width: number; height: number; displayOrder: number }[]
}

export const TAGS: Record<string, ProjectTag> = {
  react: { id: 'react', slug: 'react', label: 'React', color: '#61DAFB' },
  typescript: { id: 'typescript', slug: 'typescript', label: 'TypeScript', color: '#3178C6' },
  node: { id: 'node', slug: 'node', label: 'Node.js', color: '#339933' },
  postgres: { id: 'postgres', slug: 'postgres', label: 'PostgreSQL', color: '#4169E1' },
  nextjs: { id: 'nextjs', slug: 'nextjs', label: 'Next.js', color: '#000000' },
  tailwind: { id: 'tailwind', slug: 'tailwind', label: 'Tailwind CSS', color: '#06B6D4' },
  java: { id: 'java', slug: 'java', label: 'Java', color: '#B07219' },
  javascript: { id: 'javascript', slug: 'javascript', label: 'JavaScript', color: '#F1E05A' },
  sql: { id: 'sql', slug: 'sql', label: 'SQL', color: '#E38C00' },
  mongodb: { id: 'mongodb', slug: 'mongodb', label: 'MongoDB', color: '#13AA52' },
  express: { id: 'express', slug: 'express', label: 'Express.js', color: '#000000' },
  bootstrap: { id: 'bootstrap', slug: 'bootstrap', label: 'Bootstrap', color: '#7952B3' },
  openai: { id: 'openai', slug: 'openai', label: 'OpenAI API', color: '#412991' },
  redux: { id: 'redux', slug: 'redux', label: 'Redux', color: '#764ABC' },
  nodemailer: { id: 'nodemailer', slug: 'nodemailer', label: 'Nodemailer', color: '#339933' },
  jwt: { id: 'jwt', slug: 'jwt', label: 'JWT Auth', color: '#d63aff' },
  gemini: { id: 'gemini', slug: 'gemini', label: 'Gemini AI', color: '#4285F4' },
  sqlite: { id: 'sqlite', slug: 'sqlite', label: 'SQLite', color: '#003B57' },
  vite: { id: 'vite', slug: 'vite', label: 'Vite', color: '#646CFF' },
  zod: { id: 'zod', slug: 'zod', label: 'Zod', color: '#3068B7' },
}

export const PROJECTS: ProjectData[] = [
  {
    id: 'proj-1',
    slug: 'sa-raichur-service-point',
    title: 'SA Raichur Service Point',
    tagline: 'Freelance Client Project',
    category: 'freelance',
    keyFeatures: [
      'Urban Company-inspired responsive home services marketplace',
      'Redux Toolkit global cart system with localStorage state persistence',
      'JWT-secured admin dashboard for booking & service catalog management',
      'Nodemailer SMTP integration for real-time email booking alerts',
      'Click-to-Call & WhatsApp instant direct action buttons'
    ],
    shortDescription:
      'A production-quality service marketplace web application for a Raichur-based home services business — inspired by Urban Company, built with React, Redux Toolkit, Express, and MongoDB.',
    descriptionMd: `## Overview

SA Raichur Service Point is a **production-quality, full-stack service marketplace web application** built for a real client business based in Raichur, Karnataka. The platform connects homeowners with professional service providers for cleaning, maintenance, AC repair, plumbing, and more — directly inspired by the Urban Company experience.

This was an **end-to-end freelance client project**: I handled everything from client requirement gathering and database schema design to frontend components, authentication, and deployment.

---

## Problem / Purpose

The client, SA Raichur Service Point, ran their home services business entirely offline — managing bookings manually through phone calls and WhatsApp messages. They needed:

- A professional digital presence to build trust and acquire new customers online
- An easy, transparent service catalog where customers can browse services, view pricing, and submit booking requests
- An admin dashboard to review incoming bookings and update service status
- Quick-contact action buttons (Call + WhatsApp) for urgent mobile customer queries

---

## What I Built

A complete **multi-page React web application** with:

- **Frontend** — React.js SPA with an intuitive, city-service-inspired responsive layout
- **Backend** — Node.js + Express.js REST API handling bookings and admin authentication
- **Database** — MongoDB with Mongoose ODM for services catalog, customer bookings, and admin accounts
- **Admin Panel** — JWT-protected dashboard with booking status management (Pending → Confirmed → Completed)
- **Email Notifications** — Nodemailer SMTP integration alerting the business owner instantly on new bookings

---

## Key Features

- **Urban Company-Inspired UX** — Sticky navigation bar, location indicator (Raichur, Karnataka), search autocomplete, horizontal category rows, and detailed service detail popups
- **Redux Toolkit Cart System** — Global cart state managing service quantities and price summaries, persisted in localStorage across page reloads
- **Service Catalog** — 15+ services across cleaning, AC & electrical repair, plumbing, solar, and movers with real pricing and descriptions
- **Booking Pipeline** — Customer completes booking form, backend securely stores record, admin receives instant email notification
- **Direct Action Links** — Call & pre-filled WhatsApp links for rapid mobile customer support
- **JWT Admin Dashboard** — Secured login flow, booking management table, and catalog status toggles
- **Offline DB Fallback** — Local JSON database fallback ensuring catalog availability if MongoDB is unreachable

---

## Technical Implementation & Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Redux Toolkit, Tailwind CSS |
| **Backend** | Node.js, Express.js, REST API |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens) |
| **Notifications** | Nodemailer (SMTP) |
| **Deployment** | Vercel (Frontend), Railway (Backend) |

---

## My Role & Contribution

As the **sole freelance developer**, I was fully responsible for:

- Conducting client discovery sessions to define feature requirements and catalog scope
- UI/UX layout design, color system, and service card component architecture
- Developing the complete RESTful backend and MongoDB database schema
- Implementing JWT authentication and route protection middleware
- Integrating email notification services and testing mobile responsiveness
- Deploying the production build and providing ongoing client support

---

## Important Challenges & Technical Decisions

- **Cart State Persistence**: React component state resets on page reloads. I integrated Redux Toolkit with a custom localStorage sync middleware to ensure user carts remain intact across page navigation.
- **Resilient Data Access**: Implemented a local JSON fallback mechanism so the static service catalog remains accessible even during unexpected database connectivity drops.
- **Admin Dashboard Security**: Secured administrative endpoints using HTTP Bearer JWT tokens with automated expiration checks.

---

## Result & Outcome

- Delivered a fully functional, production-ready web application on time and within scope
- Successfully digitized the client's home service operations, streamlining customer booking requests
- The application is live and actively serving customers in Raichur, Karnataka
`,
    role: 'Freelance Full-Stack Developer',
    liveUrl: 'https://sa-raichur-service-point.vercel.app/',
    repoUrl: 'https://github.com/faizankhan308/sa-raichur-service-point',
    featured: true,
    published: true,
    displayOrder: 0,
    startedAt: '2024-09-01T00:00:00.000Z',
    endedAt: '2024-10-01T00:00:00.000Z',
    createdAt: '2024-09-01T00:00:00.000Z',
    updatedAt: '2024-09-01T00:00:00.000Z',
    tags: [TAGS.react, TAGS.redux, TAGS.tailwind, TAGS.node, TAGS.express, TAGS.mongodb, TAGS.jwt, TAGS.nodemailer],
    images: [
      {
        id: 'sa-raichur-cover',
        url: '/projects/sa-raichur-cover.png',
        alt: 'SA Raichur Service Point homepage — service marketplace for Raichur, Karnataka',
        width: 1440,
        height: 900,
        displayOrder: 0,
      },
    ],
  },
  {
    id: 'proj-2',
    slug: 'ai-finance-platform',
    title: 'AI Finance Platform',
    tagline: 'Personal Project',
    category: 'personal',
    keyFeatures: [
      'AI-driven expense categorization & monthly budget forecasting',
      'Interactive data visualization with real-time financial charts',
      'JWT authentication with protected REST API routes',
      'Multi-account expense tracking & category trend analytics',
      'Responsive dark terminal dashboard interface'
    ],
    shortDescription:
      'An AI-powered personal finance management platform for tracking expenses, analyzing spending patterns, and generating smart budget forecasts — built with React, Node.js, Express, and MongoDB.',
    descriptionMd: `## Overview

**Welth** (AI Finance Platform) is a full-stack personal finance management web application that uses AI to help users track their expenses, analyze their spending patterns, and receive intelligent budget recommendations.

This was a **personal technical project** built to explore the integration of data analytics/AI logic into a practical full-stack financial application.

---

## Problem / Purpose

Most conventional budgeting tools display passive transaction lists without offering actionable guidance. The objective was to build a tool that:

- Automatically categorizes and logs daily financial transactions
- Uses AI analysis to predict upcoming monthly spending and suggest category budgets
- Presents financial metrics through intuitive, real-time charts and visual cards
- Guarantees data privacy and secure authentication for all financial records

---

## What I Built

A complete **full-stack web application** featuring:

- **React Frontend** — Interactive single-page dashboard with dynamic financial charts and account summaries
- **Node.js + Express Backend** — RESTful API for auth, expense management, and AI forecast calculations
- **MongoDB Database** — Storing encrypted user credentials, transaction records, and category limits
- **AI Recommendation Model** — Statistical and pattern recognition algorithms calculating monthly budget thresholds

---

## Key Features

- **Secure User Authentication** — JWT-based signup/login flow with protected API endpoints
- **Transaction Tracking** — Add, edit, and filter transactions across categories (Food, Transport, Utilities, Entertainment, etc.)
- **Personalized Financial Dashboard** — Real-time summary metrics showing total balance, monthly income, and total expenditure
- **AI Budget Forecasting** — Analyzes past spending patterns to recommend realistic category spending targets
- **Data Visualization** — Interactive category distribution charts and expense trend graphs
- **Multi-Account View** — Track multiple cash, bank, or card accounts in one centralized dashboard

---

## Technical Implementation & Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, CSS Modules / Custom CSS |
| **Backend** | Node.js, Express.js, REST API |
| **Database** | MongoDB, Mongoose ODM |
| **Auth** | JWT (JSON Web Tokens) |
| **AI / Analytics** | Custom forecasting algorithms & statistical analysis |
| **Deployment** | Vercel |

---

## My Role & Contribution

As the **sole developer**, I:

- Designed and engineered the end-to-end full-stack software architecture
- Built the React dashboard with reusable financial widget components
- Developed the RESTful API endpoints for user auth and expense CRUD operations
- Implemented the algorithmic logic for category expense predictions and budget alerts
- Configured deployment workflows on Vercel

---

## Important Challenges & Technical Decisions

- **Stable Prediction Logic**: To ensure accurate budget advice with small transaction histories, I engineered a hybrid heuristic model combining category moving averages with trend multipliers.
- **Real-Time Data Sync**: Optimized React state updates using lightweight custom context hooks, keeping summary cards and charts synchronized instantaneously upon any transaction edit.

---

## Result & Outcome

- Successfully built and deployed a fully working AI finance dashboard
- Publicly hosted and accessible live on Vercel
- Demonstrated practical full-stack engineering skills in financial data processing and state management
`,
    role: 'Full-Stack Developer',
    liveUrl: 'https://ai-finance-platform-yss7.vercel.app/',
    repoUrl: 'https://github.com/faizankhan308/Ai-Finance-Platform-',
    featured: true,
    published: true,
    displayOrder: 1,
    startedAt: '2024-11-01T00:00:00.000Z',
    endedAt: '2024-12-01T00:00:00.000Z',
    createdAt: '2024-11-01T00:00:00.000Z',
    updatedAt: '2024-11-01T00:00:00.000Z',
    tags: [TAGS.react, TAGS.node, TAGS.express, TAGS.mongodb, TAGS.jwt],
    images: [
      {
        id: 'ai-finance-cover',
        url: '/projects/ai-finance-cover.png',
        alt: 'AI Finance Platform — Welth dashboard homepage with AI-powered financial management',
        width: 1440,
        height: 900,
        displayOrder: 0,
      },
    ],
  },
  {
    id: 'proj-3',
    slug: 'text-to-image-generator',
    title: 'Imagify – Text to Image Generator',
    tagline: 'Personal Project',
    category: 'personal',
    keyFeatures: [
      'High-resolution AI image generation via OpenAI DALL·E API',
      'Secure Express API proxy shielding API keys from client exposure',
      'Interactive prompt history gallery & instant visual preview',
      'Responsive prompt input with real-time loading feedback'
    ],
    shortDescription:
      'A creative AI tool that transforms user-written text prompts into high-quality visual art in seconds using the OpenAI API — built with React, Express.js, and Tailwind CSS.',
    descriptionMd: `## Overview

**Imagify** is a full-stack AI-powered text-to-image generation web application. Users enter a text prompt, and the application generates high-quality artwork using the OpenAI DALL·E API.

This was a **personal technical project** built to master API integration with generative AI models and design clean, fast React user experiences backed by Node.js.

---

## Problem / Purpose

Generative AI image creation often requires complex prompts or cumbersome interfaces. The goal of Imagify was to provide:

- A clean, accessible interface where anyone can describe an image and get immediate visual results
- Secure server-side handling of secret API keys to prevent client exposure
- Instant feedback, progress states, and prompt gallery showcase

---

## What I Built

A **full-stack React + Express application** featuring:

- **React Frontend** — Clean UI featuring prompt input, image generation canvas, gallery grid, and credit counter UI
- **Express Backend** — API proxy server that validates requests, formats prompts, calls OpenAI DALL·E API, and returns image URLs
- **OpenAI DALL·E Integration** — State-of-the-art text-to-image generation pipeline
- **Generated Image Gallery** — Browsable grid showcasing generated creations and their associated text prompts

---

## Key Features

- **Text-to-Image Generation** — Convert plain English text descriptions into custom visual art
- **OpenAI DALL·E Integration** — Powered by OpenAI's deep learning image generation models
- **Server Key Protection** — All API calls are executed through the Express backend, ensuring credentials never touch the browser
- **Prompt Gallery Showcase** — View and explore a history of generated images and prompts
- **Responsive Layout** — Fully optimized for desktop, tablet, and mobile screens

---

## Technical Implementation & Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **AI API** | OpenAI DALL·E API |
| **Deployment** | Render |

---

## My Role & Contribution

As the **sole developer**, I:

- Designed the modern UI layout and component structure using React and Tailwind CSS
- Implemented the Express API backend to proxy requests securely to the OpenAI API
- Built loading indicators, error boundaries, and image gallery components
- Configured deployment and environment variables on Render

---

## Important Challenges & Technical Decisions

- **API Security**: Prevented client-side key leakage by establishing a server-side proxy route in Express that stores the OpenAI API key securely in server environment variables.
- **Handling Asynchronous API Delays**: Built smooth skeleton loading animations and user status updates so visitors have immediate visual feedback while the AI model generates the artwork.

---

## Result & Outcome

- Successfully launched a functional AI image generator online
- Live and accessible publicly on Render
- Demonstrated mastery in combining AI APIs with full-stack JavaScript frameworks
`,
    role: 'Full-Stack Developer',
    liveUrl: 'https://faizankhan308-text-to-image-generator1.onrender.com/',
    repoUrl: 'https://github.com/faizankhan308/Text-to-image-generator',
    featured: true,
    published: true,
    displayOrder: 2,
    startedAt: '2024-10-01T00:00:00.000Z',
    endedAt: '2024-11-01T00:00:00.000Z',
    createdAt: '2024-10-01T00:00:00.000Z',
    updatedAt: '2024-10-01T00:00:00.000Z',
    tags: [TAGS.react, TAGS.openai, TAGS.express, TAGS.tailwind],
    images: [
      {
        id: 'imagify-cover',
        url: '/projects/imagify-cover.png',
        alt: 'Imagify – Text to Image Generator homepage — AI-powered image generation from text prompts',
        width: 1440,
        height: 900,
        displayOrder: 0,
      },
    ],
  },
  {
    id: 'proj-4',
    slug: 'querypilot',
    title: 'QueryPilot',
    tagline: 'Personal Project',
    category: 'personal',
    keyFeatures: [
      'Natural-language to SQL conversion powered by Google Gemini AI',
      'SQLite file upload & PostgreSQL connection support via adapter pattern',
      'Automatic schema extraction — AI generates queries against real tables only',
      'Two-layer SQL safety: prompt-level restrictions + parsed SELECT-only enforcement',
      'Interactive query editor with AI explanation, confidence score & live results'
    ],
    shortDescription:
      'An AI-powered database assistant that converts plain-English questions into safe, schema-aware SQL queries — supporting SQLite and PostgreSQL, built with React, Vite, Node.js, Express, and Google Gemini.',
    descriptionMd: `## Overview

**QueryPilot** is a full-stack AI-powered database assistant that lets users ask questions about their database in plain English and instantly receive a safe, schema-aware SQL query — plus a human-readable explanation and a confidence score.

This was a **personal technical project** built to explore the intersection of LLM-based code generation, database abstraction, and API-level safety enforcement in a full-stack JavaScript application.

---

## Problem / Purpose

Writing SQL requires knowing the exact schema — table names, column names, relationships, and syntax — before typing a single character. For common queries, this creates unnecessary friction:

- Users must open a database client, manually inspect the schema, figure out the correct tables and columns, write the SQL, then execute it
- Mistakes are common: wrong column names, missing joins, or accidentally destructive statements
- Non-technical users are effectively locked out of their own data

QueryPilot eliminates this workflow by providing a natural-language interface on top of any connected database — generating correct, schema-grounded SQL without the user ever touching the schema directly.

---

## What I Built

A complete **full-stack web application** featuring:

- **React + Vite Frontend** — Clean, responsive chat-style UI with database connection panel, auto-generated schema viewer, AI query panel, editable SQL editor, and a formatted results table
- **Node.js + Express Backend** — REST API handling database sessions, schema extraction, AI SQL generation, and query execution
- **Gemini AI Integration** — Schema-aware prompt pipeline using \`@google/genai\` that passes the actual database schema to Gemini alongside the user's question, preventing hallucinated table/column names
- **Database Adapter Layer** — Pluggable adapter architecture (\`SQLiteAdapter\` / \`PostgreSQLAdapter\`) behind a shared \`DatabaseAdapter\` interface, keeping the API layer database-agnostic
- **SQL Safety Layer** — Two independent enforcement points: prompt-level read-only instructions to Gemini, and parsed-statement validation via \`node-sql-parser\` that rejects anything other than a single \`SELECT\` before it touches the database

---

## Key Features

- **Natural Language → SQL** — Ask "Show me the 5 highest paid employees" and receive the correct SELECT query, a plain-English explanation, and a numeric confidence score
- **SQLite & PostgreSQL Support** — Upload a \`.sqlite\` file or provide a PostgreSQL connection URL; the adapter pattern handles the rest without any API layer changes
- **Automatic Schema Extraction** — On connection, the backend inspects all tables and columns and feeds the live schema directly to Gemini, ensuring generated SQL only references real columns
- **Two-Layer SQL Safety** — Gemini is instructed to generate only SELECT statements (Layer 1); every SQL string — including manually edited queries — is independently parsed and rejected if it is not a single valid SELECT (Layer 2), blocking stacked statements like \`SELECT ...; DROP TABLE ...;\`
- **Editable Query Editor** — Users can review, manually adjust, and re-execute the generated SQL before committing to results
- **Structured AI Responses** — Every generation returns a typed JSON response: \`{ sql, explanation, confidence }\`, surfaced cleanly in the UI
- **Provider-Independent AI Layer** — An \`AIService\` abstraction decouples the API layer from Gemini, with a \`MockAIService\` used in tests for deterministic, quota-free test runs
- **Request Validation** — All API inputs validated with Zod schemas before reaching business logic

---

## Technical Implementation & Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4 |
| **Backend** | Node.js 22, Express 4 |
| **AI** | Google Gemini (\`@google/genai\`, gemini-2.5-flash-lite) |
| **Database — SQLite** | \`better-sqlite3\` |
| **Database — PostgreSQL** | \`pg\` (node-postgres), Supabase PostgreSQL |
| **SQL Safety** | \`node-sql-parser\` (parsed statement validation) |
| **Validation** | Zod |
| **File Uploads** | Multer |
| **Testing** | Vitest, Supertest, MockAIService |
| **Deployment** | Render (Backend) |

---

## My Role & Contribution

As the **sole developer**, I:

- Designed the full-stack architecture including the database adapter abstraction, AIService abstraction, and session management layer
- Built the React frontend with Vite — connection panel, schema viewer, AI chat panel, editable SQL editor, and formatted results table
- Engineered the Gemini integration with a schema-aware prompting pipeline and structured JSON response parsing
- Implemented the two-layer SQL safety system: prompt-level constraints combined with independent \`node-sql-parser\` validation at the API boundary
- Developed the pluggable database adapter layer supporting both SQLite and PostgreSQL without coupling to the API routes
- Wrote automated backend tests using Vitest and Supertest, with a \`MockAIService\` for deterministic AI-generation testing without live API calls
- Deployed the backend to Render with environment-based configuration for the Gemini API key and database credentials

---

## Important Challenges & Technical Decisions

- **AI Hallucination Prevention**: LLMs frequently invent plausible-sounding table or column names. By extracting the actual database schema at connection time and injecting it directly into the Gemini prompt, QueryPilot grounds all generation in real schema data — the AI cannot reference columns that don't exist.
- **Safety Independent of the LLM**: Relying only on prompt instructions to prevent destructive SQL is insufficient — a prompt can be circumvented, or a user can manually edit the query. I enforced a second, independent layer using \`node-sql-parser\` that parses every SQL string before execution and hard-rejects anything that is not a single SELECT statement, regardless of where it came from.
- **Testable AI Layer**: Integrating a live LLM in automated tests creates flaky, quota-dependent test suites. I introduced an \`AIService\` interface with a \`MockAIService\` implementation that returns deterministic responses, allowing the full backend test suite to run without network calls or API keys.
- **Database Abstraction**: Rather than coupling route handlers to SQLite or PostgreSQL directly, I designed a \`DatabaseAdapter\` interface so adding a new database engine only requires a new adapter class with no changes to the API layer.

---

## Result & Outcome

- Built and deployed a fully functional AI database assistant with real safety guarantees
- Backend live on Render at \`querypilot-hymc.onrender.com\`
- Demonstrated practical skills in LLM integration, adapter-pattern architecture, API-level security enforcement, and full-stack JavaScript development
`,
    role: 'Full-Stack Developer',
    liveUrl: null,
    repoUrl: 'https://github.com/faizankhan308/QueryPilot.git',
    featured: true,
    published: true,
    displayOrder: 3,
    startedAt: '2025-05-01T00:00:00.000Z',
    endedAt: '2025-07-01T00:00:00.000Z',
    createdAt: '2025-05-01T00:00:00.000Z',
    updatedAt: '2025-07-01T00:00:00.000Z',
    tags: [TAGS.react, TAGS.vite, TAGS.tailwind, TAGS.node, TAGS.express, TAGS.gemini, TAGS.sqlite, TAGS.postgres, TAGS.zod],
    images: [
      {
        id: 'querypilot-cover',
        url: '/projects/querypilot-cover.png',
        alt: 'QueryPilot — AI-powered natural language to SQL database assistant',
        width: 1440,
        height: 900,
        displayOrder: 0,
      },
    ],
  },
]
