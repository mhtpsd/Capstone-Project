import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss']
})
export class DoctorAppointmentComponent implements OnInit {

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
    this.httpService.getAppointmentByDoctor(userId).subscribe((data)=>{
      this.appointmentList=data;
      console.log(this.appointmentList);
    })
  }
}
