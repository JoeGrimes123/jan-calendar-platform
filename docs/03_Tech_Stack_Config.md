⚙️ Tech Stack & Configuration

Use this file to instruct the AI Agent on which libraries to install and how to configure the environment.

📦 Dependencies to Install

Core Framework

next

react

react-dom

UI & Styling

tailwindcss

postcss

autoprefixer

clsx

tailwind-merge (for Shadcn)

lucide-react (Icons)

next-themes (Dark mode)

Backend & Data

@prisma/client

prisma (Dev dependency)

nylas (Calendar API SDK)

Authentication

next-auth@beta (Auth.js v5)

@auth/prisma-adapter

Forms & Validation

@conform-to/react

@conform-to/zod

zod

use-form-state (or React's built-in useActionState if on React 19/Next 15, but video uses standard hook patterns)

🔑 Environment Variables (.env)

Create a .env file with the following keys. Do not commit real values.

# --- Database (Supabase) ---
# Connect to Transaction Pooler (Port 6543)
DATABASE_URL="postgres://postgres.[project]:[password]@[aws-0-region.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1](https://aws-0-region.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1)"
# Connect to Direct Instance (Port 5432) - Used for Migrations
DIRECT_URL="postgres://postgres.[project]:[password]@[aws-0-region.supabase.com:5432/postgres](https://aws-0-region.supabase.com:5432/postgres)"

# --- Auth.js (NextAuth) ---
AUTH_SECRET="super-secret-random-string" # Generate with `npx auth secret`
AUTH_URL="http://localhost:3000" # or your deployment URL

# --- OAuth Providers ---
AUTH_GITHUB_ID="Get from GitHub Developer Settings"
AUTH_GITHUB_SECRET="Get from GitHub Developer Settings"

AUTH_GOOGLE_ID="Get from Google Cloud Console"
AUTH_GOOGLE_SECRET="Get from Google Cloud Console"

# --- Nylas (Calendar Integration) ---
NYLAS_API_SECRET_KEY="Get from Nylas Dashboard"
NYLAS_CLIENT_ID="Get from Nylas Dashboard"
NYLAS_API_URI="[https://api.us.nylas.com](https://api.us.nylas.com)" # Check region specific URI

# --- Public ---
NEXT_PUBLIC_URL="http://localhost:3000"


📂 Project Structure (Key Files)

app/
├── (site)/                 # Marketing/Landing pages
│   ├── layout.tsx
│   └── page.tsx
├── (auth)/                 # Auth routes layout group
│   ├── login/
│   └── onboarding/         # Username selection flow
├── dashboard/              # Protected Dashboard routes
│   ├── layout.tsx          # Sidebar + Topbar
│   ├── event-types/        # CRUD for events
│   ├── meetings/           # View booked meetings
│   ├── availability/       # Set working hours
│   └── settings/           # User profile settings
├── api/
│   ├── auth/               # NextAuth endpoints
│   ├── uploadthing/        # (Optional) Image upload
│   └── nylas/              # Webhook/OAuth handlers
├── [userName]/             # Dynamic Public Booking Page
│   └── [eventUrl]/         # Specific Event Booking Flow
├── components/
│   ├── ui/                 # Shadcn Components
│   ├── dashboard/          # Dashboard specific components
│   ├── booking/            # Calendar & Slot picker
│   └── SubmitButtons.tsx   # Reusable server-action buttons
├── lib/
│   ├── prisma.ts           # DB Client singleton
│   ├── nylas.ts            # Nylas Client singleton
│   └── hooks.ts            # Custom hooks
