import { Routes } from '@angular/router';

import { MainLayoutComponent } from './core/main-layout/main-layout.component';

import { HomeManagementComponent } from './public/pages/home-management/home-management.component';

import { AppointmentManagementComponent } from './core/pages/appointment-management/components/appointment-management.component';
import { NotificationsAlertsManagementComponent } from './core/pages/notifications-alerts-management/components/notifications-alerts-management.component';
import { PaymentManagementComponent } from './core/pages/payment-management/components/payment-management/payment-management.component';
import { ResidentCareManagementComponent } from './core/pages/resident-care-management/components/resident-care-management/resident-care-management.component';
import { UserManagementComponent } from './core/pages/user-management/components/user-management/user-management.component';



// Página no encontrada
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import {DoctorListComponent} from './core/pages/user-management/components/doctor-list/doctor-list.component';
import {UserViewComponent} from './core/pages/user-management/components/user-view/user-view.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeManagementComponent },
      { path: 'appointments', component: AppointmentManagementComponent },
      { path: 'notifications-alerts', component: NotificationsAlertsManagementComponent },
      { path: 'payment', component: PaymentManagementComponent },
      { path: 'resident', component: ResidentCareManagementComponent },
      { path: 'user', component: UserViewComponent }
    ]
  },

  { path: '**', component: PageNotFoundComponent }
];
