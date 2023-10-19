import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxSchedulerModule, DxValidatorModule } from 'devextreme-angular';
import { ButtonModule, ModalModule } from '@coreui/angular';
import { RouterModule } from '@angular/router';

import { UpdateUserComponent } from './update-user.component';
import { DataService } from '../calendar/calendar.service';


@NgModule({
  declarations: [UpdateUserComponent],
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
        component:UpdateUserComponent,
        pathMatch:'full'
      }
    ]),
    
  ],
  exports: [RouterModule,UpdateUserComponent
  ],
  providers: [DataService],
})
export class UpdateUserModule { }
