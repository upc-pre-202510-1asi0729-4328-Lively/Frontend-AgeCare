import { Routes } from '@angular/router';

import { MainLayoutComponent } from './core/main-layout/main-layout.component';


import { HomeManagementComponent } from './core/pages/home-management/home-management.component';
import { AppointmentManagementComponent } from './core/pages/appointment-management/appointment-management.component';
import { DiagnosisManagementComponent } from './core/pages/diagnosis-management/diagnosis-management.component';
import { MedicalReportManagementComponent } from './core/pages/medical-report-management/medical-report-management.component';
import { MessagesManagementComponent } from './core/pages/messages-management/messages-management.component';
import { ProfileManagementComponent } from './core/pages/profile-management/profile-management.component';
import { ReportManagementComponent } from './core/pages/report-management/report-management.component';
import {ResidentManagementComponent} from './core/pages/resident-management/resident-management.component';

// IAM
import { LoginComponent } from './iam/login/login.component';
import { SignupComponent } from './iam/signup/signup.component';

// Página no encontrada
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeManagementComponent },
      { path: 'appointments', component: AppointmentManagementComponent },
      { path: 'diagnosis', component: DiagnosisManagementComponent },
      { path: 'medical-reports', component: MedicalReportManagementComponent },
      { path: 'messages', component: MessagesManagementComponent },
      { path: 'profile', component: ProfileManagementComponent },
      { path: 'reports', component: ReportManagementComponent },
      { path: 'core/residents', component: ResidentManagementComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: PageNotFoundComponent }
];
