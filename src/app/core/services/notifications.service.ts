import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../model/notification.entity';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private apiUrl = 'http://localhost:3000/notifications';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl);
  }

  getUnread(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}?status=unread`);
  }

  getArchived(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}?status=archived`);
  }

  markAsRead(id: string): Observable<Notification> {
    return this.http.patch<Notification>(`${this.apiUrl}/${id}`, { status: 'read' });
  }

  archive(id: string): Observable<Notification> {
    return this.http.patch<Notification>(`${this.apiUrl}/${id}`, { status: 'archived' });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  create(notification: Omit<Notification, 'id' | 'createdAt'>): Observable<Notification> {
    const newNotification = {
      ...notification,
      createdAt: new Date(),
      status: 'unread',
    };
    return this.http.post<Notification>(this.apiUrl, newNotification);
  }

  updateStatus(id: string, status: Notification['status']): Observable<Notification> {
    return this.http.patch<Notification>(`${this.apiUrl}/${id}`, { status });
  }
}
