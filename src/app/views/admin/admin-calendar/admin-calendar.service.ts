import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateInterval} from "../../../models/DateInterval"
import { ReservationRequest } from '../../../models/ReservationRequests';
import Swal from 'sweetalert2';

const data: DateInterval[] = [

 
];


@Injectable({
  providedIn: 'root'
})
export class AdminCalendarService {


  remoteDataSource: any;
  private baseUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {
    
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


  approveReservationRequest(reservationRequest: ReservationRequest) {
    const authToken = localStorage.getItem('auth-token')!;
    // authToken, null olmayan bir dizge olduğunu belirtir
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenParser(authToken)}`
    });
    const options = { headers };

    return this.http.post<ReservationRequest[]>(`${this.baseUrl}/approve-reservation-request`, reservationRequest, options)
  }

  removeReservationRequest(reservationRequest: ReservationRequest) {
    const authToken = localStorage.getItem('auth-token')!;
    // authToken, null olmayan bir dizge olduğunu belirtir
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenParser(authToken)}`
    });
    const options = { headers };
    this.http.delete(`${this.baseUrl}/remove-reservation-request/${reservationRequest.id}`, { headers, responseType: 'text' }).subscribe(
      (res) => {

        this.showSuccessAlert('Makine başarıyla silindi');

      },
      (error) => {
        console.error('güncelleme için yetkiniz bulunmamakta:', error);
        this.showErrorAlert(error.message);
      }
    );
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

  
  showSuccessAlert(successMessage: string) {
    Swal.fire({
      icon: 'success',
      title: 'Başarılı',
      text: successMessage,
      showConfirmButton: true,
      confirmButtonText: 'Tamam'
    }).then((result) => {
      if (result.isConfirmed) {
        // OK tuşuna basıldığında sayfayı yeniden yükleyin
        location.reload();
      }
    });
  }
  
  showErrorAlert(errorMessage: string) {
    Swal.fire({
      icon: 'error',
      title: 'hata',
      text: errorMessage,
      showConfirmButton: true,
      confirmButtonText: 'Tamam'
    })
  }
}

