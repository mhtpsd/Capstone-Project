import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-doctor-availability',
  templateUrl: './doctor-availability.component.html',
  styleUrls: ['./doctor-availability.component.scss']
})
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