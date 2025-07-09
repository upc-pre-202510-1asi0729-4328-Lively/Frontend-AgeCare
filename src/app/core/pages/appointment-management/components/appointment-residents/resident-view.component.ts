import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DoctorService } from '../../../user-management/services/doctor.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-resident-view',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './resident-view.component.html',
  styleUrls: ['./resident-view.component.css']
})
export class ResidentViewComponent  {

 
}
