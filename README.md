# Base44 Preview Template for MicroVM sandbox

This template is used by the server to preview user-apps.

## user files
server creates the user-app files in the __components__, __pages__ folders

## server injected data
server injects app related data to __app.config.js__, which is used by App.jsx to render the components in the files.

## Supabase Waitlist Setup

The waitlist functionality uses Supabase to store email addresses. To set this up:

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings: https://app.supabase.com/project/_/settings/api

### 2. Database Schema

Run the following SQL in your Supabase SQL Editor to create the waitlist table:

```sql
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_waitlist_email ON waitlist(email);
```

### 3. Row Level Security (RLS)

Enable RLS and create policies to allow public inserts and selects:

```sql
-- Enable RLS on the table
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public inserts" ON waitlist;
DROP POLICY IF EXISTS "Allow public selects" ON waitlist;

-- Create policy to allow anonymous users to insert emails
CREATE POLICY "Allow public inserts" ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow anonymous users to select their own inserted rows
CREATE POLICY "Allow public selects" ON waitlist
  FOR SELECT
  TO anon, authenticated
  USING (true);
```

**Important Notes:**
- The `anon` role is used when accessing Supabase with the anon key (which is what the frontend uses)
- The `authenticated` role is for logged-in users (if you add auth later)
- The SELECT policy is needed because the code uses `.select()` after insert to get the inserted data
- If you still get RLS errors after running this, check that no conflicting policies exist

**Troubleshooting:**
If you still see RLS errors, run this to check existing policies:
```sql
SELECT * FROM pg_policies WHERE tablename = 'waitlist';
```

To see all policies and remove any conflicting ones:
```sql
-- List all policies on waitlist table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'waitlist';

-- If you see conflicting policies, drop them:
-- DROP POLICY "policy_name" ON waitlist;
```
