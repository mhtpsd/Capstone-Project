import { Component, OnInit } from '@angular/core';
import { map, of } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss']
})
export class DoctorAppointmentComponent implements OnInit {

  appointmentList$: any;
  filteredAppointments$: any;
  paginatedList$: any;
  currentPage: number = 1; 
  itemsPerPage: number = 10;

  constructor(public httpService:HttpService) {}

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? parseInt(userIdString, 10) : null;

    this.httpService.getAppointmentByDoctor(userId).subscribe((data) => {
      this.appointmentList$ = of(data);
      this.filteredAppointments$ = of(data); // Initialize filteredAppointments$
      this.updatePaginatedList(); // Update paginated list after fetching data
    });
  }

  searchAppointments(event: any) {
    const searchTerm = event.target.value.trim().toLowerCase();
    this.filteredAppointments$ = this.appointmentList$.pipe(
      map((appointments: any[]) => {
        if (!searchTerm) {
           return appointments;
        }
         return appointments.filter(appointment =>
          appointment.doctor.username.toLowerCase().includes(searchTerm) || appointment.id.toString().includes(searchTerm)
        );
      })
    );
    this.updatePaginatedList(); // Update paginated list after filtering
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
