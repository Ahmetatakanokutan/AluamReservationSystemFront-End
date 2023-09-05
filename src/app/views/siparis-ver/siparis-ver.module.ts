import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SiparisVerComponent } from './siparis-ver.component';
import { DxButtonModule, DxSchedulerModule, DxValidatorModule } from 'devextreme-angular';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarComponent } from '../calendar/calendar.component';




const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        component:SiparisVerComponent,
        pathMatch:'full'
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      }
    ]

  },


    
  
];
@NgModule({
  declarations: [SiparisVerComponent, CalendarComponent],
  imports: [
    CommonModule,
    DxSchedulerModule,
    DxButtonModule,
    DxValidatorModule,
    RouterModule.forChild([
      {
        path: '',
        component:SiparisVerComponent,
        pathMatch:'full'
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
    ]),
    
  ],
  exports: [RouterModule,SiparisVerComponent
  ]
})
export class SiparisVerModule { }
