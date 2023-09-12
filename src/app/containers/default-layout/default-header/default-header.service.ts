import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

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
}
