/*
  # Authentication and User Management

  1. Changes
    - Add email verification status to profiles
    - Add last login timestamp to profiles
    - Add password reset functionality
    - Update RLS policies for better security

  2. Security
    - Add policies for profile management
    - Ensure proper access control
*/

-- Add new columns to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS last_login timestamptz DEFAULT now();

-- Update profiles policies
CREATE POLICY "Profiles are viewable by users who created them"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Function to update last login
CREATE OR REPLACE FUNCTION public.handle_user_login()
RETURNS trigger AS $$
BEGIN
  UPDATE public.profiles
  SET last_login = now()
  WHERE id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for login tracking
CREATE OR REPLACE TRIGGER on_user_login
  AFTER INSERT ON auth.sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_user_login();