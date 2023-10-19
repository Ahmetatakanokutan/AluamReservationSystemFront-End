import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegisterRequest } from 'src/app/models/tempUser';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {
email:string
  helper = new JwtHelperService();
  constructor(private http: HttpClient) { }


  private baseUrl = 'http://localhost:8080/api/user';
 updateUser(user: User) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.tokenParser(localStorage.getItem('auth-token'))}` 
      });
  
      const options = { headers };
  
      this.http.put(`${this.baseUrl}/update-user`, user, options).subscribe(
        (res) => {

          this.showSuccessAlert('Kullanıcı bilgileri başarıyla güncellendi');
        })
  
    }
    

    getUserByEmail() {

      this.email = this.helper.decodeToken(localStorage.getItem('auth-token')).sub
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.tokenParser(localStorage.getItem('auth-token'))}` 
      });
      const options = { headers };
  
      return this.http.get<RegisterRequest>(`${this.baseUrl}/get-user-by-email/${this.email}`, options);
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
  

}
