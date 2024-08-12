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
  formModel: any = {};
  responseMessage: any;
  appointmentList: any[] = [];
  isAdded: boolean = false;

  constructor(
    public httpService: HttpService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.itemForm = this.formBuilder.group({
      id: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
    this.httpService.getAllAppointments().subscribe(
      (data: any[]) => {
        this.appointmentList = data;
        console.log(this.appointmentList);
      },
      (error) => {
        console.error('Error fetching appointments', error);
      }
    );
  }

  editAppointment(val: any): void {
    this.itemForm.controls['id'].setValue(val.id);
    this.isAdded = true;
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const appointmentId = this.itemForm.controls['id'].value;
      const time = this.datePipe.transform(this.itemForm.controls['time'].value, 'yyyy-MM-dd HH:mm:ss');

      this.httpService.reScheduleAppointment(appointmentId, { time }).subscribe(
        (response) => {
          this.responseMessage = 'Appointment rescheduled successfully';
          this.isAdded = false;
          this.itemForm.reset();
          this.getAppointments();
        },
        (error) => {
          this.responseMessage = 'Error rescheduling appointment';
          console.error('Error rescheduling appointment', error);
        }
      );
    }
  }
}
