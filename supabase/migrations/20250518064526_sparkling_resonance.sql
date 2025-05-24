/*
  # Initial Schema Setup

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `full_name` (text)
      - `role` (enum: patient, doctor, admin)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `doctors`
      - `id` (uuid, primary key, references profiles)
      - `specialization` (text)
      - `experience_years` (integer)
      - `rating` (decimal)
      - `about` (text)
      - `consultation_fee` (decimal)
    - `patients`
      - `id` (uuid, primary key, references profiles)
      - `date_of_birth` (date)
      - `gender` (text)
      - `blood_group` (text)
      - `medical_history` (text)
    - `time_slots`
      - `id` (uuid, primary key)
      - `doctor_id` (uuid, references doctors)
      - `day_of_week` (integer)
      - `start_time` (time)
      - `end_time` (time)
      - `is_available` (boolean)
    - `appointments`
      - `id` (uuid, primary key)
      - `patient_id` (uuid, references patients)
      - `doctor_id` (uuid, references doctors)
      - `slot_id` (uuid, references time_slots)
      - `appointment_date` (date)
      - `status` (enum: scheduled, completed, cancelled)
      - `type` (enum: video, in_person)
      - `created_at` (timestamp)
    - `medicines`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `symptoms` (text[])
      - `dosage` (text)
      - `side_effects` (text[])
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users based on their roles
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('patient', 'doctor', 'admin');
CREATE TYPE appointment_status AS ENUM ('scheduled', 'completed', 'cancelled');
CREATE TYPE appointment_type AS ENUM ('video', 'in_person');

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text NOT NULL,
  role user_role NOT NULL DEFAULT 'patient',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create doctors table
CREATE TABLE doctors (
  id uuid PRIMARY KEY REFERENCES profiles ON DELETE CASCADE,
  specialization text NOT NULL,
  experience_years integer NOT NULL DEFAULT 0,
  rating decimal(3,2) DEFAULT 0.00,
  about text,
  consultation_fee decimal(10,2) NOT NULL DEFAULT 0.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create patients table
CREATE TABLE patients (
  id uuid PRIMARY KEY REFERENCES profiles ON DELETE CASCADE,
  date_of_birth date,
  gender text,
  blood_group text,
  medical_history text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create time_slots table
CREATE TABLE time_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid REFERENCES doctors ON DELETE CASCADE,
  day_of_week integer NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctors ON DELETE CASCADE,
  slot_id uuid REFERENCES time_slots ON DELETE CASCADE,
  appointment_date date NOT NULL,
  status appointment_status DEFAULT 'scheduled',
  type appointment_type DEFAULT 'video',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create medicines table
CREATE TABLE medicines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  symptoms text[],
  dosage text,
  side_effects text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Doctors policies
CREATE POLICY "Anyone can view doctors"
  ON doctors FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Doctors can update their own profile"
  ON doctors FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Patients policies
CREATE POLICY "Patients can view their own profile"
  ON patients FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Doctors can view their patients"
  ON patients FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM appointments 
      WHERE appointments.patient_id = patients.id 
      AND appointments.doctor_id = (SELECT id FROM doctors WHERE id = auth.uid())
    )
  );

-- Time slots policies
CREATE POLICY "Anyone can view available time slots"
  ON time_slots FOR SELECT
  TO authenticated
  USING (is_available = true);

CREATE POLICY "Doctors can manage their time slots"
  ON time_slots FOR ALL
  TO authenticated
  USING (doctor_id = auth.uid());

-- Appointments policies
CREATE POLICY "Users can view their appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (
    patient_id = auth.uid() OR 
    doctor_id = auth.uid()
  );

CREATE POLICY "Patients can create appointments"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = patient_id AND
    EXISTS (SELECT 1 FROM time_slots WHERE id = slot_id AND is_available = true)
  );

-- Medicines policies
CREATE POLICY "Anyone can view medicines"
  ON medicines FOR SELECT
  TO authenticated
  USING (true);

-- Create function to handle user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', (new.raw_user_meta_data->>'role')::user_role);

  IF (new.raw_user_meta_data->>'role')::user_role = 'doctor' THEN
    INSERT INTO doctors (id, specialization)
    VALUES (new.id, new.raw_user_meta_data->>'specialization');
  ELSIF (new.raw_user_meta_data->>'role')::user_role = 'patient' THEN
    INSERT INTO patients (id)
    VALUES (new.id);
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();