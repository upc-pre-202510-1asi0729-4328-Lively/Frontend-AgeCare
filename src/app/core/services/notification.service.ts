import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Notification } from '../model/notification.model';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private apiUrl = `${environment.serverBasePath}${environment.notificationsEndpointPath}`;
  private staticUserId: number = 1; // Inicializar userId en 1

  constructor(private http: HttpClient) {}

  create(notificationData: { title: string; content: string }): Observable<Notification> {
    console.log('Creating notification:', notificationData);
    const payload = {
      ...notificationData,
      userId: this.staticUserId, // Automatically include userId
      status: 'unread' // Default status
    };

    return this.http.post<Notification>(this.apiUrl, payload).pipe(
      catchError(this.handleError)
    );
  }

  getAll(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}?userId=${this.staticUserId}`).pipe(
      catchError(this.handleError)
    );
  }

  getByUserId(userId: number = this.staticUserId): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/user/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  filterByStatus(status: 'unread' | 'READ' | 'ARCHIVED'): Observable<Notification[]> {
    const url = `${this.apiUrl}/search?status=${status}`;
    return this.http.get<Notification[]>(url).pipe(
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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }
    return throwError(() => new Error('An error occurred; please try again later.'));
  }
}
