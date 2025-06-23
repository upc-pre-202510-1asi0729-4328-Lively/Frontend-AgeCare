// src/app/shared/services/base.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { environment} from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  // Base path (e.g., http://localhost:3000/api/v1)
  basePath: string = `${environment.serverBasePath}`;

  // This will be overridden by each extending service
  resourceEndpoint: string = '/resources';

  // Default HTTP options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(protected http: HttpClient) { }

  // GET: Fetch all resources
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // GET: Fetch a single resource by ID
  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // POST: Create a new resource
  create<U = T>(item: U): Observable<T> {
    return this.http.post<T>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // PUT: Update an existing resource
  update<U = T>(id: number, item: U): Observable<T> {
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // DELETE: Delete a resource by ID
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Helper: Get full resource path
  protected resourcePath(): string {
    return `${this.basePath}${this.resourceEndpoint}`;
  }

  // ✅ Aquí agregamos el método que faltaba
  protected defaultPipeOperators<R>() {
    return (source: Observable<R>) => source.pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Default error handler
  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('Client-side error:', error.error.message);
    } else {
      // Backend error
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
