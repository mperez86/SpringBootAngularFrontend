import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private singUpURL = "http://localhost:8080/auth/user"
  private loginURL = "http://localhost:8080/auth/auth"

  constructor(private http: HttpClient,
    private router: Router) { }

  signUpUser(user) {
    return this.http.post<any>(this.singUpURL, user)
  }

  loginUser(user) {
    return this.http.post<any>(this.loginURL, user)
  }

  isUserLogged() {
    return !!localStorage.getItem('token') // !! para que devuelva true o false
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
