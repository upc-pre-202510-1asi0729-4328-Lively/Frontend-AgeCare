import { Medication } from './medication.entity';
import {MedicalHistory} from './medicalHistory.entity';
import {MentalHealthRecord} from './mentalHealthRecord.entity';


export interface ResidentDetails {
  id: number;
  name: string;
  lastName: string;
  dni: string;
  medications: Medication[];
  medicalHistories: MedicalHistory[];
  mentalHealthRecords: MentalHealthRecord[];
}
