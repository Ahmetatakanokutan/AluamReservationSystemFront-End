import { Component, HostListener } from '@angular/core';
import {LoginService} from './login.service'
import { Router } from '@angular/router';
import { DefaultHeaderService } from 'src/app/containers/default-layout/default-header/default-header.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  constructor(private loginService:LoginService, private router: Router,
    private defaultHeaderService: DefaultHeaderService) { }
  email: string = '';
  password:string = '';

  Notification(status:string, message:string,type:SweetAlertIcon) {
    Swal.fire(status, message, type);
  }

  @HostListener('document:keydown.enter', ['$event'])
  login(){

    this.loginService.login(this.email,this.password).subscribe(
      (response) => {


        localStorage.setItem('auth-token', JSON.stringify(response));

        this.router.navigate(['/anasayfa'])
          .then(() => {
          window.location.reload();
          
        });
      },
      (error) => {
        this.Notification('hata','E postanız ya da şifreniz hatalı','error');

        console.error(error);
      }
    );

    
  }
  stringifiedData: any;
  asd(){
    this.stringifiedData = localStorage.getItem('auth-token');

  }
 

}
