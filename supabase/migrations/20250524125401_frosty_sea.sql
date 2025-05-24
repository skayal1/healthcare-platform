/*
  # Fix User Registration

  1. Changes
    - Remove direct auth table modifications
    - Add proper profile creation handling
    - Update trigger function for new users

  2. Security
    - Maintain existing RLS policies
    - Ensure proper role assignment
*/

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Create or replace the handle_new_user function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (
    id,
    full_name,
    role
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'patient'::user_role)
  );

  -- Create role-specific entry
  IF (NEW.raw_user_meta_data->>'role')::user_role = 'doctor' THEN
    INSERT INTO public.doctors (
      id,
      specialization,
      experience_years
    ) VALUES (
      NEW.id,
      '',
      0
    );
  ELSIF (NEW.raw_user_meta_data->>'role')::user_role = 'patient' THEN
    INSERT INTO public.patients (
      id
    ) VALUES (
      NEW.id
    );
  END IF;

  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();