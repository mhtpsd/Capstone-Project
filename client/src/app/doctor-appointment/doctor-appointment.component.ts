import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss']
})
export class DoctorAppointmentComponent implements OnInit {
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
=======

  getAppointments(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const doctorId = parseInt(userId, 10);
      this.httpService.getAppointmentByDoctor(doctorId).subscribe(
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
