import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {

  itemForm: FormGroup;
  formModel: any = { role: null, email: '', password: '', username: '' };
  showMessage: boolean = false;
  responseMessage: any;

  constructor(public router: Router, private bookService: HttpService, private formBuilder: FormBuilder) {
    this.itemForm = this.formBuilder.group({
      email: [this.formModel.email, [Validators.required, Validators.email]],
      password: [this.formModel.password, [Validators.required]],
      role: [this.formModel.role, [Validators.required]],
      username: [this.formModel.username, [Validators.required]],
      specialty: [this.formModel.specialty],
      availability: [this.formModel.availability],
    });
  }

  ngOnInit(): void {
    this.onRoleChange();
  }

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
}