import { Routes } from '@angular/router';

import { MainLayoutComponent } from './core/main-layout/main-layout.component';

import { HomeManagementComponent } from './public/pages/home-management/home-management.component';

import { AppointmentManagementComponent } from './core/pages/appointment-management/components/appointment-management.component';
import { NotificationsAlertsManagementComponent } from './core/pages/notifications-alerts-management/components/notifications-alerts-management.component';
import { PaymentManagementDoctorComponent } from './core/pages/payment-management/components/payment-management-doctor/payment-management-doctor.component';
// import { PaymentManagementUserComponent} from './core/pages/payment-management/components/payment-management-user/payment-management-user.component'; // Comentado por error de ruta/no existe
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
      { path: 'notifications-family', component: NotificationsAlertsManagementComponent, data: { view: 'family' } },
      { path: 'notifications-management', component: NotificationsAlertsManagementComponent, data: { view: 'management' } },
      // { path: 'payment', component: PaymentManagementUserComponent }, // Comentado por error de ruta/no existe
      { path: 'payment-doctor', component: PaymentManagementDoctorComponent },
      { path: 'resident', component: ResidentCareManagementComponent },
      { path: 'user', component: UserViewComponent }
    ]
  },

  { path: '**', component: PageNotFoundComponent }
];
