# OppositeTalk UI

Production-ready responsive web application for **OppositeTalk**, a values-based social and relationship platform for adults serious about long-term relationships, marriage, family building, personal growth, financial responsibility, and shared lifestyle goals.

---

## Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & custom design tokens
- **State Management**:
  - **Server State**: TanStack Query (`@tanstack/react-query`)
  - **Global Client State**: Zustand (`useAuthStore`, `useEligibilityStore`, `useProfileWizardStore`, `useChatStore`)
- **Forms & Validation**: React Hook Form & Zod
- **Real-Time Communication**: SignalR client (`@microsoft/signalr`)
- **Icons**: Lucide React icons
- **Route Protection**: Next.js middleware with JWT session validation

---

## Application Structure

```
oppositetalk/
├── app/
│   ├── (public)/              # Landing, About, How It Works, Safety, Privacy, Terms
│   ├── (auth)/                # Login, Register, Verify, Forgot Password
│   ├── (onboarding)/          # One-question eligibility assessment, Eligibility result, 12-step Profile wizard, Verification
│   ├── (protected)/           # Discover, Profile detail, Matches, Messages (SignalR chat), Communities, Feed, Settings
│   ├── admin/                 # Admin Dashboard, Users, Eligibility rules/questions, Moderation, Reports, Analytics
│   ├── layout.tsx             # Root layout with QueryProvider & AuthProvider
│   ├── globals.css            # Custom CSS design system
│   ├── sitemap.ts             # SEO sitemap
│   └── robots.ts              # SEO robots configuration
├── components/
│   ├── layout/                # Navbar, Footer, AdminSidebar
│   ├── matching/              # MatchModal (Mutual match celebration)
│   ├── providers/             # AuthProvider, QueryProvider
│   ├── safety/                # ReportModal (Confidential reporting across all interaction points)
│   └── ui/                    # Button, Badge, ProgressBar, etc.
├── lib/
│   ├── apiClient.ts           # Typed REST API client with mock fallbacks
│   └── utils.ts               # Formatting and utility functions
├── schemas/                   # Zod schemas for Auth, Eligibility, Profile, Reports
├── services/                  # Typed services for API endpoints & SignalR hub manager
├── store/                     # Zustand stores for client state
├── types/                     # TypeScript definitions for all domain models
└── middleware.ts              # Next.js authentication & route protection middleware
```

---

## Key Features Implemented

1. **Mandatory Eligibility Flow**:
   - One-question-at-a-time interactive assessment with progress tracking and selectable option cards.
   - Dynamic question loading from backend service (`eligibilityService`).
   - Factual, non-judgmental feedback for disqualified responses.

2. **Multi-Step Profile Onboarding Wizard**:
   - 12-step guided setup covering basic info, education, profession, location, lifestyle, relationship goals, family vision, financial preferences, travel, interests, photos, and review.

3. **Discover & Matching**:
   - Desktop 3-column layout (Left: Filters, Center: Profile cards, Right: Algorithmic compatibility breakdown).
   - Express interest / like functionality with mutual match popup displaying shared values alignment.

4. **Real-Time SignalR Messaging**:
   - Live chat interface with typing indicators, read receipts, image attachments, blocking, and confidential reporting.

5. **Communities & Social Feed**:
   - Category-filtered community hub (Marriage, Family Life, Parenting, Finance, Career, Fitness, Travel) and social feed.

6. **Admin Control Hub**:
   - Governance dashboard for managing users, backend eligibility rules, question payloads, moderation reports, identity verification, and platform analytics.

---

## Development & Build Instructions

### Run Locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build Production Bundle:
```bash
npm run build
```
