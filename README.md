# Church Management System

A white-label, comprehensive church management system built with React and TypeScript. Deployable for **any church** with minimal configuration — no code changes required.

## Features

- 📱 **Mobile Responsive** - Works perfectly on phones, tablets, and desktop
- 👥 **Member Management** - Track members, attendance, and groups
- 💰 **Financial Management** - Handle transactions and donations (tithe, offering, expenses)
- 👋 **Visitor Follow-up** - Capture and track visitors with SMS follow-up
- 📊 **Real-time Dashboard** - Live statistics and insights
- 🔐 **Secure Authentication** - Clerk-based auth with role-based access control
- 📱 **SMS Integration** - Africa's Talking / Textbee gateways with AI-assisted composing
- 📧 **Member Email Aliases** - Auto-provisioned `name@yourdomain.org` aliases (ImprovMX)
- 🌐 **Member Portal** - Self-service login, giving statements, avatar uploads
- 🤖 **AI Features** - Announcement, SMS and bulletin drafting (Gemini via proxy)
- 🖥️ **Desktop App** - Electron build for Windows/macOS/Linux
- 🏢 **Multi-branch Support** - Manage multiple church locations

## White-labeling (per-church customization)

All branding is driven by environment variables — defaults are generic and runnable with zero configuration.

| Variable | Purpose | Default |
| --- | --- | --- |
| `VITE_APP_NAME` | Browser tab title / document.title | `Church Management System` |
| `VITE_CHURCH_NAME` | Church name shown across app, portal, emails, PDFs | `Your Church` |
| `VITE_CHURCH_SHORT_NAME` | Short code used as a logo fallback | derived initials |
| `VITE_LOGO_PATH` | Logo file path (place your logo in `public/`) | `/church-logo.png` |
| `VITE_CHURCH_WEBSITE` | Public website link inside the member portal | (hidden) |
| `VITE_ORG_EMAIL_DOMAIN` | Domain for auto-generated member email aliases | `example.org` |
| `VITE_SMS_SENDER_ID` | Default SMS sender name | `CHMS` |
| `VITE_MEMBER_ID_PREFIX` | Member ID prefix (e.g. `ACC-` → `ACC-001`) | (none) |

To white-label for a specific church:

1. Copy this repository, or fork it.
2. Replace `public/church-logo.png` with the church logo (square PNG recommended), or point `VITE_LOGO_PATH` elsewhere.
3. Create a `.env.local` (copy `.env.example`) and set the branding variables above.
4. Point `VITE_SUPABASE_GRAPHQL_URL` / `VITE_SUPABASE_ANON_KEY` and `VITE_CLERK_PUBLISHABLE_KEY` to the church's Supabase + Clerk projects.
5. Admins can further adjust church info, SMS, email and alias settings at runtime in **Settings**.
6. Build and deploy (`npm run build`).

Internal identifiers (localStorage keys, IndexedDB names) are church-neutral and shared across deployments — only branding is configurable, keeping upgrades safe.

Internal identifiers (localStorage keys, IndexedDB names) are church-neutral and shared across deployments — only branding is configurable, keeping upgrades safe.

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Authentication**: Clerk (+ Supabase Row Level Security)
- **Database**: Supabase pg_graphql (GraphQL)
- **SMS Backend**: NestJS (`sms-backend/`, deployable to Fly.io)
- **Email**: Resend (proxy via Supabase Edge Function)
- **Desktop**: Electron + electron-builder
- **Tests**: Vitest + Testing Library

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure: copy `.env.example` → `.env.local` and fill in the required VITE_ keys
4. Start development server: `npm run dev`
5. Build for production: `npm run build`
6. Run tests: `npm test`

## Deployment

- **Static hosting** (Vercel/Netlify/GitHub Pages): `npm run build` → deploy `dist/`
- **Desktop**: `npm run electron:build`
- **SMS backend**: see `sms-backend/` (NestJS); set `VITE_SMS_BACKEND_URL` in the frontend

## License

MIT License - Feel free to use for your church or organization!
