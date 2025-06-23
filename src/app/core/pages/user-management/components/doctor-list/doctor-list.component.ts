import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../model/doctor.model';
import { EditDoctorModalComponent } from '../edit-doctor-modal/edit-doctor-modal.component';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ]
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  filterText: string = '';

  // Nuevo estado para colapsar/expandir la lista
  isCollapsed: boolean = false;

  constructor(
    private svc: DoctorService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.svc.getDoctors().subscribe(data => {
      console.log('API doctors →', data);
      this.doctors = data;
      this.applyFilter();
    }, err => {
      console.error('Error al cargar doctors:', err);
    });
  }


  applyFilter() {
    const filter = this.filterText.trim().toLowerCase();
    this.filteredDoctors = this.doctors.filter(doc =>
      (`${doc.fullName.firstName} ${doc.fullName.lastName}`)
        .toLowerCase()
        .includes(filter)
    );
  }

  onEdit(doc: Doctor) {
    const ref = this.modalService.open(EditDoctorModalComponent, { size: 'lg', centered: true });
    ref.componentInstance.doctor = doc;
    ref.result
      .then((updated: Doctor) => {
        if (updated) this.loadDoctors();
      })
      .catch(() => {});
  }

  onDelete(doc: Doctor) {
    const ref = this.modalService.open(ConfirmDeleteModalComponent, { centered: true });
    ref.componentInstance.doctor = doc;
    ref.result
      .then((deleted: boolean) => {
        if (deleted) this.loadDoctors();
      })
      .catch(() => {});
  }

  /** Cambia el estado colapsado/expandido */
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
