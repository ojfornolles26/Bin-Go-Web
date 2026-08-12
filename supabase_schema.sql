-- =========================================================================
-- Supabase SQL Script for Bin'Go Web CRUD Activity
-- Project URL: https://yzluyeoqifikpaogpdob.supabase.co
-- Instructions: Copy and paste this whole script into your Supabase SQL Editor
--               and click "Run".
-- =========================================================================

-- 1. Create the 'crud_tickets' table
CREATE TABLE IF NOT EXISTS public.crud_tickets (
    id TEXT PRIMARY KEY,
    location TEXT NOT NULL,
    barangay TEXT NOT NULL,
    reporter TEXT NOT NULL,
    urgency TEXT NOT NULL,
    status TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS) & allow full public access for CRUD testing
ALTER TABLE public.crud_tickets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public full access" ON public.crud_tickets;

CREATE POLICY "Allow public full access" ON public.crud_tickets
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- 3. Seed initial 3 test records
INSERT INTO public.crud_tickets (id, location, barangay, reporter, urgency, status, description)
VALUES 
    ('TKT-101', 'Osmeña Blvd', 'Capitol Site', 'Juan Cruz', 'High', 'Pending', 'Overflowing garbage bin near intersection.'),
    ('TKT-102', 'IT Park', 'Apas', 'Maria Santos', 'Low', 'Resolved', 'Litter scattered near park benches.'),
    ('TKT-103', 'Colon St', 'Parian', 'Pedro Reyes', 'Critical', 'In Progress', 'Illegal dumping site blocking sidewalk.')
ON CONFLICT (id) DO NOTHING;
