import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = { role: null, email: '', password: '', username: '' };
  showMessage: boolean = false;
  responseMessage: any;

  constructor(
    public router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      role: [this.formModel.role, Validators.required],
      email: [this.formModel.email, [Validators.required, Validators.email]],
      password: [this.formModel.password, Validators.required],
      username: [this.formModel.username, Validators.required],
    });
  }

  ngOnInit(): void {
    this.onRoleChange();
  }

  onRoleChange(): void {
    this.itemForm.get('role')?.valueChanges.subscribe(role => {
      const specialtyControl = this.itemForm.get('specialty');
      const availabilityControl = this.itemForm.get('availability');

      if (role === 'DOCTOR') {
        specialtyControl?.setValidators([Validators.required]);
        availabilityControl?.setValidators([Validators.required]);
      } else {
        specialtyControl?.clearValidators();
        availabilityControl?.clearValidators();
      }

      specialtyControl?.updateValueAndValidity();
      availabilityControl?.updateValueAndValidity();
    });
  }

  onRegister(): void {
    if (this.itemForm.valid) {
      const role = this.itemForm.controls['role'].value;
      const formData = this.itemForm.value;
  
      const observer = {
        next: (response: any) => {
          this.showMessage = true;
          this.responseMessage = `${role} registered successfully`;
          this.itemForm.reset();
        },
        error: (error: any) => {
          this.showMessage = true;
          this.responseMessage = `Error registering ${role.toLowerCase()}`;
          console.error(`Error registering ${role.toLowerCase()}`, error);
        }
      };
  
      if (role === 'PATIENT') {
        this.httpService.registerPatient(formData).subscribe(observer);
      } else if (role === 'DOCTOR') {
        this.httpService.registerDoctors(formData).subscribe(observer);
      } else if (role === 'RECEPTIONIST') {
        this.httpService.registerReceptionist(formData).subscribe(observer);
      }
    }
  }
  
}