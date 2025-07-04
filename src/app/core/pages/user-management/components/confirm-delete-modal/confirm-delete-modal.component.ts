import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Doctor } from '../../model/doctor.model';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.css']
})
export class ConfirmDeleteModalComponent {
  @Input() doctor!: Doctor;

  constructor(
    private svc: DoctorService,
    public activeModal: NgbActiveModal
  ) {}

  confirm() {
    this.svc.deleteDoctor(this.doctor.id)
      .subscribe(() => this.activeModal.close(true));
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
