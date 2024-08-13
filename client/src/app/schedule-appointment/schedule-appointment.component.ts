import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss'],
  providers: [DatePipe] 
})
export class ScheduleAppointmentComponent implements OnInit {
  doctorList: any=[];
  itemForm: FormGroup;
  formModel:any={};
  responseMessage:any;
  isAdded: boolean=false;
  constructor(public httpService:HttpService,private formBuilder: FormBuilder,private datePipe: DatePipe) {
    this.itemForm = this.formBuilder.group({
      patientId: [this.formModel.patientId,[ Validators.required]],
      doctorId: [this.formModel.doctorId,[ Validators.required]],
      time: [this.formModel.time,[ Validators.required]],
  });
   }

  ngOnInit(): void {
    this.getPatients();
  }
  getPatients() {
    this.doctorList
    this.httpService.getDoctors().subscribe((data)=>{
      this.doctorList=data;
      console.log(this.doctorList);
    })
  }
  addAppointment(val:any)
  {  
    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? parseInt(userIdString, 10) : null;
    this.itemForm.controls["doctorId"].setValue(val.id);
    this.itemForm.controls["patientId"].setValue(userId);
  
    this.isAdded=true;
  }
  onSubmit()
  {
    const formattedTime = this.datePipe.transform(this.itemForm.controls['time'].value, 'yyyy-MM-dd HH:mm:ss');

    // Update the form value with the formatted date
    this.itemForm.controls['time'].setValue(formattedTime);
    debugger;
    // this.itemForm.controls["time"].setValue("2018-02-05T12:59:11.332")
    this.httpService.ScheduleAppointment( this.itemForm.value).subscribe((data)=>{
   
      this.itemForm.reset();
      this.responseMessage="Appointment Save Successfully";
      this.isAdded=false;
    })
    
  }

}