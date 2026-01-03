# Africma’s & Dakeb Farm LTD - B2B Export Platform

A production-ready B2B export website built with Next.js, Supabase, and TailwindCSS.

## Features
- **Public**: Product Catalogue, RFQ Wizard, Blog, Realtime Updates.
- **Admin**: Dashboard, Product Management, CMS, RFQ Management.
- **Tech**: Next.js 14 (App Router), Supabase (Auth, Postgres, Realtime, Storage), shadcn/ui.

## Setup Instructions

### 1. Supabase Setup
1. Create a new Supabase project.
2. Go to SQL Editor and run the contents of `supabase/migrations/20240101000000_init.sql`.
3. Run `supabase/seed.sql` to populate initial data.
4. Enable Storage and ensure buckets (`product-images`, `spec-sheets`, etc.) are created (the migration attempts this, but check dashboard if it fails).
5. Go to Project Settings -> API to get URL and Keys.

### 2. Environment Variables
Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Local Development
```bash
npm install
npm run dev
```
The app will start on http://localhost:3002.

### 4. Admin Access
1. The seed script doesn't create an admin user (Auth users are separate).
2. Sign up a user in the Supabase Dashboard (Authentication -> Users).
3. Manually insert this user's email into the `admins` table in Supabase.
4. Go to `http://localhost:3002/admin/login` and sign in.

## Deployment
- Connect repository to Vercel.
- Add Environment Variables in Vercel.
- Deploy.

## Project Structure
- `app/(public)`: Public facing pages.
- `app/admin`: Admin dashboard (protected).
- `components`: Reusable UI components.
- `lib/supabase`: Supabase clients.

## License
Private Property of Africma’s & Dakeb Farm LTD.
