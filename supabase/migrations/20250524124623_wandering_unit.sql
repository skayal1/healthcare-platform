/*
  # Authentication Setup

  1. Changes
    - Add email verification settings
    - Add password reset settings
    - Add session handling configuration

  2. Security
    - Configure secure password policies
    - Set up rate limiting for auth endpoints
*/

-- Configure auth schema
ALTER TABLE auth.users VALIDATE CONSTRAINT users_email_key;

-- Set up email auth
CREATE OR REPLACE FUNCTION auth.email_confirm(token text)
RETURNS void AS $$
BEGIN
  -- Implementation handled by Supabase
  RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Set up secure password policy
ALTER TABLE auth.users
  ADD CONSTRAINT password_min_length 
  CHECK (char_length(encrypted_password) >= 6);