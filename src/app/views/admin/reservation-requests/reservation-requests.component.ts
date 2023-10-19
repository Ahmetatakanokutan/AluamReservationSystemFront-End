import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationRequest } from 'src/app/models/ReservationRequests';
import { AdminService } from '../admin.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservation-requests',
  templateUrl: './reservation-requests.component.html',
  styleUrls: ['./reservation-requests.component.scss']
})


export class ReservationRequestsComponent {

  adminService:AdminService
  reservationRequests:ReservationRequest[] = []

  constructor(private router: Router, adminService:AdminService,private activatedRoute:ActivatedRoute){
    this.adminService = adminService
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{

        this.getAll();

    })
  }


  getAll() {
    this.adminService.getAllReservationRequest().subscribe(
      (response: ReservationRequest[]) => {
        // HTTP isteği başarıyla tamamlandı, verileri kullanabilirsiniz
        this.reservationRequests = response;

      },
      (error) => {
        // HTTP isteğinde hata oluştu, hata işleme kodunu burada ekleyebilirsiniz
        console.error('HTTP isteği sırasında bir hata oluştu:', error);
      }
    );
  }

  changeRoute(reservationRequest: ReservationRequest) {
    reservationRequest.text =reservationRequest.userMail

    const newUrl = 'admin/reservation-requests/adminCalendar/' + reservationRequest.id +'/' + reservationRequest.machineId; 

    this.router.navigate([newUrl]);
  }
  delete(reservationRequest: ReservationRequest){}
}
