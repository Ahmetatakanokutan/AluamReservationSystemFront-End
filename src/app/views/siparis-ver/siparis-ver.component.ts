import { Component } from '@angular/core';
import { DataService,  } from '../calendar/calendar.service';
import { loadMessages, locale } from 'devextreme/localization';
import { DxSchedulerModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Machine } from 'src/app/models/Machine';
import {SiparisVerService } from './siparis-ver.service'

@Component({
  selector: 'app-siparis-ver',
  templateUrl: './siparis-ver.component.html',
  styleUrls: ['./siparis-ver.component.scss'],
  providers: [DataService]
})
export class SiparisVerComponent {

  machine:Machine = {id:0 ,  name:"" , features:"" , imageUrl:"" , price:""};
  machines: Machine[] = [];
  constructor(private router: Router,  private activatedRoute:ActivatedRoute, private siparisVerService:SiparisVerService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{

        this.getAll();

    })
  }


  getAll() {
    this.siparisVerService.getAllMachines().subscribe(
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

  onUpdate(machine: Machine) {
  
    this.machine = machine;
  }
  changeRoute(machine: Machine) {
    this.machine = machine;
    const newUrl = '/siparis-ver/calendar/' + machine.id; 
    this.router.navigate([newUrl]);
  }
}

