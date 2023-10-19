import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'anasayfa',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'anasayfa',
        loadChildren: () =>
          import('./views/anasayfa/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'siparis-ver',
        loadChildren: () =>
          import('./views/siparis-ver/siparis-ver.module').then((m) => m.SiparisVerModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./views/admin/admin-routing.module').then((m) => m.AdminRoutingModule),
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'user-calendar',
        loadChildren: () =>
          import('./views/user-reservation-calendar/user-reservation-calendar.module').then((m) => m.UserReservationCalendarModule)
      },
      {
        path: 'update-user',
        loadChildren: () =>
          import('./views/update-user/update-user.module').then((m) => m.UpdateUserModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {path: '**', redirectTo: 'anasayfa'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
