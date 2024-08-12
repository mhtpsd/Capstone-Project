import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public serverName = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // updateDoctorAvailability(doctorId: any, availability: any): Observable<any> {
  //   const headers = this.getHeaders();
  //   return this.http.post(`${this.serverName}/api/doctor/availability`, { doctorId, availability }, { headers });
  // }


  updateDoctorAvailability(doctorId: number, availability: string): Observable<any> {
    const url = `${this.serverName}/api/doctor/availability?doctorId=${doctorId}&availability=${availability}`;
    const headers = new HttpHeaders().set('Authorization', 'Bearer mockToken');
    return this.http.post(url, {}, { headers });
  }

  getAllAppointments(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.serverName}/api/receptionist/appointments`, { headers });
  }

  getAppointmentByDoctor(doctorId: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.serverName}/api/doctor/appointments`, { headers, params: { doctorId } });
  }

  getAppointmentByPatient(patientId: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.serverName}/api/patient/appointments`, { headers, params: { patientId } });
  }

  // ScheduleAppointment(details: any): Observable<any> {
  //   const headers = this.getHeaders();
  //   return this.http.post(`${this.serverName}/api/patient/appointment`, details, { headers });
  // }

  ScheduleAppointment(details: { patientId: number, doctorId: number, appointmentTime: string }): Observable<any> {
    const url = `${this.serverName}/api/patient/appointment?patientId=${details.patientId}&doctorId=${details.doctorId}`;
    const headers = new HttpHeaders().set('Authorization', 'Bearer mockToken');
    return this.http.post(url, { appointmentTime: details.appointmentTime }, { headers });
  }

  // ScheduleAppointmentByReceptionist(details: any): Observable<any> {
  //   const headers = this.getHeaders();
  //   return this.http.post(`${this.serverName}/api/receptionist/appointment`, details, { headers });
  // }  

  ScheduleAppointmentByReceptionist(details: { patientId: number, doctorId: number, appointmentTime: string }): Observable<any> {
    const url = `${this.serverName}/api/receptionist/appointment?patientId=${details.patientId}&doctorId=${details.doctorId}`;
    const headers = new HttpHeaders().set('Authorization', 'Bearer mockToken');
    return this.http.post(url, { appointmentTime: details.appointmentTime }, { headers });
  }

  reScheduleAppointment(appointmentId: any, formvalue: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.serverName}/api/receptionist/appointment-reschedule/${appointmentId}`, formvalue, { headers });
  }

  getDoctors(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.serverName}/api/patient/doctors`, { headers });
  }

  Login(details: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log(`${this.serverName}/api/user/login`)
    return this.http.post(`${this.serverName}/api/user/login`, details, { headers });
  }

  registerPatient(details: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    alert("Hello");
    return this.http.post(`${this.serverName}/api/patient/register`, details, { headers });
  }

  registerDoctors(details: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.serverName}/api/doctors/register`, details, { headers });
  }

  registerReceptionist(details: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.serverName}/api/receptionist/register`, details, { headers });
  }
}
