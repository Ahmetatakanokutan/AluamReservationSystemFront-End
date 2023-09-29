import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {AddNewDeviceComponent } from './add-new-device/add-new-device.component'
import { RegisterRequestsComponent } from './register-requests/register-requests.component';
import { ReservationRequestsComponent } from './reservation-requests/reservation-requests.component';
import { ButtonModule, FormModule, ModalModule, TableModule, UtilitiesModule } from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditRegisteredUsersComponent } from './edit-registered-users/edit-registered-users.component';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { DxButtonModule, DxSchedulerModule, DxValidatorModule } from 'devextreme-angular';

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
        children:[

          {
            path: '',
            pathMatch:'full',
            component:ReservationRequestsComponent,
            
          },
          {
            path: 'adminCalendar/:id/:machine-id',
            component:AdminCalendarComponent,
            
          },
        ]
        
        
      },
      {
        path: 'edit-registered-users',
        component:EditRegisteredUsersComponent,
        
      },
    ]

  },
  
  
];


@NgModule({
  declarations: [AddNewDeviceComponent,
    RegisterRequestsComponent,
    ReservationRequestsComponent,
    EditRegisteredUsersComponent,
    AdminCalendarComponent
  ],
  
  imports: [
    CommonModule,
    DxSchedulerModule,
    DxButtonModule,
    DxValidatorModule,
    ModalModule,
    HttpClientModule,
    ButtonModule,
    TableModule,
    RouterModule.forChild(routes),


  ]
})
export class AdminRoutingModule { }
