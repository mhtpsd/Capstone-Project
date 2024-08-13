import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DoctorAppointmentComponent } from '../app/doctor-appointment/doctor-appointment.component';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';




describe('DoctorAppointmentComponent', () => {
  let component: DoctorAppointmentComponent;
  let fixture: ComponentFixture<DoctorAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Import for HttpClient
        ReactiveFormsModule      // Import for FormBuilder if used in the component
      ],
      declarations: [DoctorAppointmentComponent],
      providers: [
        HttpService,
        { provide: AuthService, useValue: { getToken: () => 'mockToken' } } // Mock AuthService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
