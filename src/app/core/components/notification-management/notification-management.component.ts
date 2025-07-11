import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgClass, NgFor, DatePipe } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface NotificationStats {
  totalThisWeek: number;
  readPercent: number;
  unreadPercent: number;
  typeStats: { type: string; count: number; icon: string; color: string }[];
  lastNotifications: { title: string; recipient: string; type: string; date: string; status: string }[];
}

@Component({
  selector: 'app-notification-management',
  templateUrl: './notification-management.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  styleUrls: ['./notification-management.component.css']
})
export class NotificationManagementComponent {
  @Output() createNotification = new EventEmitter<any>();
  @Input() stats: NotificationStats | null = null;
  notificationForm: FormGroup;

  constructor(private fb: FormBuilder, public translate: TranslateService) {
    this.notificationForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  submit() {
    if (this.notificationForm.valid) {
      this.createNotification.emit(this.notificationForm.value);
      this.notificationForm.reset();
    }
  }
}
