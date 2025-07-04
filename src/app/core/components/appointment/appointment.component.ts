import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Appointment } from '../../model/appointment.entity';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-appointment',
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  @Input() appointment!: Appointment;
  @Output() updateStatus = new EventEmitter<{id: string, status: Appointment['status']}>();
  @Output() delete = new EventEmitter<string>();

  onUpdateStatus(event: any) {
    if (typeof event === 'string') {
      this.updateStatus.emit({ id: this.appointment.id, status: event as Appointment['status'] });
    }
  }

  onDelete() {
    this.delete.emit(this.appointment.id);
  }
}

