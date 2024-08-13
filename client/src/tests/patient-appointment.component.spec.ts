import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms'; // or FormsModule if using template-driven forms
import { PatientAppointmentComponent } from '../app/patient-appointment/patient-appointment.component';
import { HttpService } from '../services/http.service';
import { AuthService } from '../services/auth.service';




describe('PatientAppointmentComponent', () => {
  let component: PatientAppointmentComponent;
  let fixture: ComponentFixture<PatientAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Import for HttpClient
        ReactiveFormsModule      // Import for FormBuilder if used in the component
      ],
      declarations: [PatientAppointmentComponent],
      providers: [
        HttpService,
        { provide: AuthService, useValue: { getToken: () => 'mockToken' } } // Mock AuthService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
