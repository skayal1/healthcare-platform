/*
  # Authentication Tables Setup

  1. New Tables
    - `users` table for storing user authentication data
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `users` table
    - Add policies for authenticated users to read their own data
*/

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create trigger to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO users (id, email)
  VALUES (new.id, new.email);

  INSERT INTO profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', (new.raw_user_meta_data->>'role')::user_role);

  IF (new.raw_user_meta_data->>'role')::user_role = 'doctor' THEN
    INSERT INTO doctors (id)
    VALUES (new.id);
  ELSIF (new.raw_user_meta_data->>'role')::user_role = 'patient' THEN
    INSERT INTO patients (id)
    VALUES (new.id);
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();