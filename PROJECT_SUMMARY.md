# Portfolio Project — Complete Summary

**Status:** Implementation Phase  
**Last Updated:** 2026-09-08  
**Owner:** akkila  
**Domain:** akkila.dev (Self-Hosted)

---

## 1. Project Overview

### 1.1 What is this?

A personal fullstack portfolio website that showcases projects, technical writing, and contact information, with a private admin dashboard for content management. The public site optimizes for fast first impressions on recruiters and engineers; the admin side optimizes for updating content without code deploys.

### 1.2 Key Goals

- **G1:** Convert visitors with hiring intent into contact submissions or email clicks
- **G2:** Demonstrate fullstack capability through both content and craft (open-source code)
- **G3:** Enable publishing content (projects/posts) in under 5 minutes from any device without touching code
- **G4:** Achieve Lighthouse scores ≥ 95+ across Performance, A11y, Best Practices, and SEO

### 1.3 Target Users

| Persona                    | Primary Intent                                    | Success Metric                              |
| -------------------------- | ------------------------------------------------- | ------------------------------------------- |
| **Recruiter/Hiring Manager** | Skim profile in 60 seconds                       | Reads hero + 3 projects, clicks Contact    |
| **Engineer Peer**          | Evaluate code quality, read blog posts            | Clicks GitHub link, reads full post        |
| **Future Me (Admin)**       | Add/edit projects and posts on-the-go             | Publish from phone in < 5 min              |

---

## 2. Technology Stack

### 2.1 Frontend

| Layer              | Technology                          | Why This Choice                                       |
| ------------------ | ----------------------------------- | ----------------------------------------------------- |
| Framework          | **Next.js 15** (App Router)         | SSR/SSG out of box, built-in image optimization, SEO |
| Language           | **TypeScript** (strict mode)        | Type-safe API responses, catches bugs early          |
| Styling            | **Tailwind CSS 4** + CSS variables  | Design tokens as utilities, tiny prod CSS             |
| UI Components      | **shadcn/ui** (copy-in components)  | Owned locally, built on Radix primitives (accessible) |
| Icons              | **Lucide**                          | Modern, tree-shakeable SVG icons                      |
| Markdown Rendering | **react-markdown** + **Shiki**       | Syntax highlighting, GitHub-flavored markdown (GFM)  |
| AI/LLM Integration | **ai SDK** + OpenAI-compatible API  | Streaming chat responses, type-safe                  |
| Form Validation    | **Zod** + schema inference          | Runtime validation, inferred TypeScript types         |
| Analytics          | **Microsoft Clarity** (free)        | Privacy-friendly, no third-party tracking            |
| Error Tracking     | **Sentry**                          | Real-time error monitoring and session replay         |

### 2.2 Backend

| Layer              | Technology                | Why This Choice                                  |
| ------------------ | ------------------------- | ------------------------------------------------ |
| Framework          | **Express 5** + TypeScript | Separate deployment from web, horizontally scalable |
| API Style          | **REST** (JSON)            | Stateless, versioned endpoints (`/api/v1/*`)    |
| Database           | **PostgreSQL 16**          | Relational, full-text search, Prisma-first-class |
| ORM/Migrations     | **Prisma**                 | Type-safe queries, auto-generated client         |
| Authentication     | **JWT** + HttpOnly cookies | Secure, no third-party auth for single admin     |
| Password Hashing   | **bcrypt** (cost ≥ 12)     | Industry standard, resistant to brute force      |
| Email Delivery     | **Resend**                 | Transactional emails, React Email templates      |
| File Storage       | **Cloudflare R2** (S3-API) | Free egress, S3-compatible, cheaper than S3     |
| Bot Protection     | **hCaptcha** + honeypot    | CAPTCHA validation + extra honeypot field        |
| Rate Limiting      | Custom middleware          | Per-endpoint, IP-based throttling                |

### 2.3 Build & DevOps

| Concern            | Technology          | Why This Choice                             |
| ------------------ | ------------------- | ------------------------------------------- |
| Monorepo           | **pnpm workspaces** | Fast, low-config, shared dependencies       |
| Build Orchestration| **Turborepo**        | Task caching, parallel builds, fast rebuild |
| Linting            | **ESLint** (flat config) | Modern config format, TypeScript support   |
| Formatting         | **Prettier**         | Opinionated, no bikeshedding                |
| Testing            | Vitest, Supertest, Playwright | Fast, native ESM, modern testing stack |
| Package Manager    | **pnpm** (≥ 9)       | Efficient, deterministic, disk-efficient   |
| CI                 | **GitHub Actions**   | Native to repo, no extra service            |
| Hosting            | **Self-Hosted VPS**  | Full control, no platform lock-in, ~$5-6/mo |
| Domain/DNS         | **Cloudflare**       | Free tier covers needs, CDN for static assets |
| Node Version       | **Node 22+**         | Latest LTS, better performance              |

---

## 3. Architecture

### 3.1 System Context Diagram

```
                      ┌──────────────────┐
                      │   End Users      │
                      │ (recruiters, eng) │
                      └────────┬─────────┘
                               │ HTTPS
                               ▼
   ┌──────────────────────────────────────────────────┐
   │          akkila.dev                              │
   │          Next.js (Self-Hosted)                   │
   │  ┌──────────────────┐  ┌────────────────────────┐│
   │  │ Public Pages     │  │ Admin Pages (auth)     ││
   │  │ SSG with ISR     │  │ /admin/*               ││
   │  └──────────────────┘  └────────────────────────┘│
   └──────────┬──────────────────────┬────────────────┘
              │ fetch (SSR + client) │
              ▼                      ▼
        ┌──────────────────────────────────────┐
        │     api.akkila.dev                   │
        │     Express + TypeScript             │
        │     (Self-Hosted)                    │
        └────┬────────────────┬────────────────┘
             │                │
             ▼                ▼
       ┌──────────┐    ┌──────────────┐
       │Postgres  │    │ Cloudflare R2│
       │ (Self)   │    │ (Media)      │
       └──────────┘    └──────────────┘
                             ▲
                             │
        ┌────────────────────┼────────────────┐
        │                    │                │
     ┌──▼──┐          ┌──────▼─────┐   ┌─────▼────┐
     │Resend     │hCaptcha    │Sentry  │
     │(email)    │(bot)       │(errors)│
     └──────┘          └────────────┘   └──────────┘
```

### 3.2 Components

**`apps/web`** — Next.js Frontend
- Public pages (projects, blog, landing) rendered via SSG with ISR
- Admin section (`/admin/*`) with auth-gated CRUD forms
- Reads from API for all dynamic content
- Serves static assets (CSS, images, fonts)

**`apps/api`** — Express Backend
- REST endpoints under `/api/v1/*`
- Owns Postgres via Prisma
- Owns side effects: email, image uploads, captcha validation
- Stateless and horizontally scalable

**`packages/db`** — Prisma Client + Schema + Migrations
- Imported by `apps/api` only
- Web app never talks to DB directly
- All queries flow through REST API

**`packages/shared`** — Shared Zod Schemas + Types
- Request/response shapes shared between web and API
- Imported by both `apps/web` and `apps/api`
- Single source of truth for validation schemas

### 3.3 Request Lifecycles

#### A. Public visitor reads a blog post (SSG + ISR)

1. Visitor requests `/blog/my-post`
2. Next.js serves pre-rendered HTML (no API call)
3. If cached > N minutes, Next revalidates in background
4. Background revalidation calls `GET /api/v1/posts/my-post`
5. API queries Postgres, returns JSON
6. Next persists new HTML; visitors see fresh content within seconds

#### B. Admin publishes a new post (write path)

1. Admin clicks "Publish" in `/admin/posts/123`
2. Browser sends `POST /api/v1/admin/posts/123/publish` with JWT cookie
3. API verifies cookie, checks role, updates Postgres
4. API issues revalidation webhook: `POST /api/revalidate?path=/blog/my-post`
5. Next.js re-renders just that page
6. Public visitors see new content within 5 seconds

#### C. Visitor submits contact form

1. Browser sends `POST /api/v1/contact` with form fields + CAPTCHA token
2. API validates body (Zod schema), verifies CAPTCHA, checks rate limit
3. Inserts into `contact_submissions` table
4. Sends email via Resend (fire-and-forget)
5. Returns 200 with success message

### 3.4 Authentication & Authorization

- **Passwords:** hashed with bcrypt (cost ≥ 12)
- **JWT:** issued on login, placed in `HttpOnly`, `Secure`, `SameSite=Lax` cookie
- **Scope:** cookie limited to API domain; web app forwards on same-site requests
- **TTL:** 7 days (no refresh token; single user, low risk)
- **Middleware:** all `/api/v1/admin/*` endpoints verify cookie, signature, expiry, role
- **Logout:** deletes cookie server-side (`Max-Age=0`)
- **CSRF:** form-encoded requests use double-submit token; JSON requests use `SameSite=Lax` + `X-Requested-With: fetch` header check

---

## 4. File Structure & Organization

### 4.1 Root Level

```
portfolio/
├── app/                          # Next.js app directory (pages, layouts)
│   ├── about/                    # /about page
│   ├── blog/                     # /blog listing
│   ├── project/                  # Dynamic project routes
│   ├── projects/                 # /projects listing
│   ├── recommendations/          # /recommendations page
│   ├── api/                      # API routes (deprecated, use Express)
│   ├── globals.css               # Tailwind + global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
│
├── components/                   # React components
│   ├── atoms/                    # Smallest UI units (Button, Input)
│   ├── molecules/                # Simple combinations (Form, Card)
│   ├── organisms/                # Complex sections (Header, Footer)
│   └── layouts/                  # Page layouts
│
├── hooks/                        # Custom React hooks
│   ├── useBodyScrollLock.ts      # Prevent body scroll
│   ├── useEscapeKey.ts           # Listen for Escape key
│   ├── useHighlightActiveSection.ts # TOC highlighting
│   ├── useMouseBackgroundEffect.ts  # Interactive background
│   └── useSaveShortcut.ts        # Cmd+S / Ctrl+S listener
│
├── lib/                          # Utilities & helpers
│   ├── api.ts                    # HTTP client (fetch wrapper)
│   ├── markdown.ts               # Markdown processing
│   ├── shiki.ts                  # Syntax highlighting config
│   ├── site.ts                   # Site metadata & constants
│   └── data/                     # Data loading/caching
│
├── services/                     # API client methods
│   ├── contact.ts                # POST /contact
│   ├── posts.ts                  # GET /posts
│   ├── projects.ts               # GET /projects
│   └── recommendations.ts        # GET /recommendations
│
├── types/                        # TypeScript definitions
│   └── svg.d.ts                  # SVG module types
│
├── utils/                        # Pure utility functions
│   ├── dateUtils.ts              # Date formatting
│   ├── nameUtils.ts              # Name parsing
│   └── shareUtils.ts             # Social share links
│
├── public/                       # Static assets
│   ├── projects/                 # Project images
│   └── site.webmanifest          # PWA manifest
│
├── docs/                         # Project documentation
│   ├── 00-PROCESS.md             # Development methodology
│   ├── 01-PRD.md                 # Product requirements
│   ├── 02-USER_STORIES.md        # Detailed requirements
│   ├── 03-TECH_STACK.md          # Tech choices & rationale
│   ├── 04-ARCHITECTURE.md        # System design
│   ├── 05-DATA_MODEL.md          # Database schema
│   ├── 06-API_SPEC.md            # API endpoints
│   ├── 08-ROADMAP.md             # Phased milestones
│   ├── adr/                      # Architecture decision records
│   └── future/                   # Post-v1 ideas
│
├── postman/                      # API test collections
│   ├── auth.postman_collection.json
│   ├── contact.postman_collection.json
│   ├── media.postman_collection.json
│   ├── posts.postman_collection.json
│   ├── projects.postman_collection.json
│   └── users.postman_collection.json
│
├── memory/                       # Session memory & notes
│   ├── MEMORY.md                 # Central notes
│   └── feedback_*.md             # Conversation feedback
│
├── .github/                      # GitHub workflows & templates
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript config
├── tailwind.config.js            # Tailwind CSS config
├── postcss.config.mjs            # PostCSS config
├── eslint.config.mjs             # ESLint flat config
├── package.json                  # Dependencies & scripts
├── pnpm-lock.yaml                # Dependency lock file
├── CHANGELOG.md                  # Version history
├── README.md                     # Project overview
├── CONTRIBUTING.md               # Contribution guidelines
└── PROJECT_SUMMARY.md            # This file
```

### 4.2 Key Files & Their Purposes

| File                      | Purpose                                              |
| ------------------------- | ---------------------------------------------------- |
| `package.json`            | Dependencies, scripts (dev, build, lint, typecheck) |
| `next.config.ts`          | Image optimization, bundle analyzer, Sentry config  |
| `tsconfig.json`           | TypeScript compiler options, path aliases (@/*)    |
| `tailwind.config.js`      | Tailwind CSS theme, plugins, color palette          |
| `eslint.config.mjs`       | Linting rules, Next.js plugin, TypeScript support   |
| `app/layout.tsx`          | Root HTML shell, meta tags, analytics script        |
| `app/page.tsx`            | Landing page (`/`)                                  |
| `lib/api.ts`              | HTTP client for fetching from Express API           |
| `lib/site.ts`             | Global site constants (domain, social links, etc.)  |
| `lib/markdown.ts`         | Markdown-to-React pipeline (remark + rehype)        |
| `services/*.ts`           | Typed API client methods (getProjects, getPosts)    |

---

## 5. Core Features

### 5.1 Public Features

| Feature                 | Route         | Description                                      |
| ----------------------- | ------------- | ------------------------------------------------ |
| **Landing**             | `/`           | Hero, intro, featured projects, recent posts    |
| **Projects Listing**    | `/projects`   | Filterable grid, search by tag                  |
| **Project Detail**      | `/projects/:slug` | Full description, tech stack, links, images    |
| **Blog Listing**        | `/blog`       | Post cards with excerpt, date, tags             |
| **Blog Post**           | `/blog/:slug` | Markdown with syntax highlighting, TOC, images  |
| **Recommendations**     | `/recommendations` | User-submitted endorsements (GitHub/LinkedIn) |
| **About**               | `/about`      | Long-form bio and background                    |
| **Contact Form**        | `/contact`    | Email, message, captcha, honeypot               |
| **LLM Chat**            | Embedded      | Ask AI questions about portfolio                |
| **RSS Feed**            | `/rss.xml`    | Blog posts feed                                 |
| **Sitemap**             | `/sitemap.xml` | SEO sitemap (projects, posts, pages)            |
| **Robots**              | `/robots.txt` | Search engine crawling rules                    |

### 5.2 Admin Features (Auth-Gated under `/admin`)

| Feature          | Route                        | Description                              |
| ---------------- | ---------------------------- | ---------------------------------------- |
| **Login**        | `/admin/login`               | Email + password (lockout after 5 fails) |
| **Dashboard**    | `/admin`                     | Overview of content stats                |
| **Projects CRUD**| `/admin/projects`            | List, create, edit, delete, publish     |
| **Posts CRUD**   | `/admin/posts`               | List, create, edit, delete with preview |
| **Image Upload** | Form in create/edit           | Upload to R2, get S3 URL                |
| **Logout**       | Menu action                  | Invalidate JWT cookie                   |
| **Settings**     | `/admin/settings` (future)    | Email, preferences, profile              |

### 5.3 LLM Chat (Embedded Feature)

- Accessible on every public page via floating button or sidebar
- Uses Vercel AI SDK with OpenAI-compatible API
- Streaming responses (type-safe)
- Rate-limited per IP
- Prompt-injection hardening (system context, output filtering)
- Offline fallback: "Chat unavailable, use contact form"
- Tracks usage for monitoring (LLM cost, performance)

---

## 6. Data Model

### 6.1 Core Entities (ER Diagram)

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  ┌──────────┐ ────────── M:N ──────────► ┌──────────┐         │
│  │ Project  │                            │   Tag    │         │
│  │          │ ◄─────────────────────────  │          │         │
│  │ id, slug │    ProjectTag               │ id, slug │         │
│  │ title    │    (junction)               │ label    │         │
│  │ desc_md  │                            └──────────┘         │
│  │ featured │                                  ▲               │
│  │published │                                  │ M:N          │
│  └──────────┘                                  │               │
│        ▲                                       │               │
│        │ 1:N                                   │               │
│        │                                       │               │
│  ┌─────┴────────┐                             │               │
│  │ ProjectImage │                             │               │
│  │ (url, alt)   │                             │               │
│  └──────────────┘                             │               │
│                                               │               │
│  ┌──────────┐ ────────── M:N ──────────────────┘               │
│  │   Post   │                                                  │
│  │          │ ◄─────────────────────────────────               │
│  │ id, slug │    PostTag                                       │
│  │ title    │    (junction)                                    │
│  │ content  │                                                  │
│  │published │                                                  │
│  │authorId  │ ────► ┌─────────┐                              │
│  └──────────┘       │  User   │                              │
│                     │ (admin) │                              │
│  ┌──────────────────┤         │                              │
│  │                  └─────────┘                              │
│  │                                                            │
│  ▼                                                            │
│  ┌───────────────────┐      ┌──────────────────────────┐     │
│  │ContactSubmission  │      │  RecommendationAuthor   │     │
│  │ (form data, ip)   │      │  (GitHub/LinkedIn data) │     │
│  └───────────────────┘      └──────────┬───────────────┘     │
│                                        │ 1:1                 │
│                             ┌──────────▼────────┐            │
│                             │ Recommendation    │            │
│                             │ (comment, status) │            │
│                             └───────────────────┘            │
│                                                                │
│  ┌────────────────────────┐                                   │
│  │  LLMChatLog            │                                   │
│  │ (prompt, response,     │                                   │
│  │  duration, model)      │                                   │
│  └────────────────────────┘                                   │
│                                                                │
│  ┌────────────────────────┐                                   │
│  │  AuditLog              │                                   │
│  │ (actor, action, entity)│                                   │
│  └────────────────────────┘                                   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 6.2 Key Tables

| Table                 | Purpose                              | Soft Delete? |
| --------------------- | ------------------------------------ | ------------ |
| `users`               | Admin user(s)                        | No           |
| `projects`            | Portfolio projects                   | Yes          |
| `project_images`      | Project photos (1:N relationship)    | No           |
| `posts`               | Blog posts                           | Yes          |
| `tags`                | Reusable tags for projects + posts   | No           |
| `project_tags`        | M:N junction (project ↔ tag)         | No           |
| `post_tags`           | M:N junction (post ↔ tag)            | No           |
| `contact_submissions` | Contact form submissions             | No           |
| `recommendations`     | User endorsements                    | No           |
| `recommendation_authors` | GitHub/LinkedIn author data         | No           |
| `llm_chat_logs`       | Chat usage & performance tracking    | No           |
| `audit_logs`          | Admin action history                 | No           |

---

## 7. API Specification

### 7.1 Conventions

- **Base URL:** `https://api.akkila.dev/api/v1`
- **Content-Type:** `application/json`
- **Auth:** JWT via `HttpOnly` cookie `pf_session` (admin endpoints)
- **CORS:** allowlisted to web origin per environment
- **Error Format:**
  ```json
  {
    "error": {
      "code": "VALIDATION_FAILED",
      "message": "Human-readable error",
      "fields": { "email": "Invalid format" }
    }
  }
  ```

### 7.2 Public Endpoints

| Method | Path                 | Purpose                              | Auth |
| ------ | -------------------- | ------------------------------------ | ---- |
| GET    | `/health`            | Liveness check                       | No   |
| GET    | `/projects`          | List published projects (paginated)  | No   |
| GET    | `/projects/:slug`    | Get one project detail               | No   |
| GET    | `/posts`             | List published posts (paginated)     | No   |
| GET    | `/posts/:slug`       | Get one post with markdown           | No   |
| GET    | `/tags`              | List all tags with counts            | No   |
| GET    | `/recommendations`   | List approved recommendations        | No   |
| POST   | `/contact`           | Submit contact form                  | No   |

### 7.3 Admin Endpoints (Auth Required)

| Method | Path                        | Purpose                      |
| ------ | --------------------------- | ---------------------------- |
| POST   | `/admin/auth/login`         | Issue JWT, return cookie     |
| POST   | `/admin/auth/logout`        | Invalidate cookie            |
| GET    | `/admin/projects`           | List all (published + draft) |
| POST   | `/admin/projects`           | Create new project           |
| PATCH  | `/admin/projects/:id`       | Update project               |
| DELETE | `/admin/projects/:id`       | Soft delete project          |
| POST   | `/admin/projects/:id/publish` | Toggle published flag        |
| GET    | `/admin/posts`              | List all (published + draft) |
| POST   | `/admin/posts`              | Create new post              |
| PATCH  | `/admin/posts/:id`          | Update post                  |
| DELETE | `/admin/posts/:id`          | Soft delete post             |
| POST   | `/admin/media/upload`       | Upload image to R2           |
| GET    | `/admin/dashboard`          | Stats (post count, etc.)     |

### 7.4 Response Pagination

Cursor-based pagination (not offset):

```
GET /projects?limit=20&cursor=eyJpZCI6IjEyMzQ1In0=

Response:
{
  "items": [{ project }, { project }, ...],
  "nextCursor": "eyJpZCI6IjU2Nzg5In0=" // or null if exhausted
}
```

---

## 8. Styling & Theme

### 8.1 Tailwind CSS

- **Framework:** Tailwind CSS 4 (latest)
- **CSS Variables:** Used for theming (light/dark mode)
- **Color Palette:** Custom tokens defined in `tailwind.config.js`
- **Responsive:** Mobile-first breakpoints (sm, md, lg, xl, 2xl)
- **Utilities:** Pure classes, no component-specific CSS

### 8.2 Dark/Light Mode

- Theme toggle in header/footer
- Preference stored in `localStorage` or system preference
- CSS variables update on toggle (no page reload)
- Example: `--color-bg-primary`, `--color-text-primary`

### 8.3 Typography

- **Fonts:** Sans (primary), Mono (code blocks)
- **Hierarchy:** 6 font sizes (sm → 2xl)
- **Line Height:** Carefully tuned for readability
- **Letter Spacing:** Optimized for body text and headings

---

## 9. Performance & SEO

### 9.1 Performance Targets (Per PRD)

- **LCP:** < 2.0s on landing page
- **TTI:** < 3.0s on 4G
- **JS Bundle:** < 150KB gzipped on landing
- **Lighthouse:** ≥ 99 on all four metrics
- **LLM Chat TTFT:** < 1.5s, ≥ 20 tokens/s throughput

### 9.2 Optimization Techniques

- **Next.js Image Optimization:** automatic AVIF/WebP, lazy loading
- **ISR (Incremental Static Regeneration):** blog posts regenerate when published
- **Code Splitting:** dynamic imports for admin, chat UI
- **Compression:** gzip/brotli via nginx
- **CDN Caching:** Cloudflare for static assets, DNS, R2 media
- **Font Optimization:** system fonts where possible, web fonts with `font-display: swap`

### 9.3 SEO

- **Server-Rendered:** All public pages via Next.js SSG + ISR
- **Meta Tags:** OpenGraph, Twitter cards, JSON-LD on every page
- **Structured Data:** `Person` schema on landing, `BlogPosting` on posts
- **Sitemap & Robots:** auto-generated, submitted to search engines
- **Canonical Tags:** prevent duplicate indexing
- **Heading Hierarchy:** H1 per page, proper H2-H6 nesting

---

## 10. Security & Privacy

### 10.1 Security Measures

| Concern           | Mitigation                                      |
| ----------------- | ----------------------------------------------- |
| SQL Injection      | Prisma parameterized queries                    |
| XSS                | React JSX auto-escaping + Content Security Policy |
| CSRF               | Double-submit token (forms) + SameSite cookie   |
| Brute Force        | Rate limiting + account lockout after 5 fails   |
| Session Hijacking  | HttpOnly, Secure, SameSite=Lax cookies          |
| Weak Passwords     | Enforce minimum length + complexity (TBD)      |
| Data Exposure      | All secrets via env variables (never committed) |
| Bot Attacks        | hCaptcha + honeypot field on contact form       |
| API Abuse          | Rate limiting on all public endpoints           |

### 10.2 Privacy

- **No third-party trackers** (Microsoft Clarity is privacy-friendly)
- **No Google Analytics** (would require cookie banner)
- **Contact submissions** retained 12 months, then deleted
- **LLM logs** stored for cost/performance, no personal data indexed
- **GDPR compliance** via privacy policy (TBD)

---

## 11. Development Workflow

### 11.1 Local Setup

```bash
# Install dependencies
pnpm install

# Start dev servers (Next.js + Express)
pnpm dev
  # Next.js: http://localhost:3000
  # API: http://localhost:4000

# Type check
pnpm typecheck

# Lint & format
pnpm lint
pnpm format

# Build for production
pnpm build

# Run tests
pnpm test
```

### 11.2 Scripts (from package.json)

| Script             | Purpose                                 |
| ------------------ | --------------------------------------- |
| `pnpm dev`         | Start dev servers (Next.js + Express)   |
| `pnpm build`       | Next.js build (export to standalone)    |
| `pnpm start`       | Run production build                    |
| `pnpm lint`        | Run ESLint                              |
| `pnpm typecheck`   | Run TypeScript compiler                 |

### 11.3 Project Methodology

See `docs/00-PROCESS.md` for the full methodology. In brief:

1. **Documentation First:** specs before code
2. **Iterative Design:** PRD → user stories → architecture → implementation
3. **Monorepo Structure:** separate packages for clean concerns
4. **Code Review:** peer feedback (if collaborating)
5. **Version Control:** conventional commits, auto-changelog

### 11.4 Branch Strategy

- `main` branch = production-ready
- `develop` branch = active development
- Feature branches: `feature/description` or `fix/description`
- PR required before merging to main

---

## 12. Deployment & Hosting

### 12.1 Current Setup

- **Web Server:** Self-hosted Next.js (`next start`) on VPS
- **API Server:** Self-hosted Express on same VPS
- **Database:** PostgreSQL on same VPS
- **Reverse Proxy:** nginx (HTTPS termination, routing)
- **Container:** Docker + Docker Compose for orchestration
- **Domain:** akkila.dev (Cloudflare DNS)
- **Media:** Cloudflare R2 (S3-compatible, free egress)

### 12.2 Environments

| Env        | Web URL                  | API URL                       | Purpose         |
| ---------- | ------------------------ | ----------------------------- | --------------- |
| local      | `http://localhost:3000`  | `http://localhost:4000`       | Dev on laptop   |
| staging    | `https://staging.akkila.dev` | `https://staging.api.akkila.dev` | QA, main branch |
| production | `https://akkila.dev`     | `https://api.akkila.dev`      | Public website  |

### 12.3 Deployment Process

1. **Push to main** with conventional commits
2. **GitHub Actions** triggers build + tests
3. **On success:** Docker image built and pushed to registry
4. **VPS** pulls latest image via deploy script
5. **Migrations** run automatically (pre-deploy hook)
6. **Services restart:** nginx reloads, Next.js restarts, API restarts
7. **ISR cache invalidation** triggered for changed content

### 12.4 Monitoring & Observability

- **Error Tracking:** Sentry (real-time alerts)
- **Logs:** Structured JSON to stdout (captured by Docker)
- **Uptime:** Ping monitoring (cron job)
- **Performance:** Lighthouse CI on each PR
- **Analytics:** Microsoft Clarity (session replay, heatmaps)
- **LLM Usage:** Custom dashboard for tokens, latency, cost

---

## 13. Cost Breakdown

### 13.1 Monthly Costs (Target ≤ $10)

| Service           | Cost       | Notes                                  |
| ----------------- | ---------- | -------------------------------------- |
| VPS (Linode, etc) | $5–6/mo    | 2GB RAM, 1 CPU (sufficient for current load) |
| Cloudflare        | Free       | DNS, R2 (free egress), free tier       |
| Resend (email)    | $20/mo     | Overestimate; very few transactional emails |
| hCaptcha          | Free       | Free tier sufficient                  |
| GlitchTip         | Free       | Self-hosted, error tracking             |
| Domain            | $12/yr     | ~$1/mo                                 |
| **TOTAL**         | **~$30/mo** | Lower with discounts, free tiers      |

---

## 14. Key Dependencies & Versions

### 14.1 Frontend

| Package              | Version    | Purpose                      |
| -------------------- | ---------- | ---------------------------- |
| next                 | 16.2.6     | Framework                   |
| react                | 19.2.4     | UI library                  |
| typescript           | ^5         | Language                    |
| tailwindcss          | 4          | Styling                     |
| @tailwindcss/postcss | ^4         | Tailwind PostCSS plugin      |
| zod                  | ^3.24.2    | Validation schemas           |
| react-markdown       | ^10.1.0    | Markdown rendering           |
| shiki                | ^4.1.0     | Syntax highlighting         |
| @sentry/nextjs       | ^10.56.0   | Error tracking              |
| ai                   | ^6.0.43    | LLM SDK (streaming)         |

### 14.2 Backend (Express)

Expected in `apps/api/package.json` (not shown here):

- `express`
- `prisma`
- `typescript`
- `nodemailer` (email)
- `bcrypt` (password hashing)
- `jsonwebtoken` (JWT)
- `zod` (validation, shared with web)

### 14.3 Dev Dependencies

| Package            | Version | Purpose                 |
| ------------------ | ------- | ----------------------- |
| eslint             | ^9.20.1 | Linting                 |
| @types/node        | ^22     | Node type definitions   |
| @types/react       | ^19     | React type definitions  |
| typescript         | ^5      | TypeScript compiler     |
| cross-env          | ^10.1.0 | Cross-platform env vars |
| @next/bundle-analyzer | ^16.2.6 | Bundle size analysis   |

---

## 15. Common Tasks & Commands

### 15.1 Content Management

```bash
# Add a new blog post
# 1. Create markdown file: lib/data/posts/my-post.md
# 2. Add metadata (front-matter)
# 3. Push to main; ISR regenerates `/blog` + `/blog/my-post`

# Add a new project
# 1. Use admin dashboard (`/admin/projects/new`)
# 2. Fill form, upload cover image
# 3. Publish; ISR regenerates `/projects`
```

### 15.2 Debugging

```bash
# Check Next.js issues
npm run build

# TypeScript errors
npm run typecheck

# ESLint violations
npm run lint

# Sentry errors
# Visit: https://sentry.io/organizations/akkila/issues/

# Database issues (Prisma Studio)
pnpm db:studio

# API logs (Docker)
docker logs portfolio-api
```

### 15.3 Database

```bash
# Create a migration
pnpm db:migrate:create --name add_users_table

# Run migrations
pnpm db:migrate:deploy

# Reset DB (dev only)
pnpm db:reset

# Introspect existing DB
pnpm db:introspect
```

---

## 16. Future Roadmap (Post-v1)

See `docs/08-ROADMAP.md` for detailed phased milestones. Highlights:

- **Phase 2:** Comments on blog posts (GitHub Discussions)
- **Phase 3:** Newsletter signup + email broadcasts
- **Phase 4:** Project case-study template
- **Phase 5:** "Now" page, webmentions, view counters
- **Phase 6:** Mobile app (React Native, Apollo backend)

---

## 17. Documentation Files

All decision-making documented in `docs/`:

| File                  | Contains                             |
| --------------------- | ------------------------------------ |
| `00-PROCESS.md`       | Project methodology & workflow       |
| `01-PRD.md`           | Product requirements & goals         |
| `02-USER_STORIES.md`  | Detailed user stories + acceptance   |
| `03-TECH_STACK.md`    | Tech choices & rationale             |
| `04-ARCHITECTURE.md`  | System design & request flows        |
| `05-DATA_MODEL.md`    | Database schema & relationships      |
| `06-API_SPEC.md`      | REST API endpoints & contracts       |
| `08-ROADMAP.md`       | Phased milestones & timeline         |
| `adr/`                | Architecture decision records        |
| `future/`             | Post-v1 ideas & explorations         |

---

## 18. Quick Reference

### 18.1 Important URLs (Production)

- **Public Site:** https://akkila.dev
- **Admin:** https://akkila.dev/admin/login
- **API Base:** https://api.akkila.dev/api/v1
- **Sentry Errors:** https://sentry.io/organizations/akkila/issues/
- **Cloudflare R2:** https://r2.akkila.dev (CDN)

### 18.2 Important URLs (Local)

- **Frontend:** http://localhost:3000
- **API:** http://localhost:4000
- **Prisma Studio:** http://localhost:5555

### 18.3 Key Contacts & Resources

- **VPS Provider:** [Linode, DigitalOcean, etc. — TBD]
- **Domain Registrar:** Cloudflare
- **Email Provider:** Resend
- **Error Tracking:** Sentry
- **Analytics:** Microsoft Clarity

---

## 19. Glossary

| Term  | Definition                                      |
| ----- | ----------------------------------------------- |
| ISR   | Incremental Static Regeneration (Next.js)       |
| SSR   | Server-side rendering                          |
| SSG   | Static site generation                         |
| JWT   | JSON Web Token (for auth)                       |
| CORS  | Cross-Origin Resource Sharing                  |
| ORM   | Object-Relational Mapping (Prisma)             |
| R2    | Cloudflare's S3-compatible object storage       |
| LCP   | Largest Contentful Paint (Core Web Vital)       |
| TTI   | Time to Interactive (performance metric)        |
| TTFT  | Time to First Token (LLM latency)               |

---

## 20. Final Notes

### 20.1 Contact & Support

- **Owner:** akkila
- **Email:** [contact via portfolio form]
- **GitHub:** [link in profile]
- **LinkedIn:** [link in profile]

### 20.2 License

MIT (see LICENSE file)

### 20.3 Last Updated

- **Date:** 2026-09-08
- **Version:** 1.0
- **Status:** Implementation Phase

---

**End of Summary**

For detailed implementation instructions, see the individual doc files under `docs/`.
