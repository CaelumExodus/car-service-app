import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Cookies from "js-cookie";

interface LoginResponse {
  message: string;
  userId: number;
  userRole: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:3000/users/login';

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { username, password });
  }

  saveUserData(userId: number, userRole: string): void {
    Cookies.set('userId', userId.toString());
    Cookies.set('userRole', userRole);
  }

  getUserId(): number | undefined {
    const userId = Cookies.get('userId');
    return userId ? +userId : undefined;
  }

  getUserRole(): string | undefined {
    return Cookies.get('userRole');
  }

  getUserCredentials(): UserCredentials {
    return {
      id: this.getUserId(),
      role: this.getUserRole()
    }
  }


  isLoggedIn(): boolean {
    return !!Cookies.get('userId');
  }

  logout(): void {
    Cookies.remove('userId');
    Cookies.remove('userRole');
    this.router.navigate(['/login']);
  }
}

export interface UserCredentials {
  id: number | undefined,
  role: string | undefined
}
