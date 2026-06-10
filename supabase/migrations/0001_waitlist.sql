-- Create sequence for waitlist positions
CREATE SEQUENCE IF NOT EXISTS waitlist_position_seq START 1;

-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email citext UNIQUE NOT NULL,
  position integer UNIQUE NOT NULL DEFAULT nextval('waitlist_position_seq'),
  created_at timestamptz NOT NULL DEFAULT now(),
  referrer text,
  user_agent text,
  ip_hash text
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist (created_at);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist (email);

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Deny all access to anon role
CREATE POLICY "Deny anon access to waitlist" ON waitlist
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- Allow authenticated service role to do everything (handled by service role key)
CREATE POLICY "Service role full access to waitlist" ON waitlist
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
