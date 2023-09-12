import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DefaultHeaderService } from './default-header.service'
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  constructor(private classToggler: ClassToggleService, 
    private defaultHeaderService: DefaultHeaderService,
    private router: Router) {
    super();
  }
  loginStatus:boolean = false;

  ngOnInit() {

    this.defaultHeaderService.isLoggedIn.subscribe((status) => {
      this.loginStatus = status;
    });
  }

  @Input() sidebarId: string = "sidebar";

  changeRoute() {
    const newUrl = '/login'; 
    this.router.navigate([newUrl]);
    
  }
  logOut() {
    localStorage.removeItem('auth-token')
    this.router.navigate(['/anasayfa'])
    .then(() => {
      window.location.reload();
    });

    
  }

}
