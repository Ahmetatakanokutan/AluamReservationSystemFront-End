import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SiparisVerComponent } from './siparis-ver.component';
import { DxSchedulerModule } from 'devextreme-angular';




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
    DxSchedulerModule,
    RouterModule.forChild(route),
    
    
  ],
  exports: [RouterModule
  ]
})
export class SiparisVerModule { }
