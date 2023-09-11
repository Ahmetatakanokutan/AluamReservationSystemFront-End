import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/api/auth';


  constructor(private http: HttpClient) {}


  login(email: string, password: string): Observable<any> {
    const body = { email, password };

    return this.http.post(`${this.baseUrl}/authenticate`, body, { withCredentials: true });
  }
}
