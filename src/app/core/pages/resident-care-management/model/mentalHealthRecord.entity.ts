export interface MentalHealthRecord {
  id: number;
  residentId: number;  // <-- Agregado
  recordDate: Date;
  diagnosis: string;
  treatment: string;
}
