import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { map, of } from 'rxjs';

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
  isAdded: boolean=false;
  filteredAppointments$:any;
  appointmentList$:any;
  paginatedList$: any;
  currentPage: number = 1; 
  itemsPerPage: number = 10;

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
  
    this.httpService.getAllAppointments().subscribe((data)=>{
      this.appointmentList$ = of(data);
      this.filteredAppointments$ = of(data); //
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

  searchAppointments(event: any) {
    const searchTerm = event.target.value.trim().toLowerCase();
    this.filteredAppointments$ = this.appointmentList$.pipe(
      map((appointments: any[]) => {
        if (!searchTerm) {
           return appointments;
        }
         return appointments.filter(appointment =>
          appointment.doctor.username.toLowerCase().includes(searchTerm) || 
          appointment.id.toString().includes(searchTerm)
        );  
      })
    );
  }

  updatePaginatedList() {
    this.filteredAppointments$.subscribe((appointments: any[]) => {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedList$ = appointments.slice(startIndex, endIndex);
    });
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedList();
  }

  get totalPages(): number {
    let totalItems = 0;
    this.filteredAppointments$.subscribe((appointments: any[]) => {
      totalItems = appointments.length;
    });
    return Math.ceil(totalItems / this.itemsPerPage);
  }
}
