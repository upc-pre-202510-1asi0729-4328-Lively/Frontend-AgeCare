import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      id: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      healthInsurance: [''],
      hospital: [''],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const { password, confirmPassword } = this.signupForm.value;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log(this.signupForm.value);
    alert('Registered successfully!');
    this.signupForm.reset();
  }
}
