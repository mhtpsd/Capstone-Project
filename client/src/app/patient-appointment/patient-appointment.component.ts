import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.scss']
})
export class PatientAppointmentComponent implements OnInit {
  appointmentList: any[] = [];

  constructor(public httpService: HttpService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
    const userIdString = localStorage.getItem('userId');

    // Parse userId to an integer, if it exists
    const userId = userIdString ? parseInt(userIdString, 10) : null;
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
