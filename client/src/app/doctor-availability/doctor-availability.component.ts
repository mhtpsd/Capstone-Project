import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-doctor-availability',
  templateUrl: './doctor-availability.component.html',
  styleUrls: ['./doctor-availability.component.scss']
})
<<<<<<< HEAD
export class DoctorAvailabilityComponent implements OnInit {


  itemForm: FormGroup;
  formModel:any={};
  responseMessage:any;
  isAdded: boolean=false;
  constructor(public httpService:HttpService,private formBuilder: FormBuilder) {
    this.itemForm = this.formBuilder.group({
      doctorId: [this.formModel.doctorId,[ Validators.required]],
      availability: [this.formModel.availability,[ Validators.required]]
  });
   }

  ngOnInit(): void {
 
  }

  onSubmit()
  {
    const userIdString = localStorage.getItem('userId');

    // Parse userId to an integer, if it exists
    const userId = userIdString ? parseInt(userIdString, 10) : null;
    this.itemForm.controls['doctorId'].setValue(userId);
    this.httpService.updateDoctorAvailability(this.itemForm.controls['doctorId'].value,this.itemForm.controls['availability'].value).subscribe((data)=>{
      debugger;
      this.itemForm.reset();
      this.responseMessage="Appointment Save Successfully";
      this.isAdded=false;
    })
    
  }

}
=======
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


>>>>>>> 653baa45948800887c541d3e3f8bb3fced9d5c2b
