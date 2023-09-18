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
            this.showSuccessAlert();
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
    } else {
      this.Notification('hata', 'Girdiğiniz bilgiler eksik ya da hatalı', 'error');
    }
  }
  
  showSuccessAlert() {
    Swal.fire('Başarılı', 'Makine başarıyla eklendi', 'success');
  }
  
  showErrorAlert(errorMessage: string) {
    Swal.fire('Hata', 'Resim yükleme hatası: ' + errorMessage, 'error');
  }
  
  updateMachine(selectedMachine: Machine) {
    if (selectedMachine.name != null || selectedMachine.features != null || selectedMachine.price != null) {
     
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.tokenParser(localStorage.getItem('auth-token'))}` 
      });

  
        const options = { headers };
  
        this.http.post(`${this.baseUrl}/update-machine`, selectedMachine, options).subscribe(
          (res) => {
            console.log(res);
            // İşlem başarılı olduğunda SweetAlert'ı burada çağırın
            this.showSuccessAlert();
          },
          (error) => {
            console.error('Resim yükleme hatası:', error);
            // Hata işleme kodunu burada ekleyin ve kullanıcıya hata mesajını gösterin
            this.showErrorAlert(error.message);
          }
        );
      
    } else {
      this.Notification('hata', 'Girdiğiniz bilgiler eksik ya da hatalı', 'error');
    }
      
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