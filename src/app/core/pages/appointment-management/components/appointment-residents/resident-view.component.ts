import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentsService } from '../../../../services/appointments.service';
import { DoctorService } from '../../../user-management/services/doctor.service';
import { Appointment } from '../../../../model/appointment.entity';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-resident-view',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './resident-view.component.html',
  styleUrls: ['./resident-view.component.css']
})
export class ResidentViewComponent implements OnInit {

  constructor(private appointmentsService: AppointmentsService, private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentsService.getAll().subscribe(a => this.appointments = a);
  }


  searchResident: string = '';

  appointments: Appointment[] = [
    { id: '1', date: '2025-07-08', time: '09:30', resident: 'Carlos Martínez', doctor: 'Dra. López', status: 'completed' },
    { id: '2', date: '2025-07-10', time: '14:00', resident: 'Carlos Martínez', doctor: 'Dr. Fernández', status: 'pending' },
    { id: '3', date: '2025-07-11', time: '10:15', resident: 'Luis Rojas', doctor: 'Dra. Ruiz', status: 'pending' },
  ];


  get filteredAppointments(): Appointment[] {
    const query = this.searchResident.trim().toLowerCase();
    if (!query) return [];
    return this.appointments.filter(a =>
      a.resident.toLowerCase().includes(query)
    );
  }

}
