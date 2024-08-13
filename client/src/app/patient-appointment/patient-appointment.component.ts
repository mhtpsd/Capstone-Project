import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.scss']
})
export class PatientAppointmentComponent implements OnInit {
<<<<<<< HEAD
  appointmentList:any=[];
  constructor(public httpService:HttpService) {
  
   }
=======
  appointmentList: any[] = [];

  constructor(public httpService: HttpService) { }
>>>>>>> 653baa45948800887c541d3e3f8bb3fced9d5c2b

  ngOnInit(): void {
    this.getAppointments();
  }
<<<<<<< HEAD
  getAppointments() {
=======

  getAppointments(): void {
>>>>>>> 653baa45948800887c541d3e3f8bb3fced9d5c2b
    const userIdString = localStorage.getItem('userId');

    // Parse userId to an integer, if it exists
    const userId = userIdString ? parseInt(userIdString, 10) : null;
<<<<<<< HEAD
    this.appointmentList
    this.httpService.getAppointmentByPatient(userId).subscribe((data)=>{
      this.appointmentList=data;
      console.log(this.appointmentList);
    })
  }


}
=======
    if (userId !== null) {
      this.httpService.getAppointmentByPatient(userId).subscribe(
        (data: any[]) => {
          this.appointmentList = data;
          console.log(this.appointmentList);
        },
        (error) => {
          console.error('Error fetching appointments', error);
        }
      );
    } else {
      console.error('No userId found in localStorage');
    }
  }
}
>>>>>>> 653baa45948800887c541d3e3f8bb3fced9d5c2b
