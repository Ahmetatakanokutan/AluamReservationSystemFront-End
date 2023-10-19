import { Component, OnInit, signal,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DashboardService } from './dashboard.service';
import { Machine } from 'src/app/models/Machine';
import { JwtHelperService } from '@auth0/angular-jwt';

type Slide = { id:number, src:string, title:string, subtitle:string}
@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  slides: Slide[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  machines: Machine[] = [];
  helper = new JwtHelperService();
  constructor(private router: Router, private cookieService: CookieService, private dashboardService:DashboardService, private activatedRoute:ActivatedRoute) { }
 
  getAll() {
    this.dashboardService.getAllMachines().subscribe(
      (response: Machine[]) => {
        // HTTP isteği başarıyla tamamlandı, verileri kullanabilirsiniz
        this.machines = response;

      },
      (error) => {
        // HTTP isteğinde hata oluştu, hata işleme kodunu burada ekleyebilirsiniz
        console.error('HTTP isteği sırasında bir hata oluştu:', error);
        
      }
    );
  }

  getStorageData(authToken:string){
    const helper = new JwtHelperService();
    
      return helper.decodeToken(authToken)

  }
changeRoute(){

  const authToken = localStorage.getItem('auth-token');
      if(authToken != null){
  
        if(this.getStorageData(authToken).roles[0].authority === 'USER'){
          const newUrl = 'siparis-ver'
          this.router.navigate([newUrl]);
        }


        else{
          const newUrl =  'login'
          this.router.navigate([newUrl]);
      }
      }
  
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{

      this.getAll();

  })

    this.slides[0] = {
      id: 0,
      src: './assets/images/xBY8ADcd.jpg',
      title: 'First slide',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    };
    this.slides[1] = {
      id: 1,
      src: './assets/images/mL81u2BCnK.jpg',
      title: 'Second slide',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
    this.slides[2] = {
      id: 2,
      src: './assets/images/c74vQ2cK.jpg',
      title: 'Third slide',
      subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    }
  }



}
