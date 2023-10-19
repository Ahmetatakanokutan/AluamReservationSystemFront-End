import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxSchedulerModule, DxValidatorModule } from 'devextreme-angular';
import { ButtonModule, ModalModule } from '@coreui/angular';
import { RouterModule } from '@angular/router';

import { UserReservationCalendarComponent } from './user-reservation-calendar.component';
import { DataService } from '../calendar/calendar.service';

@NgModule({
  declarations: [UserReservationCalendarComponent],
  imports: [
    CommonModule,
    DxSchedulerModule,
    DxButtonModule,
    ButtonModule,
    DxValidatorModule,
    CommonModule,
    ModalModule,
    RouterModule.forChild([
      {
        path: '',
        component:UserReservationCalendarComponent,
        pathMatch:'full'
      }
    ]),
    
  ],
  exports: [RouterModule,UserReservationCalendarComponent
  ],
  providers: [DataService],
})
export class UserReservationCalendarModule { }
