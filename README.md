# Premium Interactive Full-Stack Developer Portfolio (PERN)

A production-quality, highly interactive personal developer portfolio and case-study platform built with the **PERN Stack** (PostgreSQL, Express.js, React, Node.js + TypeScript). 

Inspired by **Smriti Rawat's award-winning portfolio** on *Wall of Portfolios*, featuring an interactive digital desk workspace, editorial typography, real-world case studies, and a complete admin management system.

---

## 🌟 Key Features

### 🖥️ Public Experience
1. **Interactive Workspace (Smriti Rawat Inspired)**:
   - **Desk Lamp**: Interactive toggle controlling ambient scene lighting and warm radial glow.
   - **Developer Laptop & Interactive CLI**: Functional terminal executing commands (`help`, `about`, `skills`, `projects`, `contact`, `matrix`, `sudo`).
   - **Studio Headphones**: Audio flow animation with live frequency visualizer bars.
   - **Ceramic Coffee Mug**: Hover and click interactions with steam particle physics.
   - **Leather Dev Journal**: Flip-open notes detailing architectural philosophies and data integrity.
   - **Polaroid Camera**: Interactive shutter with flash animation and milestone polaroid cards.
   - **Pinned Notes**: Core engineering principles and clean code practices.
2. **Editorial Hero & About Sections**:
   - Modern typographic scale, live badges ("Available for hire", "PERN Stack"), and academic journey timeline.
3. **Interactive Skills Matrix**:
   - Category filtering (Languages, Frontend, Backend, Databases, Tools), live search, and animated cards.
4. **Project Showcase & Case Studies**:
   - Featured deployments, technology filtering, live demo & GitHub repository buttons, and interactive case study breakdowns (Problem, Architecture Solution, Engineering Challenges).
5. **Experience & Education Timelines**:
   - Detailed roles, responsibilities, and achievements across engineering internships and academic milestones.
6. **Creative Technical Playground**:
   - Interactive SQL Schema & Join Query Sandbox.
   - Algorithm Sorting Execution Visualizer (comparison swaps with $O(n \log n)$ analysis).
7. **Technical Learning Journal (Blog)**:
   - Clean reading mode with estimated read times, category tags, and search.
8. **Resume Management System**:
   - Responsive embedded PDF viewer, direct download (`/api/resume/download`), and open-in-tab capabilities.
9. **Full-Stack Contact Form**:
   - Client-side & server-side validation (Zod), rate limiting, PostgreSQL message storage, and Resend transactional email notifications.
10. **Theme Switcher**:
    - Dark mode (obsidian & emerald/cyan glow) and Light mode (crisp editorial stone).

---

### 🛡️ Secure Admin Dashboard (`/admin`)
- **Protected by**: bcrypt password hashing, JWT authentication, and secure HTTP-only cookies.
- **Analytics Overview**: Real-time counters for page views, project views, resume downloads, and contact submissions.
- **Profile Management**: Update verified bio, name, title, contact details, and social links.
- **Projects CRUD**: Create, edit, delete, and feature projects with slug generation.
- **Message Inbox**: View submissions from the contact form, mark as READ/REPLIED, or delete.
- **Resume Upload & Replacement**: Upload official PDF documents, automatically replacing active files with instant availability.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Axios, React Hook Form, Zod, Canvas Confetti.
- **Backend**: Node.js, Express.js, TypeScript, RESTful API architecture, JWT authentication, bcryptjs, Multer, Helmet, CORS, express-rate-limit.
- **Database**: PostgreSQL with Prisma ORM (16 normalized relational models with strict constraints and cascade rules).
- **Email Service**: Resend API integration.
- **File Management**: Direct PDF streaming, MIME validation, and Multer file storage.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18+ (tested on v24.16.0)
- **PostgreSQL**: Local or remote instance (e.g. port 5432 or 5433)

### 2. Environment Configuration
Create or edit `.env` and `server/.env`:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://<USER>:<PASSWORD>@localhost:5432/portfolio_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Default Initial Admin Credentials
ADMIN_EMAIL="admin@portfolio.local"
ADMIN_DEFAULT_PASSWORD="Admin@Portfolio2026"

# Email Integration (Optional)
RESEND_API_KEY=""
SENDER_EMAIL="onboarding@resend.dev"
CLIENT_URL="http://localhost:5173"
```

### 3. Database Migration & Seed
```bash
# Push schema to PostgreSQL
cd server
npx prisma db push

# Seed initial verified content & admin account
npm run prisma:seed
```

### 4. Running Development
```bash
# Start backend API (http://localhost:5000)
npm run dev:server

# Start frontend (http://localhost:5173)
npm run dev:client
```

### 5. Running Production
```bash
# Build both client and server
npm run build:client
npm run build:server

# Start unified production server (serves API and React frontend on port 5000)
npm --prefix server start
```

---

## 🧪 Testing

Automated integration test suite using Node.js built-in runner:

```bash
cd server
npm test
```

Verifies:
- `GET /api/health` — Service health
- `GET /api/profile` — Profile structure
- `GET /api/resume` — Resume availability metadata
- `POST /api/contact` — Input validation & error responses

