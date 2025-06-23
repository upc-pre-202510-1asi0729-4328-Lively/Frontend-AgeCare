import { FullName } from './full-name.model';
import { ContactInfo } from './contact-info.model';
import { Schedule } from './schedule.model';

export interface Doctor {
  id: number;
  licenseNumber: string;
  specialty: string;
  fullName: FullName;
  contactInfo: ContactInfo;
  schedules: Schedule[];
}
