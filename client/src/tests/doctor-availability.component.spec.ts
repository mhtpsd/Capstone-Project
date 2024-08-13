import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Import if using ReactiveFormsModule
import { DoctorAvailabilityComponent } from '../app/doctor-availability/doctor-availability.component';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';




describe('DoctorAvailabilityComponent', () => {
  let component: DoctorAvailabilityComponent;
  let fixture: ComponentFixture<DoctorAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Import for HttpClient
        ReactiveFormsModule      // Import for FormBuilder if used in the component
      ],
      declarations: [DoctorAvailabilityComponent],
      providers: [
        HttpService,
        { provide: AuthService, useValue: { getToken: () => 'mockToken' } } // Mock AuthService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
