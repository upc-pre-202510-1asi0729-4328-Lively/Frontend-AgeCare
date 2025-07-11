import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../model/notification.model';

@Component({
  selector: 'app-notification-familymember',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './notification-familymember.component.html',
  styleUrls: ['./notification-familymember.component.css']
})
export class NotificationFamilymemberComponent implements OnInit {
  @Input() notification!: Notification;
  @Output() deleteConfirmed = new EventEmitter<string>();
  @Output() updateStatus = new EventEmitter<{id: string, status: Notification['status']}>();

  showConfirm: boolean = false;
  confirmAction: '' | 'read' | 'archive' | 'unarchive' | 'delete' = '';
  confirmId: string | null = null;
  notifications: Notification[] = [];

  constructor(private http: HttpClient, public translate: TranslateService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getAll().subscribe({
      next: (notifications) => this.notifications = notifications,
      error: (error) => console.error('Error loading notifications:', error)
    });
  }

  onMarkAsRead(id: string) {
    this.notificationService.markAsRead(id).subscribe(() => {
      const notification = this.notifications.find(n => n.id === id);
      if (notification) {
        notification.status = 'READ';
        this.updateStatus.emit({ id, status: 'READ' });
      }
    });
  }

  onArchive(id: string) {
    this.notificationService.archive(id).subscribe(() => {
      const notification = this.notifications.find(n => n.id === id);
      if (notification) {
        notification.status = 'ARCHIVED';
        this.updateStatus.emit({ id, status: 'ARCHIVED' });
      }
    });
  }

  onUnarchive(id: string) {
    this.notificationService.unarchive(id).subscribe(() => {
      const notification = this.notifications.find(n => n.id === id);
      if (notification) {
        notification.status = 'READ'; // Assuming it goes back to 'READ' after unarchiving
        this.updateStatus.emit({ id, status: 'READ' });
      }
    });
  }

  onDelete(id: string) {
    this.notificationService.delete(id).subscribe(() => {
      this.notifications = this.notifications.filter(n => n.id !== id);
      this.deleteConfirmed.emit(id);
    });
  }

  openConfirm(action: 'read' | 'archive' | 'unarchive' | 'delete', id: string) {
    this.confirmAction = action;
    this.confirmId = id;
    this.showConfirm = true;
  }

  confirmYes() {
    if (!this.confirmId) return;
    switch (this.confirmAction) {
      case 'read':
        this.onMarkAsRead(this.confirmId);
        break;
      case 'archive':
        this.onArchive(this.confirmId);
        break;
      case 'unarchive':
        this.onUnarchive(this.confirmId);
        break;
      case 'delete':
        this.onDelete(this.confirmId);
        break;
    }
    this.showConfirm = false;
    this.confirmId = null;
    this.confirmAction = '';
  }

  confirmNo() {
    this.showConfirm = false;
    this.confirmId = null;
    this.confirmAction = '';
  }

  getConfirmMessage(): string {
    switch (this.confirmAction) {
      case 'read':
        return 'notifications.confirmMarkAsRead';
      case 'archive':
        return 'notifications.confirmArchive';
      case 'unarchive':
        return 'notifications.confirmUnarchive';
      case 'delete':
        return 'notifications.confirmDelete';
      default:
        return '';
    }
  }
}
