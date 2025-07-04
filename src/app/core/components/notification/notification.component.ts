import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../model/notification.entity';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() notification!: Notification;
  @Output() markAsRead = new EventEmitter<string>();
  @Output() archive = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() updateStatus = new EventEmitter<{id: string, status: Notification['status']}>();

  onMarkAsRead() {
    this.markAsRead.emit(this.notification.id);
  }
  onArchive() {
    this.archive.emit(this.notification.id);
  }
  onDelete() {
    this.delete.emit(this.notification.id);
  }
  onUpdateStatus(event: any) {
    // Si el evento es un string, emitir el objeto correcto
    if (typeof event === 'string') {
      this.updateStatus.emit({ id: this.notification.id, status: event as Notification['status'] });
    }
  }
}
