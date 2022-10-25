import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDyFVtGZ7hvlhLIO4p8GkleoHU51EFV5EA";

  constructor(private http: HttpClient) { }

  register(email: string, password: string) {

      return this.http.post<AuthResponse>(this.url, {
        email: email,
        password: password,
        returnSecureToken: true
      });

  }
}
