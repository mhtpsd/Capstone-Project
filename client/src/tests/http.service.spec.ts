import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from '../services/http.service';
import { AuthService } from '../services/auth.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpService,
        { provide: AuthService, useValue: { getToken: () => 'mockToken' } },
      ],
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a patient', () => {
    const mockDetails = {
      username: 'patient',
      email: 'patient@example.com',
      password: 'testpassword',
    };
    const mockResponse = { message: 'Patient registered successfully' };

    service.registerPatient(mockDetails).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.serverName}/api/patient/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(mockDetails);
    req.flush(mockResponse);
  });

  it('should register a doctor', () => {
    const mockDetails = {
      username: 'doctor',
      email: 'doctor@example.com',
      password: 'testpassword',
    };
    const mockResponse = { message: 'Doctor registered successfully' };

    service.registerDoctors(mockDetails).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.serverName}/api/doctors/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(mockDetails);
    req.flush(mockResponse);
  });

  it('should register a receptionist', () => {
    const mockDetails = {
      username: 'receptionist',
      email: 'receptionist@example.com',
      password: 'testpassword',
    };
    const mockResponse = { message: 'Receptionist registered successfully' };

    service.registerReceptionist(mockDetails).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service.serverName}/api/receptionist/register`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(mockDetails);
    req.flush(mockResponse);
  });

  it('should retrieve doctors', () => {
    const mockResponse = [
      { id: 1, name: 'Doctor 1' },
      { id: 2, name: 'Doctor 2' },
    ];

    service.getDoctors().subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.serverName}/api/patient/doctors`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    req.flush(mockResponse);
  });

  it('should schedule an appointment', () => {
    const details = {
      patientId: 1,
      doctorId: 2,
      appointmentTime: '2024-08-10T10:00:00',
    };
    const mockResponse = { success: true };

    service.ScheduleAppointment(details).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service.serverName}/api/patient/appointment?patientId=${details.patientId}&doctorId=${details.doctorId}`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    req.flush(mockResponse);
  });

  it('should schedule an appointment by receptionist', () => {
    const details = {
      patientId: 1,
      doctorId: 2,
      appointmentTime: '2024-08-10T10:00:00',
    };
    const mockResponse = { success: true };

    service.ScheduleAppointmentByReceptionist(details).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service.serverName}/api/receptionist/appointment?patientId=${details.patientId}&doctorId=${details.doctorId}`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    req.flush(mockResponse);
  });

  it('should reschedule an appointment', () => {
    const appointmentId = 1;
    const formvalue = { appointmentTime: '2024-08-11T11:00:00' };
    const mockResponse = { success: true };

    service.reScheduleAppointment(appointmentId, formvalue).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service.serverName}/api/receptionist/appointment-reschedule/${appointmentId}`
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    req.flush(mockResponse);
  });

  it('should get all appointments', () => {
    const mockResponse = [
      { appointmentId: 1, patient: 'Patient 1', doctor: 'Doctor 1' },
      { appointmentId: 2, patient: 'Patient 2', doctor: 'Doctor 2' },
    ];

    service.getAllAppointments().subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.serverName}/api/receptionist/appointments`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    req.flush(mockResponse);
  });

  it('should get appointments by doctor', () => {
    const doctorId = 1;
    const mockResponse = [
      { appointmentId: 1, patient: 'Patient 1' },
      { appointmentId: 2, patient: 'Patient 2' },
    ];

    service.getAppointmentByDoctor(doctorId).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service.serverName}/api/doctor/appointments?doctorId=${doctorId}`
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    req.flush(mockResponse);
  });

  it('should get appointments by patient', () => {
    const patientId = 1;
    const mockResponse = [
      { appointmentId: 1, doctor: 'Doctor 1' },
      { appointmentId: 2, doctor: 'Doctor 2' },
    ];

    service.getAppointmentByPatient(patientId).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service.serverName}/api/patient/appointments?patientId=${patientId}`
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    req.flush(mockResponse);
  });

  it('should update doctor availability', () => {
    const doctorId = 1;
    const availability = 'Available';
    const mockResponse = { success: true };

    service
      .updateDoctorAvailability(doctorId, availability)
      .subscribe((response: any) => {
        expect(response).toEqual(mockResponse);
      });

    const req = httpMock.expectOne(
      `${service.serverName}/api/doctor/availability?doctorId=${doctorId}&availability=${availability}`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    req.flush(mockResponse);
  });

  it('should login user', () => {
    const loginDetails = {
      username: 'user1',
      password: 'password1',
    };
    const mockResponse = { token: 'newToken' };

    service.Login(loginDetails).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.serverName}/api/user/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(loginDetails);
    req.flush(mockResponse);
  });

});
