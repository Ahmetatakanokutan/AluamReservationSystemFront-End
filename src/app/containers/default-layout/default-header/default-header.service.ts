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
  route(){ 
    
      const authToken = localStorage.getItem('auth-token');
      if(authToken != null){
  
        if(this.getStorageData(authToken).roles[0].authority === 'USER'){
          return '/siparis-ver'
        }
        else{
        return 'login'
      }
      }
      return 'login'
  
    
  }

  isLogged() {
    const authToken = localStorage.getItem('auth-token');
    if(authToken != null){
      this.isLoggedIn.next(true)
      console.log(this.helper.decodeToken(authToken).roles[0].authority)
      if(this.helper.isTokenExpired(authToken)){
        localStorage.removeItem('auth-token')
        this.isLoggedIn.next(false)
      }
    }
    else{
      this.isLoggedIn.next(false)
      
    }

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
    
    
  
   hiddenForUser(){
    const authToken = localStorage.getItem('auth-token');
    if(authToken != null){

      if(this.getStorageData(authToken).roles[0].authority === 'USER'){
        return null
      }
      else{
      return true
    }
    }
    return null
  }

  hiddenForAdmin(){
    const authToken = localStorage.getItem('auth-token');
    if(authToken != null){
    
      if(this.getStorageData(authToken).roles[0].authority === 'ADMIN'){
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
