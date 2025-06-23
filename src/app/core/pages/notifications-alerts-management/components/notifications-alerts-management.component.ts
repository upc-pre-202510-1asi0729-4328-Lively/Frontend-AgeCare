import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../services/notifications.service';
import { Notification } from '../../../model/notification.entity';
import { NotificationsListComponent } from '../../../components/notifications-list/notifications-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notifications-alerts-management',
  standalone: true,
  imports: [NotificationsListComponent, CommonModule, FormsModule, TranslateModule],
  templateUrl: './notifications-alerts-management.component.html',
  styleUrls: ['./notifications-alerts-management.component.css']
})
export class NotificationsAlertsManagementComponent implements OnInit {
  notifications: Notification[] = [];
  filter: 'all' | 'unread' | 'archived' = 'all';
  newNotification = {
    title: '',
    message: '',
    userId: 'user1',
    status: 'unread' as const
  };
  showConfirmDeleteId: string | null = null;
  pendingStatusChange: {id: string, status: Notification['status']} | null = null;

  constructor(private notificationsService: NotificationsService, private translate: TranslateService) {
    // Forzar idioma por defecto a inglés solo para este componente
    if (!translate.currentLang || translate.currentLang !== 'en') {
      translate.setDefaultLang('en');
      translate.use('en');
    }
  }

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    if (this.filter === 'all') {
      this.notificationsService.getAll().subscribe((n: Notification[]) => this.notifications = n);
    } else if (this.filter === 'unread') {
      this.notificationsService.getUnread().subscribe((n: Notification[]) => this.notifications = n);
    } else if (this.filter === 'archived') {
      this.notificationsService.getArchived().subscribe((n: Notification[]) => this.notifications = n);
    }
  }

  setFilter(filter: 'all' | 'unread' | 'archived') {
    this.filter = filter;
    this.loadNotifications();
  }

  onMarkAsRead(id: string) {
    this.notificationsService.markAsRead(id).subscribe(() => this.loadNotifications());
  }

  onArchive(id: string) {
    this.notificationsService.archive(id).subscribe(() => this.loadNotifications());
  }

  onCreateNotification() {
    if (!this.newNotification.title.trim() || !this.newNotification.message.trim()) return;
    this.notificationsService.create({
      title: this.newNotification.title,
      message: this.newNotification.message,
      userId: this.newNotification.userId,
      status: 'unread'
    }).subscribe(() => {
      this.newNotification = { title: '', message: '', userId: 'user1', status: 'unread' };
      this.loadNotifications();
    });
  }

  confirmDelete(id: string) {
    this.showConfirmDeleteId = id;
  }

  cancelDelete() {
    this.showConfirmDeleteId = null;
  }

  onDelete(id: string) {
    if (this.showConfirmDeleteId === id) {
      this.notificationsService.delete(id).subscribe(() => {
        this.showConfirmDeleteId = null;
        this.loadNotifications();
      });
    } else {
      this.confirmDelete(id);
    }
  }

  onUpdateStatus(event: {id: string, status: Notification['status']}) {
    // Solo aceptar el objeto correcto
    if (event && typeof event === 'object' && 'id' in event && 'status' in event) {
      this.pendingStatusChange = event;
    }
  }

  confirmStatusChange() {
    if (!this.pendingStatusChange) return;
    const { id, status } = this.pendingStatusChange;
    this.notificationsService.updateStatus(id, status).subscribe(() => this.loadNotifications());
    this.pendingStatusChange = null;
  }

  cancelStatusChange() {
    this.pendingStatusChange = null;
  }
}
