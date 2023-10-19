import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Machine } from 'src/app/models/Machine';

@Injectable({
  providedIn: 'root'
})
export class SiparisVerService {

  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  getAllMachines(): Observable<Machine[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenParser(localStorage.getItem('auth-token'))}` 
    });
    const options = { headers };

    return this.http.get<Machine[]>(`${this.baseUrl}/get-all-machines`, options);
  }

  tokenParser(token: string): string {
    const regex = /{"token":"(.*?)"}/;
    const match = token.match(regex);

    if (match) {
      const jsonData = match[1];
      return jsonData;
    } else {

      return token;
    }
  }

}
