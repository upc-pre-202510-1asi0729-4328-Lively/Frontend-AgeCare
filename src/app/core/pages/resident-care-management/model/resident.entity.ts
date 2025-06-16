import { Medication } from './medication.entity';
import { MedicalHistory } from './medicalHistory.entity';
import { MentalHealthRecord } from './mentalHealthRecord.entity';

export interface Resident {
  id: number;
  dni: string;
  firstName: string;
  lastName: string;
  birthDate: Date | string;
  gender: 'Male' | 'Female' | 'Other';
  city: string;
  state: string;
  country: string;
  street: string;
  zipCode: string;
  receiptId: number;
  medications?: Medication[];
  medicalHistory?: MedicalHistory[];
  mentalHealthRecords?: MentalHealthRecord[];
}
