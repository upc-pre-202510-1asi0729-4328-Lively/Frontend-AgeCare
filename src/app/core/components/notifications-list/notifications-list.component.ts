import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../model/notification.model';
import { CommonModule } from '@angular/common';
import { NotificationFamilymemberComponent } from '../notification-familymember/notification-familymember.component';

@Component({
  selector: 'app-notifications-list',
  standalone: true,
  imports: [CommonModule, NotificationFamilymemberComponent],
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css']
})
export class NotificationsListComponent {
  @Input() notifications: Notification[] = [];
  @Output() deleteConfirmed = new EventEmitter<string>();
  @Output() updateStatus = new EventEmitter<{id: string, status: Notification['status']}>();

  filter: 'all' | 'unread' | 'read' | 'archived' = 'all';

  setFilter(f: 'all' | 'unread' | 'read' | 'archived') {
    this.filter = f;
  }

  get filteredNotifications() {
    const filtered = (() => {
      switch (this.filter) {
        case 'unread':
          return this.notifications.filter(n => n.status === 'unread');
        case 'read':
          return this.notifications.filter(n => n.status === 'READ');
        case 'archived':
          return this.notifications.filter(n => n.status === 'ARCHIVED');
        default:
          return this.notifications;
      }
    })();
    console.log(`Filtered notifications:`, filtered); // Debugging log
    return filtered;
  }

  onDeleteConfirmed(id: string) {
    this.deleteConfirmed.emit(id);
  }

  onUpdateStatus(event: {id: string, status: Notification['status']}) {
    this.updateStatus.emit(event);
  }
}
