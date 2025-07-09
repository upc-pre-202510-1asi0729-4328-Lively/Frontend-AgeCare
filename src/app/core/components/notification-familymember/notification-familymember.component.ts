import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Notification } from '../../model/notification.model';

@Component({
  selector: 'app-notification-familymember',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './notification-familymember.component.html',
  styleUrls: ['./notification-familymember.component.css']
})
export class NotificationFamilymemberComponent {
  @Input() notification!: Notification;
  @Output() deleteConfirmed = new EventEmitter<string>();
  @Output() updateStatus = new EventEmitter<{id: string, status: Notification['status']}>();

  showConfirm: boolean = false;
  confirmAction: '' | 'read' | 'archive' | 'unarchive' | 'delete' = '';
  confirmId: string | null = null;

  constructor(private http: HttpClient, public translate: TranslateService) {}

  onMarkAsRead(id: string) {
    this.http.patch(`http://localhost:3000/notifications/${id}`, { status: 'read' }).subscribe(() => {
      this.updateStatus.emit({ id, status: 'read' });
    });
  }

  onArchive(id: string) {
    this.http.patch(`http://localhost:3000/notifications/${id}`, { status: 'archived' }).subscribe(() => {
      this.updateStatus.emit({ id, status: 'archived' });
    });
  }

  onUnarchive(id: string) {
    this.http.patch(`http://localhost:3000/notifications/${id}`, { status: 'read' }).subscribe(() => {
      this.updateStatus.emit({ id, status: 'read' });
    });
  }

  onDelete(id: string) {
    this.http.delete(`http://localhost:3000/notifications/${id}`).subscribe(() => {
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
