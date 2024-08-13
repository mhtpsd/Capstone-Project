import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
<<<<<<< HEAD
})
export class RegistrationComponent implements OnInit {

=======
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
>>>>>>> 653baa45948800887c541d3e3f8bb3fced9d5c2b
  itemForm: FormGroup;
  formModel: any = { role: null, email: '', password: '', username: '' };
  showMessage: boolean = false;
  responseMessage: any;

<<<<<<< HEAD
  constructor(public router: Router, private bookService: HttpService, private formBuilder: FormBuilder) {
    this.itemForm = this.formBuilder.group({
      email: [this.formModel.email, [Validators.required, Validators.email]],
      password: [this.formModel.password, [Validators.required]],
      role: [this.formModel.role, [Validators.required]],
      username: [this.formModel.username, [Validators.required]],
      specialty: [this.formModel.specialty],
      availability: [this.formModel.availability],
=======
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
>>>>>>> 653baa45948800887c541d3e3f8bb3fced9d5c2b
    });
  }

  ngOnInit(): void {
    this.onRoleChange();
  }

<<<<<<< HEAD
  onRoleChange() {
    this.itemForm.get('role')?.valueChanges.subscribe(role => {
      if (role === 'DOCTOR') {
        this.itemForm.get('specialty')?.setValidators([Validators.required]);
        this.itemForm.get('availability')?.setValidators([Validators.required]);
      } else {
        this.itemForm.get('specialty')?.clearValidators();
        this.itemForm.get('availability')?.clearValidators();
      }
      this.itemForm.get('specialty')?.updateValueAndValidity();
      this.itemForm.get('availability')?.updateValueAndValidity();
    });
  }

  onRegister() {
    debugger;
    if (this.itemForm.valid) {
      this.showMessage = false;
      if( this.itemForm.controls["role"].value=="PATIENT")
      this.bookService.registerPatient(this.itemForm.value).subscribe(data => {
        this.showMessage = true;
        this.responseMessage = "You are successfully Registered";
        this.itemForm.reset();
      }, error => {
        // Handle error
      });
      if( this.itemForm.controls["role"].value=="DOCTOR")
        this.bookService.registerDoctors(this.itemForm.value).subscribe(data => {
          this.showMessage = true;
          this.responseMessage = "You are successfully Registered";
          this.itemForm.reset();
        }, error => {
          // Handle error
        });
        if( this.itemForm.controls["role"].value=="RECEPTIONIST")
          this.bookService.registerReceptionist(this.itemForm.value).subscribe(data => {
            this.showMessage = true;
            this.responseMessage = "You are successfully Registered";
            this.itemForm.reset();
          }, error => {
            // Handle error
          });
    } else {
      this.itemForm.markAllAsTouched();
    }
  }
=======
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
  
>>>>>>> 653baa45948800887c541d3e3f8bb3fced9d5c2b
}