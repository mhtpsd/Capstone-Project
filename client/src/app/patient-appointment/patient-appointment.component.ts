import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.scss']
})
export class PatientAppointmentComponent implements OnInit {
  appointmentList:any=[];
  constructor(public httpService:HttpService) {
  
   }

  ngOnInit(): void {
    this.getAppointments();
  }
  getAppointments() {
    const userIdString = localStorage.getItem('userId');

    // Parse userId to an integer, if it exists
    const userId = userIdString ? parseInt(userIdString, 10) : null;
    this.appointmentList
    this.httpService.getAppointmentByPatient(userId).subscribe((data)=>{
      this.appointmentList=data;
      console.log(this.appointmentList);
    })
  }


}
