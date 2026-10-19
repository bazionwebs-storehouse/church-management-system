# Church Onboarding Guide

Deploy this system for a **new church** in ~30 minutes, with zero code changes. Follow the steps in order.

## 0. Prerequisites

- GitHub account for the church (or use your deployment org)
- Supabase account (free tier works): https://supabase.com
- Clerk account (free tier works): https://clerk.com
- Node.js 20+ installed

## 1. Create the church's copy of this repo

```bash
# clone the template
git clone https://github.com/bazionwebs-storehouse/church-management-system.git <church-name>-cms
cd <church-name>-cms
npm install
```

Optionally push it to the church's own GitHub account, or keep this as the single repo.

## 2. Provision Supabase (database + auth RLS)

1. Create a new project on supabase.com.
2. Wait for the project to be ready, then get from **Project Settings → API**:
   - GraphQL URL → `https://<project-ref>.supabase.co/graphql/v1`
   - Anon key → `VITE_SUPABASE_ANON_KEY`
3. Run the SQL schema in the Supabase **SQL Editor** (in this order):
   - `supabase_schema.sql`
   - `supabase/migrations/*.sql` (oldest → newest)
   - `supabase_registration_logs.sql`

## 3. Configure Clerk (admin authentication)

1. Create a Clerk application for the church.
2. Copy the **Publishable Key** → `VITE_CLERK_PUBLISHABLE_KEY`.
3. Add Clerk as a third-party auth provider in Supabase (see Supabase → Auth → Third-Party → Clerk) and set the Supabase JWT template so admin roles are enforced server-side.

## 4. Fill in the branding environment file

```bash
cp docs/templates/env.church .env.local
```

Edit `.env.local` — at minimum set:

| Variable | Example |
| --- | --- |
| `VITE_CHURCH_NAME` | `Grace Community Church` |
| `VITE_APP_NAME` | `Grace Community Church Management` |
| `VITE_CHURCH_WEBSITE` | `https://gracecommunity.org` |
| `VITE_ORG_EMAIL_DOMAIN` | `gracecommunity.org` |
| `VITE_MEMBER_ID_PREFIX` | `GCC-` |
| `VITE_SMS_SENDER_ID` | `GRACE` |

See `.env.example` for the full variable reference.

## 5. Add the church logo

Two ways (either is fine):

- **File swap:** replace `public/church-logo.png` with the church's square logo (PNG, ~512px works best), or
- **No code-touch:** leave the default logo; an admin can upload the church logo later in **Settings → Church Info** (stored in the database), which overrides the file for all users.

## 6. Run it

```bash
npm run dev      # local development
npm test        # 90 automated checks
npm run build   # production bundle in dist/
```

## 7. Deploy

### GitHub Pages (easiest — wired up already)

1. Push the church repo to GitHub.
2. In the repo → **Settings → Pages → Source: GitHub Actions**.
3. Add repo **Secrets**: `VITE_SUPABASE_ANON_KEY`, `VITE_CLERK_PUBLISHABLE_KEY`
   and repo **Variables**: `VITE_SUPABASE_GRAPHQL_URL`, plus the branding vars (`VITE_CHURCH_NAME`, …).
4. Push to `master` — `.github/workflows/deploy.yml` builds, verifies and deploys automatically.

### Any other host (Vercel / Netlify / Cloudflare Pages)

- Build command: `npm run build`
- Output directory: `dist`
- Set the same environment variables in the host's dashboard.

## 8. First-run admin setup

1. Open the deployed app → register via the on-screen enterprise registration flow.
2. The first registered user elevates to **Super Admin** (enforced server-side).
3. Go to **Settings** and complete:
   - **Church Info** — name, address, phone, email, website + logo (synced to Supabase, visible to members)
   - **SMS Config** — Africa's Talking or Textbee credentials
   - **Email Config** — Resend API key + portal URL
   - **Email Aliases** — ImprovMX API key + church domain
   - **AI Configuration** — Gemini proxy URL (optional)

## 9. Update policy

The template repo (`bazionwebs-storehouse/church-management-system`) receives fixes and features. To update a deployed church:

```bash
git remote add template https://github.com/bazionwebs-storehouse/church-management-system.git
git fetch template
git merge template/master   # church-specific env/logo live in untracked files, so merges are conflict-free
```

Branding and configuration are intentionally kept **out of source code** so updates merge cleanly.
