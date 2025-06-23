import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../model/notification.entity';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-notifications-list',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css']
})
export class NotificationsListComponent {
  @Input() notifications: Notification[] = [];
  @Output() markAsRead = new EventEmitter<string>();
  @Output() archive = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() updateStatus = new EventEmitter<{id: string, status: Notification['status']}>();
}
