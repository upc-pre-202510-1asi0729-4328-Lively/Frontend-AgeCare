import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-patient-reports',
  templateUrl: './medical-report-management.component.html',
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./medical-report-management.component.css']
})
export class MedicalReportManagementComponent {
  weeklyReports = [
    { title: 'Blood Test', image: 'assets/reports/blood-test.png' },
    { title: 'Physical Test', image: 'assets/reports/physical-test.png' },
    { title: 'Urine Test', image: 'assets/reports/urine-test.png' }
  ];

  monthlyReports = [
    { title: 'Eye Check', image: 'assets/reports/eye-check.png' },
    { title: 'Dental Check', image: 'assets/reports/dental-check.png' },
    { title: 'Heart Check', image: 'assets/reports/heart-check.png' }
  ];
}
