import { Component } from '@angular/core';
import {LoginService} from './login.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  constructor(private loginService:LoginService) { }
  email: string = '';
  password:string = '';
   
  login(){
    this.loginService.login(this.email,this.password).subscribe(
      (response) => {

        console.log(response);
        localStorage.setItem('auth-token', response);
      },
      (error) => {
        console.error(error);
      }
    );

    
  }
  stringifiedData: any;
  asd(){
    this.stringifiedData = JSON.parse(localStorage.getItem('auth-token')|| '{}');
      console.log(this.stringifiedData)
  }
 

}
