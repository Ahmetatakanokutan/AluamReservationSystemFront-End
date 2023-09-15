import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {AddNewDeviceComponent } from './add-new-device/add-new-device.component'
import { RegisterRequestsComponent } from './register-requests/register-requests.component';
import { ReservationRequestsComponent } from './reservation-requests/reservation-requests.component';
import { ButtonModule, FormModule, ModalModule, TableModule, UtilitiesModule } from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ModalModule,
    HttpClientModule,
    ButtonModule,
    TableModule,
    RouterModule.forChild(routes),


  ]
})
export class AdminRoutingModule { }
