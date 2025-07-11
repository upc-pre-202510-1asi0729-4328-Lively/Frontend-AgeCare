import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../services/notifications.service';
import { Notification } from '../../../model/notification.entity';
import { NotificationsListComponent } from '../../../components/notifications-list/notifications-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NotificationManagementComponent } from '../../../components/notification-management/notification-management.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notifications-alerts-management',
  standalone: true,
  imports: [NotificationsListComponent, CommonModule, FormsModule, TranslateModule, NotificationManagementComponent],
  templateUrl: './notifications-alerts-management.component.html',
  styleUrls: ['./notifications-alerts-management.component.css']
})
export class NotificationsAlertsManagementComponent implements OnInit {
  notifications: Notification[] = [];
  existingNotificationIds: Set<string> = new Set(); // Track existing notification IDs
  filter: 'all' | 'unread' | 'read' | 'archived' = 'all';
  newNotification = {
    title: '',
    message: '',
    userId: 1,
    status: 'unread' as const
  };
  showConfirmDeleteId: string | null = null;
  pendingStatusChange: {id: string, status: Notification['status']} | null = null;
  view: 'all' | 'family' | 'management' = 'all';
  showSuccessModal: boolean = false;

  constructor(private notificationsService: NotificationsService, private translate: TranslateService, private route: ActivatedRoute) {
    if (!translate.currentLang || translate.currentLang !== 'en') {
      translate.setDefaultLang('en');
      translate.use('en');
    }
    this.route.data.subscribe(data => {
      if (data && data['view']) {
        this.view = data['view'];
      }
    });
  }

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    console.log(`Loading notifications with filter: ${this.filter}`); // Debugging log
    let request: Observable<Notification[]>;

    switch (this.filter) {
      case 'unread':
        request = this.notificationsService.filterByStatus('unread');
        break;
      case 'read':
        request = this.notificationsService.filterByStatus('READ');
        break;
      case 'archived':
        request = this.notificationsService.filterByStatus('ARCHIVED');
        break;
      default:
        request = this.notificationsService.getAll();
    }

    request.subscribe({
      next: (notifications: Notification[]) => {
        console.log(`Loaded notifications:`, notifications); // Debugging log
        this.notifications = notifications;
        this.existingNotificationIds = new Set(notifications.map(n => n.id)); // Update the set with current IDs
      },
      error: (error) => console.error('Error loading notifications:', error)
    });
  }

  setFilter(filter: 'all' | 'unread' | 'read' | 'archived') {
    console.log(`Setting filter to: ${filter}`); // Debugging log
    this.filter = filter;
    this.loadNotifications();
  }

  onMarkAsRead(id: string) {
    this.notificationsService.markAsRead(id).subscribe(() => {
      const notification = this.notifications.find(n => n.id === id);
      if (notification) {
        notification.status = 'READ';
      }
    });
  }

  onArchive(id: string) {
    this.notificationsService.archive(id).subscribe(() => {
      const notification = this.notifications.find(n => n.id === id);
      if (notification) {
        notification.status = 'ARCHIVED';
        this.loadNotifications(); // Reload notifications to reflect changes
      }
    });
  }

  onCreateNotification(notificationData: { title: string; content: string }) {
    const newId = 'some-unique-id'; // Generate or assign a unique ID for the new notification
    if (this.existingNotificationIds.has(newId)) {
      console.error('Notification with this ID already exists.');
      return;
    }

    this.notificationsService.create({
      id: newId,
      title: notificationData.title,
      content: notificationData.content,
      userId: this.newNotification.userId
    }).subscribe((newNotification: Notification) => {
      this.notifications.push(newNotification);
      this.existingNotificationIds.add(newNotification.id); // Add new ID to the set
      this.showSuccessModal = true;
    });
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  confirmDelete(id: string) {
    this.notificationsService.delete(id).subscribe(() => {
      this.notifications = this.notifications.filter(n => n.id !== id);
      this.existingNotificationIds.delete(id); // Remove ID from the set
    });
  }

  onUpdateStatus(event: {id: string, status: 'unread' | 'READ' | 'ARCHIVED'}) {
    if (event && typeof event === 'object' && 'id' in event && 'status' in event) {
      this.notificationsService.updateStatus(event.id, event.status).subscribe(() => this.loadNotifications());
    }
  }
}
