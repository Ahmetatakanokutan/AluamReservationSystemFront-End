import { Component, HostListener } from '@angular/core';
import { RegisterRequest } from 'src/app/models/tempUser';
import { UserType } from "src/app/enums/userEnum"
import { RegisterService} from "./register.service"
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: RegisterRequest = {
    id: 0, name: '', surname: '', email: '', password: '',
    telephone: '', role: null, userType: UserType.PERSON, companyMail: '', personalAddress: ''
  };

  UserType = UserType;

  constructor(private registerService:RegisterService, private router: Router) {
  }


  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value;
  
    // Sadece sayıları kabul et
    inputValue = inputValue.replace(/[^0-9]/g, '');
  
    // Başlangıçta "5" karakterini ekle
    if (inputValue.length >= 1 && inputValue.charAt(0) !== '5') {
      inputValue = '5' + inputValue.substring(1);
    }
  
    // En fazla 10 karakter kabul et
    inputValue = inputValue.slice(0, 10);
  
    // İşlenmiş değeri geri yükle
    inputElement.value = inputValue;
    this.user.telephone = inputValue;
  }




  @HostListener('document:keydown.enter', ['$event'])
  register(){


    this.registerService.existByEmail(this.user.email).subscribe(
      (response) => {

        if(response === true){
        this.showSuccessAlert("kayıt isteğiniz başarılı bir şekilde yönetici'ye gönderildi")

        this.registerService.register(this.user).subscribe(
          (response) => {
    
            
          },
          (error) => {
            this.showErrorAlert('E postanız ya da şifreniz hatalı');
    
            console.error(error);
          }
        );

      }
      else{
        this.showErrorAlert('Girdiğiniz e posta şu anda kayıtlı');

      }
      },
      (error) => {
        this.showErrorAlert('Girdiğiniz e posta şu anda kayıtlı');

        console.error(error);
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
      this.router.navigate(['/anasayfa']);
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