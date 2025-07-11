import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Notification } from '../model/notification.entity';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private apiUrl = `${environment.serverBasePath}${environment.notificationsEndpointPath}`;

  constructor(private http: HttpClient) {}

  // Métodos para consumir el API
  getAll(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getRead(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}?status=READ`);
  }

  getArchived(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}?status=ARCHIVED`).pipe(
      catchError(this.handleError)
    );
  }

  markAsRead(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/mark-as-read`, {}).pipe(
      catchError(this.handleError)
    );
  }

  archive(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/archive`, {}).pipe(
      catchError(this.handleError)
    );
  }

  unarchive(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/unarchive`, {}).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(notificationData: { id: string; title: string; content: string; userId: number }): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, notificationData).pipe(
      catchError(this.handleError)
    );
  }

  updateStatus(id: string, status: Notification['status']): Observable<Notification> {
    return this.http.patch<Notification>(`${this.apiUrl}/${id}`, { status })
      .pipe(
        catchError(this.handleError)
      );
  }

  getByUserId(userId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/user/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  filterByStatus(status: string): Observable<Notification[]> {
    const userId = 1; // Define un userId estático
    return this.http.get<Notification[]>(`${this.apiUrl}/search?status=${status}&userId=${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  getUnread(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}?status=unread`);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    return throwError(() => new Error('An error occurred; please try again later.'));
  }
}
