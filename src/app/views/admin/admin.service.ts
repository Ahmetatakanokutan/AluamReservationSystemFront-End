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

  constructor(private http:HttpClient){}

  Notification(status:string, message:string,type:SweetAlertIcon) {
    Swal.fire(status, message, type);
  }

  uploadImage(fd:FormData):any{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenParser(localStorage.getItem('auth-token'))}` 
    });
    
console.log(fd)
    const options = { headers };

    console.log(headers.getAll)
    //console.log(this.tokenParser(localStorage.getItem('auth-token')))
    this.http.post(`${this.baseUrl}/add-image`,fd, options).subscribe(res =>{
      
      console.log(res)
      return res
    })
  }

  addNewDevice(fd:FormData, machine:Machine){
    if(machine.name != null || machine.features != null || machine.price != null || fd != null){

      machine.imageUrl = this.uploadImage(fd);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.tokenParser(localStorage.getItem('auth-token'))}` 
      });
      

      const options = { headers };

      console.log(headers.getAll)
      this.http.post(`${this.baseUrl}/add-machine`,machine, options).subscribe(res =>{
        console.log(res)
      });
    }
    else{
    this.Notification('hata','Girdiğiniz bilgiler eksik ya da hatalı','error');
    }
  }

  tokenParser(token:string):string{
    
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
