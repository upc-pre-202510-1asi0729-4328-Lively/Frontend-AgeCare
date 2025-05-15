import { Component, OnInit } from '@angular/core';
import { DoctorService, Doctor} from '../../services/doctor.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-doctor-management',
  templateUrl: './doctor-management.component.html',
  imports: [
    FormsModule, CommonModule, TranslatePipe
  ],
  styleUrls: ['./doctor-management.component.css']
})
export class DoctorManagementComponent implements OnInit {
  doctors: Doctor[] = [];
  newDoctor: Omit<Doctor, 'id'> = {
    FirstName: '',
    LastName: '',
    Speciality: '',
    Phone: '',
    NursingHomeId: '',

  };
  editingDoctorId: number | null = null;
  searchTerm: string = '';
  showForm: boolean = false;
  confirmationMessage: string = '';  // Mensaje de confirmación

  doctorToDelete: number | null = null; // ID del doctor que se desea eliminar
  showDeleteWarning: boolean = false;   // Controla la visibilidad del modal de advertencia


  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors() {
    this.doctorService.getDoctors().subscribe(
      (doctors) => this.doctors = doctors,
      (error) => console.error('Error al obtener doctores', error)
    );
  }

  addDoctor() {
    if (this.editingDoctorId !== null) {
      // Modo edición
      this.doctorService.updateDoctor(this.editingDoctorId, { id: this.editingDoctorId, ...this.newDoctor }).subscribe(
        (updatedDoctor) => {
          const index = this.doctors.findIndex(d => d.id === this.editingDoctorId);
          if (index !== -1) {
            this.doctors[index] = updatedDoctor;
          }
          // Mostrar mensaje de confirmación
          this.confirmationMessage = 'Doctor actualizado correctamente.';
          this.closeForm();
        },
        (error) => {
          console.error('Error al actualizar doctor', error);
        }
      );
    } else {
      // Modo agregar
      this.doctorService.addDoctor(this.newDoctor).subscribe(
        (addedDoctor) => {
          this.doctors.push(addedDoctor);
          // Mostrar mensaje de confirmación
          this.confirmationMessage = 'Nuevo doctor agregado exitosamente.';
          this.closeForm();
        },
        (error) => {
          console.error('Error al agregar doctor', error);
        }
      );
    }
  }

  editDoctor(doctor: any) {
    this.newDoctor = {
      FirstName: doctor.FirstName,
      LastName: doctor.LastName,
      Speciality: doctor.Speciality,
      Phone: doctor.Phone,
      NursingHomeId: doctor.NursingHomeId
    };
    this.editingDoctorId = doctor.id;
    this.showForm = true; // <== ABRIR MODAL
  }

  deleteDoctor(id: number): void {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este doctor? Esta acción no se puede deshacer.');

    if (confirmDelete) {
      this.doctorService.deleteDoctor(id).subscribe(() => {
        this.getDoctors(); // o actualiza la lista manualmente si es necesario
        this.confirmationMessage = 'Doctor eliminado correctamente.';
        setTimeout(() => this.confirmationMessage = '', 3000);
      });
    }
  }


  resetForm() {
    this.newDoctor = {
      FirstName: '',
      LastName: '',
      Speciality: '',
      Phone: '',
      NursingHomeId: ''
    };
    this.editingDoctorId = null;
  }

  get filteredDoctors(): Doctor[] {
    const term = this.searchTerm.toLowerCase();
    return this.doctors.filter(doctor =>
      doctor.FirstName.toLowerCase().includes(term) ||
      doctor.LastName.toLowerCase().includes(term)
    );
  }
  openForm() {
    this.showForm = true;
    this.editingDoctorId = null;
    this.newDoctor = {
      FirstName: '',
      LastName: '',
      Speciality: '',
      Phone: '',
      NursingHomeId: ''
    };
  }

  closeForm() {
    this.showForm = false; // Cierra el formulario flotante (si usas un modal, por ejemplo)
    this.resetForm(); // Resetea los campos del formulario
    // Oculta el mensaje después de un tiempo
    setTimeout(() => {
      this.confirmationMessage = ''; // Limpia el mensaje de confirmación
    }, 3000);  // El mensaje se oculta después de 3 segundos
  }

  // Llamado al abrir el modal
  confirmDeleteDoctor(id: number) {
    this.doctorToDelete = id;
    this.showDeleteWarning = true;
  }

// Acción de confirmar eliminación
  performDeleteDoctor() {
    if (this.doctorToDelete !== null) {
      this.doctorService.deleteDoctor(this.doctorToDelete).subscribe(() => {
        this.doctors = this.doctors.filter(d => d.id !== this.doctorToDelete);
        this.confirmationMessage = 'Doctor eliminado correctamente.';
        this.showDeleteWarning = false;
        this.doctorToDelete = null;
        setTimeout(() => this.confirmationMessage = '', 3000);
      });
    }
  }

// Cancelar eliminación
  cancelDelete() {
    this.showDeleteWarning = false;
    this.doctorToDelete = null;
  }


}
