export interface Resident {
  id: number;
  dni: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'Male' | 'Female' | 'Other';

  medications?: Medication[];
  medicalHistory?: MedicalHistory[];
  mentalHealthRecords?: MentalHealthRecord[];
}
