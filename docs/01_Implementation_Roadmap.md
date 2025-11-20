📅 Cal Marshal - Implementation Roadmap
Goal: Build a full-stack scheduling platform (Calendly clone) using Next.js 14+, Nylas, Auth.js, and Supabase.
Reference: Jan Marshal YouTube Tutorial (Sep 2024)
🚀 Phase 1: Project Initialization & Infrastructure
1.1. Scaffolding
Action: Initialize Next.js project.
Command: npx create-next-app@latest cal-marshal --typescript --tailwind --eslint
Settings:
App Router: Yes
Src Directory: No (Root app/ folder preference as per video)
Import Alias: @/*
1.2. UI Library Setup (Shadcn UI)
Action: Initialize Shadcn UI.
Command: npx shadcn@latest init
Config:
Style: Default
Base Color: Slate
CSS Variables: Yes
Install Core Components:
npx shadcn@latest add button dialog input label separator dropdown-menu avatar calendar select switch card
1.3. Database Setup (Supabase & Prisma)
Action: Create a Supabase project.
Action: Initialize Prisma.
npm i -D prisma
npm i @prisma/client
npx prisma init
Crucial Configuration: Update DATABASE_URL to use Supabase connection pooling (pgbouncer=true&connection_limit=1).
🔐 Phase 2: Authentication & Onboarding
2.1. Auth.js (NextAuth) v5 Setup
Action: Install Auth.js.
npm install next-auth@beta
Providers: Configure GitHub and Google OAuth providers.
Adapter: Use Prisma Adapter to persist users to Supabase.
2.2. Onboarding Flow (/onboarding)
Logic:
Check if user has a userName in database.
If null, redirect to /onboarding.
If exists, redirect to /dashboard.
Form: Create a form to capture unique userName and fullName.
Validation: Use conform and zod to validate username uniqueness server-side.
📅 Phase 3: Nylas Integration (Calendar Engine)
3.1. Nylas SDK Setup
Action: Create Nylas account (V3 API).
Action: Configure Nylas Application in dashboard.
Install: npm install nylas
Route: Create api/oauth/exchange to handle calendar connecting.
3.2. Calendar Sync
Feature: Allow users to link their primary Google/Outlook calendar via Nylas within the dashboard settings.
Storage: Store the grantId and email from Nylas in the User model.
🛠 Phase 4: Dashboard & Event Types
4.1. Dashboard Layout
Structure: Sidebar navigation (Events, Meetings, Availability, Settings).
User Menu: Dropdown for logout/profile.
4.2. Event Types Management
CRUD Operations:
Create: Form to add new event (Title, URL Slug, Duration, Description, Video Provider).
Read: List all active event types on dashboard.
Update: Edit existing event details.
Delete: Soft delete or hard delete event types.
Video Providers: Zoom, Google Meet, Microsoft Teams (handled via Nylas or static links).
4.3. Settings Page
Profile: Update name, profile image (UploadThing or static URL).
Theme: Dark/Light mode toggle.
🗓 Phase 5: Availability & Booking Logic
5.1. Availability Settings
Feature: User defines working hours (e.g., 9:00 AM - 5:00 PM) and working days.
Logic: Store this in Availability model related to User.
5.2. Public Booking Page (/{userName}/{eventUrl})
View: Fetch user and event details based on URL params.
Calendar Component: Render a calendar allowing visitors to pick a date.
Time Slots:
On date select, fetch "Free/Busy" status from Nylas API.
Filter slots against User's defined Availability working hours.
Show only available slots.
5.3. Booking Action
Action: When a visitor books a slot:
Create Event in User's Calendar via Nylas API.
Send confirmation emails (handled automatically by Nylas or manual email service).
Redirect visitor to a "Success" page.
🎨 Phase 6: Polish & Deployment
6.1. Landing Page
Components: Hero section, Features grid, CTA.
Navbar: Login/Get Started buttons.
6.2. Deployment
Platform: Vercel.
Env: Configure all environment variables in Vercel dashboard.
Build: Ensure npx prisma generate runs during build.
