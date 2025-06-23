import {Medication} from './medication.entity';
import {MedicalHistory} from './medicalHistory.entity';
import {MentalHealthRecord} from './mentalHealthRecord.entity';

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
