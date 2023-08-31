import { Component } from '@angular/core';
import { Appointment, Service } from './siparis-ver.service';


@Component({
  selector: 'app-siparis-ver',
  templateUrl: './siparis-ver.component.html',
  styleUrls: ['./siparis-ver.component.scss'],
  providers: [Service]
})
export class SiparisVerComponent {
 
  appointmentsData: Appointment[];

  currentDate: Date = new Date(2021, 2, 28);

  constructor(service: Service) {
    this.appointmentsData = service.getAppointments();
  }
}
