import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {AddNewDeviceComponent } from './add-new-device/add-new-device.component'
import { RegisterRequestsComponent } from './register-requests/register-requests.component';
import { ReservationRequestsComponent } from './reservation-requests/reservation-requests.component';
const routes: Routes = [
  {
    path: '',
    children:[

      {
        path: 'add-new-device',
        component:AddNewDeviceComponent,
        
      },
      {
        path: 'register-requests',
        component:RegisterRequestsComponent,
        
      },
      {
        path: 'reservation-requests',
        component:ReservationRequestsComponent,
        
      },
    ]

  },


    
  
];


@NgModule({
  declarations: [AddNewDeviceComponent
  ],
  
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminRoutingModule { }
