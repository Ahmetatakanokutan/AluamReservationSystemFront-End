import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from 'src/app/enums/roleEnum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DefaultHeaderService {
  isLoggedIn = new BehaviorSubject(false);
  helper = new JwtHelperService();

  constructor() {
    this.isLogged();
  }

  isLogged() {
    const authToken = localStorage.getItem('auth-token');
    if(authToken != null){
      this.isLoggedIn.next(true)
      console.log(this.helper.decodeToken(authToken).roles)
      if(this.helper.isTokenExpired(authToken)){
        this.isLoggedIn.next(false)
      }
    }
    else{
      this.isLoggedIn.next(false)
      
    }

  }
   hiddenForUser(){
    const authToken = localStorage.getItem('auth-token');
    if(authToken != null){

      if(this.getStorageData(authToken).roles === 'USER'){
        return null
      }
      else{
      return true
    }
    }
    return null
  }





  disabledForUser(){
    const authToken = localStorage.getItem('auth-token');
    if(authToken === null){
      return true

    }
    else{
      return null
    }
    }
    
    
  
  hiddenForAdmin(){
    const authToken = localStorage.getItem('auth-token');
    if(authToken != null){
    
      if(this.getStorageData(authToken).roles === 'ADMIN'){
        return null
     }
     else{
      return true
     }
    }
    return true
  }
  
  getStorageData(authToken:string){
    const helper = new JwtHelperService();
    
      return helper.decodeToken(authToken)

  }

  
}
