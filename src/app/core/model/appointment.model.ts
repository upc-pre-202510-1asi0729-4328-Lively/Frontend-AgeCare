export interface Appointment {
  id: string;
  date: string;
  time: string;
  resident: string;
  doctor: string;
  status: 'pending' | 'completed';
}
