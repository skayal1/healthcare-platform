export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  imageUrl?: string;
}

export interface Doctor extends User {
  specialization: string;
  experience: number;
  rating: number;
  availability: TimeSlot[];
  patients?: Patient[];
}

export interface Patient extends User {
  age: number;
  gender: string;
  medicalHistory?: string;
  appointments?: Appointment[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  dateTime: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'in-person' | 'video';
}

export interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Medicine {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  dosage: string;
  sideEffects: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  imageUrl: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}