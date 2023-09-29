import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Machine } from '../../models/Machine';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  getAllMachines(): Observable<Machine[]> {

    return this.http.get<Machine[]>(`${this.baseUrl}/get-all-machines`);
  }
}
