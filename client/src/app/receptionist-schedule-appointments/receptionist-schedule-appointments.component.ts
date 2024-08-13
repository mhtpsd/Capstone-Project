import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-receptionist-schedule-appointments',
  templateUrl: './receptionist-schedule-appointments.component.html',
  styleUrls: ['./receptionist-schedule-appointments.component.scss'],
  providers: [DatePipe] 
  
})
export class ReceptionistScheduleAppointmentsComponent implements OnInit {
  
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
  
  }

  onSubmit()
  {
   
    debugger;
    const formattedTime = this.datePipe.transform(this.itemForm.controls['time'].value, 'yyyy-MM-dd HH:mm:ss');

    // Update the form value with the formatted date
    this.itemForm.controls['time'].setValue(formattedTime);
    debugger;
    this.httpService.ScheduleAppointmentByReceptionist( this.itemForm.value).subscribe((data)=>{
   
      this.itemForm.reset();
      this.responseMessage="Appointment Save Successfully";
      this.isAdded=false;
    })
    
  }

}
