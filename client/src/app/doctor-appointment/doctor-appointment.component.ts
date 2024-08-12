import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss']
})
export class DoctorAppointmentComponent implements OnInit {
  appointmentList: any[] = [];

  constructor(public httpService: HttpService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

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

