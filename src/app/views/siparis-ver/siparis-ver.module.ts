import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SiparisVerComponent } from './siparis-ver.component';
import { DxButtonModule, DxSchedulerModule, DxValidatorModule } from 'devextreme-angular';
import { BrowserModule } from '@angular/platform-browser';




const route: Routes = [
  {
    path: '',
    component: SiparisVerComponent,
    data: {
      title: 'siparis-ver',
    },
  }
]
@NgModule({
  declarations: [SiparisVerComponent],
  imports: [
    CommonModule,
    DxSchedulerModule,
    DxButtonModule,
    DxValidatorModule,
    RouterModule.forChild(route),
    
    
  ],
  exports: [RouterModule
  ]
})
export class SiparisVerModule { }
