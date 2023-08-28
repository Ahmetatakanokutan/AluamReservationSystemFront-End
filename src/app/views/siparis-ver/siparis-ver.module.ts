import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SiparisVerComponent } from './siparis-ver.component';


const route: Routes = [
  {
    path: '',
    data: {
      title: 'siparis-ver',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },
      {
        path: 'siparis-ver',
        component: SiparisVerComponent,
        data: {
          title: 'siparis-ver',
        },
      },
    ]
  }
]
@NgModule({
  declarations: [SiparisVerComponent],
  imports: [
    RouterModule.forChild(route)
    
  ],
  exports: [RouterModule
  ]
})
export class SiparisVerModule { }
