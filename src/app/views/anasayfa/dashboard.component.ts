import { Component, OnInit, signal,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DashboardService } from './dashboard.service';
import { Machine } from 'src/app/models/Machine';

type Slide = { id:number, src:string, title:string, subtitle:string}
@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  slides: Slide[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  machines: Machine[] = [];
  
  constructor(private cookieService: CookieService, private dashboardService:DashboardService, private activatedRoute:ActivatedRoute) { }
 
  getAll() {
    this.dashboardService.getAllMachines().subscribe(
      (response: Machine[]) => {
        // HTTP isteği başarıyla tamamlandı, verileri kullanabilirsiniz
        this.machines = response;
        console.log(this.machines[1].imageUrl)
      },
      (error) => {
        // HTTP isteğinde hata oluştu, hata işleme kodunu burada ekleyebilirsiniz
        console.error('HTTP isteği sırasında bir hata oluştu:', error);
      }
    );
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{

      this.getAll();

  })
    console.log(localStorage.getItem('auth-token'))
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
