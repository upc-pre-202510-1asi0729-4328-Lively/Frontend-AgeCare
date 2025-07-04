import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Notification } from '../model/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications: Notification[] = [
    {
      id: '1',
      title: 'Bienvenido',
      message: 'Tu cuenta ha sido creada.',
      createdAt: new Date(),
      status: 'unread',
      userId: 'user1'
    },
    {
      id: '2',
      title: 'Recordatorio',
      message: 'Tienes una cita mañana.',
      createdAt: new Date(),
      status: 'unread',
      userId: 'user1'
    },
    {
      id: '3',
      title: 'Actualización',
      message: 'Se ha actualizado tu perfil.',
      createdAt: new Date(),
      status: 'archived',
      userId: 'user1'
    }
  ];

  getAll(): Observable<Notification[]> {
    return of(this.notifications);
  }

  getUnread(): Observable<Notification[]> {
    return of(this.notifications.filter(n => n.status === 'unread'));
  }

  getArchived(): Observable<Notification[]> {
    return of(this.notifications.filter(n => n.status === 'archived'));
  }

  markAsRead(id: string): Observable<Notification | undefined> {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) notif.status = 'read';
    return of(notif);
  }

  archive(id: string): Observable<Notification | undefined> {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) notif.status = 'archived';
    return of(notif);
  }

  delete(id: string): Observable<boolean> {
    this.notifications = this.notifications.filter(n => n.id !== id);
    return of(true);
  }
}
