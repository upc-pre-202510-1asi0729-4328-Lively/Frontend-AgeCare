import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../services/notifications.service';
import { Notification } from '../../../model/notification.entity';
import { NotificationsListComponent } from '../../../components/notifications-list/notifications-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import {
  NotificationManagementComponent
} from '../../../components/notification-management/notification-management.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notifications-alerts-management',
  standalone: true,
  imports: [NotificationsListComponent, CommonModule, FormsModule, TranslateModule, NotificationManagementComponent],
  templateUrl: './notifications-alerts-management.component.html',
  styleUrls: ['./notifications-alerts-management.component.css']
})
export class NotificationsAlertsManagementComponent implements OnInit {
  notifications: Notification[] = [];
  filter: 'all' | 'unread' | 'read' | 'archived' = 'all';
  newNotification = {
    title: '',
    message: '',
    userId: 'user1',
    status: 'unread' as const
  };
  showConfirmDeleteId: string | null = null;
  pendingStatusChange: {id: string, status: Notification['status']} | null = null;
  view: 'all' | 'family' | 'management' = 'all';
  showSuccessModal: boolean = false;



  constructor(private notificationsService: NotificationsService, private translate: TranslateService, private route: ActivatedRoute) {
    // Forzar idioma por defecto a inglés solo para este componente
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
    if (this.filter === 'all') {
      this.notificationsService.getAll().subscribe((n: Notification[]) => this.notifications = n);
    } else if (this.filter === 'unread') {
      this.notificationsService.getUnread().subscribe((n: Notification[]) => this.notifications = n);
    } else if (this.filter === 'read') {
      this.notificationsService.getRead().subscribe((n: Notification[]) => this.notifications = n);
    } else if (this.filter === 'archived') {
      this.notificationsService.getArchived().subscribe((n: Notification[]) => this.notifications = n);
    }
  }

  setFilter(filter: 'all' | 'unread' | 'read' | 'archived') {
    this.filter = filter;
    this.loadNotifications();
  }

  onMarkAsRead(id: string) {
    this.notificationsService.markAsRead(id).subscribe(() => this.loadNotifications());
  }

  onArchive(id: string) {
    this.notificationsService.archive(id).subscribe(() => this.loadNotifications());
  }

  onCreateNotification(notificationData: { title: string; message: string }) {
    if (!notificationData.title.trim() || !notificationData.message.trim()) return;
    this.notificationsService.create({
      title: notificationData.title,
      message: notificationData.message,
      userId: 'user1',
      status: 'unread'
    }).subscribe(() => {
      this.loadNotifications();
      this.showSuccessModal = true;
    });
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  confirmDelete(id: string) {
    this.notificationsService.delete(id).subscribe(() => {
      // Eliminar la notificación del array local sin recargar toda la lista
      this.notifications = this.notifications.filter(n => n.id !== id);
    });
  }

  onUpdateStatus(event: {id: string, status: import('../../../model/notification.model').Notification['status']}) {
    if (event && typeof event === 'object' && 'id' in event && 'status' in event) {
      this.notificationsService.updateStatus(event.id, event.status).subscribe(() => this.loadNotifications());
    }
  }
}
