import { Component, ViewChild } from '@angular/core';
import { Doctor } from '../../model/doctor.model';
import { DoctorListComponent } from '../doctor-list/doctor-list.component';
import {CreateDoctorComponent} from '../create-doctor/create-doctor.component';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  imports: [
    CreateDoctorComponent,

    DoctorListComponent
  ],
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {
  @ViewChild(DoctorListComponent) listComp!: DoctorListComponent;

  /**
   * Se dispara cuando CreateDoctorComponent emite un doctor creado
   */
  onDoctorCreated(newDoc: Doctor) {
    // Recarga la lista y asegura que esté expandida
    this.listComp.isCollapsed = false;
    this.listComp.loadDoctors();
  }
}
