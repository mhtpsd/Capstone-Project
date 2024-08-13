import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-receptionist-appointments',
  templateUrl: './receptionist-appointments.component.html',
  styleUrls: ['./receptionist-appointments.component.scss'],
  providers: [DatePipe] 
})
export class ReceptionistAppointmentsComponent implements OnInit {
  itemForm: FormGroup;
  formModel:any={};
  responseMessage:any;
  appointmentList:any=[];
  isAdded: boolean=false;
  constructor(public httpService:HttpService,private formBuilder: FormBuilder,private datePipe: DatePipe) {
    this.itemForm = this.formBuilder.group({
   
      id: [this.formModel.id,[ Validators.required]],
      time: [this.formModel.time,[ Validators.required]],
  });
   }

  ngOnInit(): void {
    this.getAppointments();
  }
  getAppointments() {
  
    this.appointmentList
    this.httpService.getAllAppointments().subscribe((data)=>{
      this.appointmentList=data;
      console.log(this.appointmentList);
    })
  }
  editAppointment(val:any)
  {  
    
    this.itemForm.controls["id"].setValue(val.id);
  
    this.isAdded=true;
  }
  onSubmit()
  {
   
    const formattedTime = this.datePipe.transform(this.itemForm.controls['time'].value, 'yyyy-MM-dd HH:mm:ss');

    // Update the form value with the formatted date
    this.itemForm.controls['time'].setValue(formattedTime);
    this.httpService.reScheduleAppointment(this.itemForm.controls["id"].value, this.itemForm.value).subscribe((data)=>{   
      this.itemForm.reset();
      this.responseMessage="Appointment Rescheduled  Save Successfully";
      this.isAdded=false;
      this.getAppointments();
    })
    
  }
}