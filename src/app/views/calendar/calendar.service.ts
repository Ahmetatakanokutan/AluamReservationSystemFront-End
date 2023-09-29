import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateInterval} from "src/app/models/DateInterval"
import { ReservationRequest } from 'src/app/models/ReservationRequests';

export class Data {
  text: any;

  startDate: any;

  endDate: any;
  color:any;
}

const data: DateInterval[] = [

 
];

@Injectable()
export class DataService {
  remoteDataSource: any;
  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {
    
  }
  getAllAppointments(): any {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenParser(localStorage.getItem('auth-token'))}` 
    });
    const options = { headers };

    return this.http.get<DateInterval[]>(`${this.baseUrl}/get-all-appointment`, options)
  }

  tokenParser(token: string): string {
    const regex = /{"token":"(.*?)"}/;
    const match = token.match(regex);

    if (match) {
      const jsonData = match[1];
      return jsonData;
    } else {
      console.log("Eşleşen veri bulunamadı.");
      return token;
    }
  }

  sendReservationRequest(reservationRequest:ReservationRequest){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenParser(localStorage.getItem('auth-token'))}` 
    });
    const options = { headers };

    return this.http.post<ReservationRequest[]>(`${this.baseUrl}/send-reservation-request`, reservationRequest, options)
  }
  getData() {
    return data;
  }

  getDinnerTime() {
    return { from: 12, to: 13 };
  }

  getHolidays() {
    return [
      new Date(2021, 3, 29, 3, 0, 0),

      new Date(2021, 5, 6),
    ];
  }
}
