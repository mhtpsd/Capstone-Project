import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-doctor-availability',
  templateUrl: './doctor-availability.component.html',
  styleUrls: ['./doctor-availability.component.scss']
})
export class DoctorAvailabilityComponent implements OnInit{

  itemForm: FormGroup;
  formModel: any = {};
  responseMessage: any;
  isAdded: boolean = false;

  constructor(public httpService: HttpService, private formBuilder: FormBuilder) {
    this.itemForm = this.formBuilder.group({
      doctorId: ['', Validators.required],
      availability: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Additional setup can be done here if needed
  }

  onSubmit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const doctorId = parseInt(userId, 10);
      this.itemForm.controls['doctorId'].setValue(doctorId);
      const availability = this.itemForm.controls['availability'].value;

      this.httpService.updateDoctorAvailability(doctorId, availability).subscribe(
        (response) => {
          this.responseMessage = 'Availability updated successfully';
          this.isAdded = true;
          this.itemForm.reset();
        },
        (error) => {
          this.responseMessage = 'Error updating availability';
          console.error('Error updating availability', error);
        }
      );
    } else {
      this.responseMessage = 'No userId found in localStorage';
      console.error('No userId found in localStorage');
    }
  }
  
}


