import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Appointment } from '../../model/appointment.entity';
import { CommonModule } from '@angular/common';
import { AppointmentComponent } from '../appointment/appointment.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-list-appointments',
  standalone: true,
  imports: [CommonModule, AppointmentComponent,TranslateModule],
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class ListAppointmentsComponent {
  @Input() appointments: Appointment[] = [];
  @Output() updateStatus = new EventEmitter<{ id: string; status: Appointment['status'] }>();
  @Output() delete = new EventEmitter<string>();
}
