import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from 'src/app/models/tempUser';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl = 'http://localhost:8080/api/auth';


  constructor(private http: HttpClient) {}


  register(user:RegisterRequest): Observable<any> {


    return this.http.post(`${this.baseUrl}/register`, user, { withCredentials: true });
  }
  existByEmail(email:string){

  return this.http.get(`${this.baseUrl}/exist-by-email/${email}`);
  }
}
