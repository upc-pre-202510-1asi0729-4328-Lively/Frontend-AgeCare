import { Component, OnInit } from '@angular/core';
import { Resident } from '../../../resident-care-management/model/resident.entity';
import { Appointment } from '../../model/appointment.entity';
import { ResidentService } from '../../../resident-care-management/services/resident.service';
import { AppointmentService } from '../../services/appointment.service';
import { DoctorService } from '../../../user-management/services/doctor.service';
import { Doctor } from '../../../user-management/model/doctor.model'; 

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-resident-view',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './resident-view.component.html',
  styleUrls: ['./resident-view.component.css']
})
export class ResidentViewComponent implements OnInit {
  residentDniInput: string = '';
  residentId: number | null = null;
  resident: Resident | null = null;
  appointments: Appointment[] = [];
  notFound: boolean = false;
  doctorNames: Map<number, string> = new Map();

  constructor(
    private residentService: ResidentService,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.loadAllAppointments();
  }

  loadAllAppointments(): void {
  this.appointmentService.getAll().subscribe({
    next: (appointmentsData) => {
      this.appointments = appointmentsData;

      appointmentsData.forEach(appt => {
        const docId = appt.doctorId;

        if (!this.doctorNames.has(docId)) {
          this.doctorService.getDoctorById(docId).subscribe({
            next: (doctor: Doctor) => {
              const name = `${doctor.fullName.firstName} ${doctor.fullName.lastName}`;
              this.doctorNames.set(docId, name);
            },
            error: () => {
              this.doctorNames.set(docId, 'Desconocido');
            }
          });
        }
      });
    },
    error: (err) => {
      console.error('Error al cargar todas las citas:', err);
      this.appointments = [];
    }
  });
}


  searchResidentByDni(): void {
    const dni = this.residentDniInput.trim();
    if (!dni) return;

    this.residentService.searchByDni(dni).subscribe({
      next: (residentData) => {
        this.resident = residentData;
        this.residentId = residentData.id;
        this.notFound = false;
      },
      error: () => {
        this.resident = null;
        this.residentId = null;
        this.notFound = true;
      }
    });
  }

  filteredAppointments(): Appointment[] {
    if (!this.residentId) return [];
    return this.appointments.filter(a => a.residentId === this.residentId);
  }

}
