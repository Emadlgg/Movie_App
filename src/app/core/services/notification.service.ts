import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  public notification$ = this.notificationSubject.asObservable();

  showSuccess(message: string, duration: number = 3000): void {
    this.notificationSubject.next({ type: 'success', message, duration });
  }

  showError(message: string, duration: number = 5000): void {
    this.notificationSubject.next({ type: 'error', message, duration });
  }

  showWarning(message: string, duration: number = 4000): void {
    this.notificationSubject.next({ type: 'warning', message, duration });
  }

  showInfo(message: string, duration: number = 3000): void {
    this.notificationSubject.next({ type: 'info', message, duration });
  }
}