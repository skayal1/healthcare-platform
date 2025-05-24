/*
  # Fix User Authentication Schema

  1. Changes
    - Add trigger to automatically create profile entries for new users
    - Add trigger to handle user role assignment
    - Update RLS policies for proper access control

  2. Security
    - Enable RLS on profiles table
    - Add policies for user access
*/

-- Create a trigger function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  profile_role user_role;
BEGIN
  -- Get the role from metadata, default to 'patient' if not specified
  profile_role := COALESCE(
    (NEW.raw_user_meta_data->>'role')::user_role,
    'patient'::user_role
  );

  -- Create the user profile
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    profile_role
  );

  -- If the user is a doctor, create a doctor profile
  IF profile_role = 'doctor' THEN
    INSERT INTO public.doctors (id, specialization, experience_years)
    VALUES (NEW.id, '', 0);
  -- If the user is a patient, create a patient profile
  ELSIF profile_role = 'patient' THEN
    INSERT INTO public.patients (id)
    VALUES (NEW.id);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update RLS policies for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow doctors to view patient profiles they have appointments with
CREATE POLICY "Doctors can view their patients' profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM appointments
      WHERE (appointments.patient_id = profiles.id)
      AND (appointments.doctor_id = auth.uid())
    )
  );