import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgClass, NgFor, DatePipe } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../services/notification.service';

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
export class NotificationManagementComponent implements OnInit {
  @Output() createNotification = new EventEmitter<any>();
  @Input() stats: NotificationStats | null = null;
  notificationForm: FormGroup;

  constructor(private fb: FormBuilder, public translate: TranslateService, private notificationService: NotificationService) {
    this.notificationForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required] // Asegúrate de que 'content' es el nombre correcto
    });
  }

  ngOnInit() {}

  submit() {
    if (this.notificationForm.valid) {
      console.log('Submitting notification:', this.notificationForm.value);
      this.notificationService.create(this.notificationForm.value).subscribe({
        next: () => {
          console.log('Notification created successfully');
          this.createNotification.emit(this.notificationForm.value);
          this.notificationForm.reset();
        },
        error: (error) => {
          console.error('Error creating notification:', error);
        }
      });
    }
  }
}
