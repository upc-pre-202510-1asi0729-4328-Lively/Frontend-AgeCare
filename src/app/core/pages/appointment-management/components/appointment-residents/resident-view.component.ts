import { Component, Input } from '@angular/core';
import { Resident } from '../../../resident-care-management/model/resident.entity';
import { Appointment } from '../../model/appointment.entity';
import { ResidentService } from '../../../resident-care-management/services/resident.service';
import { AppointmentService } from '../../services/appointment.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-resident-view',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, ],
  templateUrl: './resident-view.component.html',
  styleUrls: ['./resident-view.component.css']
})
export class ResidentViewComponent {
  residentDniInput: string = '';
  resident: Resident | null = null;
  appointments: Appointment[] = [];
  notFound: boolean = false;

  constructor(
    private residentService: ResidentService,
    private appointmentService: AppointmentService
  ) {}

  searchResidentByDni() {
    const dni = this.residentDniInput.trim();
    if (!dni) return;

    this.residentService.searchByDni(dni).subscribe({
      next: (data) => {
        this.resident = data;
        this.notFound = false;

        this.appointmentService.getAppointmentsByResidentId(data.id).subscribe({
          next: (appointments) => {
            this.appointments = appointments;
          },
          error: () => {
            this.appointments = [];
          }
        });
      },
      error: () => {
        this.resident = null;
        this.appointments = [];
        this.notFound = true;
      }
    });
  }
}
