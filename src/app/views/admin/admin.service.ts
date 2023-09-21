import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Machine } from 'src/app/EntityModels/Machine';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  Notification(status: string, message: string, type: SweetAlertIcon) {
    Swal.fire(status, message, type);
  }

 
  getAll(): Observable<Machine[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenParser(localStorage.getItem('auth-token'))}` 
    });
    const options = { headers };

    return this.http.get<Machine[]>(`${this.baseUrl}/get-all`, options);
  }


  uploadImage(imageFile: FormData): Observable<string> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.tokenParser(localStorage.getItem('auth-token'))}` 
    });

    const options = { headers, responseType: 'text' as 'json' };

    return this.http.post<string>(`${this.baseUrl}/add-image`, imageFile, options);
}


  async addNewDevice(fd: FormData, machine: Machine) {
      if (machine.name != null || machine.features != null || machine.price != null || fd != null) {
        try {
          const response = await this.uploadImage(fd).toPromise();
          machine.imageUrl = response;
    
          console.log(machine.imageUrl);
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.tokenParser(localStorage.getItem('auth-token'))}` 
          });
    
          const options = { headers };
    
          this.http.post(`${this.baseUrl}/add-machine`, machine, options).subscribe(
            (res) => {
              console.log(res);
              // İşlem başarılı olduğunda SweetAlert'ı burada çağırın
              this.showSuccessAlert
              ('Makine başarıyla eklendi')

            },
            (error) => {
              console.error('Resim yükleme hatası:', error);
              // Hata işleme kodunu burada ekleyin ve kullanıcıya hata mesajını gösterin
              this.showErrorAlert(error.message);
            }
          );
        } catch (error) {
          console.error('Resim yükleme hatası:', error);
          // Hata işleme kodunu burada ekleyin ve kullanıcıya hata mesajını gösterin
          this.showErrorAlert(error.message);
        }
      }
    }


  updateDevice(machine:Machine){

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenParser(localStorage.getItem('auth-token'))}` 
    });

    const options = { headers };

    this.http.post(`${this.baseUrl}/update-machine`, machine, options).subscribe(
      (res) => {
        console.log(res);
        this.showSuccessAlert('Makine başarıyla güncellendi');
      })

  }
  async updateDeviceWithImg(fd:FormData, machine:Machine){

      try {
        const response = await this.uploadImage(fd).toPromise();
        machine.imageUrl = response;
  
        console.log(machine.imageUrl);
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.tokenParser(localStorage.getItem('auth-token'))}` 
        });
  
        const options = { headers };
  
        this.http.post(`${this.baseUrl}/update-machine`, machine, options).subscribe(
          (res) => {
            console.log(res);
            this.showSuccessAlert('Makine başarıyla güncellendi');
          },
          (error) => {
            console.error('güncelleme için yetkiniz bulunmamakta:', error);
            this.showErrorAlert(error.message);
          }
        );
      } catch (error) {
        console.error('güncelleme sırasında bir hata meydana geldi:', error);
        this.showErrorAlert(error.message);
      }
    

  }
  

  deleteMachine(machine: Machine) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenParser(localStorage.getItem('auth-token'))}` 
    });


      this.http.delete(`${this.baseUrl}/delete-machine/${machine.id}`, { headers, responseType: 'text' }).subscribe(
        (res) => {
          console.log(res);
          this.showSuccessAlert('Makine başarıyla silindi');

        },
        (error) => {
          console.error('güncelleme için yetkiniz bulunmamakta:', error);
          this.showErrorAlert(error.message);
        }
      );
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
}