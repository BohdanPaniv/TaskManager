import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.model';
import { StorageService } from '@core/services/storage.service';
import { environment } from '@env/environment';
import { ApiResponse } from "@core/models/api-response.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private storage = inject(StorageService);

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  private readonly API = `${environment.apiUrl}/api/auth`;

  currentUser = signal<AuthResponse | null>(
    this.storage.getParsed<AuthResponse>(this.USER_KEY)
  );

  isAuthenticated = signal<boolean>(
    !!this.storage.get(this.TOKEN_KEY)
  );

  login(request: LoginRequest) {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.API}/login`, request).pipe(
      tap(response => this.handleAuth(response.data))
    );
  }

  register(request: RegisterRequest) {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.API}/register`, request).pipe(
      tap(response => this.handleAuth(response.data))
    );
  }

  logout() {
    this.storage.remove(this.TOKEN_KEY);
    this.storage.remove(this.USER_KEY);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return this.storage.get(this.TOKEN_KEY);
  }

  private handleAuth(response: AuthResponse) {
    this.storage.set(this.TOKEN_KEY, response.token);
    this.storage.setParse(this.USER_KEY, JSON.stringify(response));
    this.currentUser.set(response);
    this.isAuthenticated.set(true);
    this.router.navigate(['/tasks']);
  }
}