import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, LoginRequest, LoginResponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  private mockUsers = [
    {
      username: 'admin',
      password: 'admin123',
      email: 'admin@movies.com',
      id: '1'
    },
    {
      username: 'demo',
      password: 'demo123',
      email: 'demo@movies.com',
      id: '2'
    }
  ];

  constructor() {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const user = this.mockUsers.find(
      u => u.username === credentials.username && u.password === credentials.password
    );

    if (user) {
      const token = this.generateToken();
      const authUser: User = {
        id: user.id,
        username: user.username,
        email: user.email,
        token: token
      };

      const response: LoginResponse = {
        success: true,
        token: token,
        user: authUser
      };

      this.setToken(token);
      this.setUser(authUser);

      return of(response).pipe(delay(500));
    }

    return throwError(() => new Error('Usuario o contraseña incorrectos')).pipe(delay(500));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getUser(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private generateToken(): string {
    return 'mock-jwt-token-' + Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}