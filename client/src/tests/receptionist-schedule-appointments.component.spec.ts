import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReceptionistScheduleAppointmentsComponent } from '../app/receptionist-schedule-appointments/receptionist-schedule-appointments.component';
import { HttpService } from '../services/http.service';
import { DatePipe } from '@angular/common';

describe('ReceptionistScheduleAppointmentsComponent', () => {
  let component: ReceptionistScheduleAppointmentsComponent;
  let fixture: ComponentFixture<ReceptionistScheduleAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ReceptionistScheduleAppointmentsComponent],
      providers: [
        HttpService,
        DatePipe
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistScheduleAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.itemForm.valid).toBeFalsy();
    expect(component.itemForm.controls['patientId'].hasError('required')).toBeTruthy();
    expect(component.itemForm.controls['doctorId'].hasError('required')).toBeTruthy();
    expect(component.itemForm.controls['time'].hasError('required')).toBeTruthy();
  });

  it('should validate form when all fields are provided', () => {
    component.itemForm.controls['patientId'].setValue('123');
    component.itemForm.controls['doctorId'].setValue('456');
    component.itemForm.controls['time'].setValue('2024-08-10T10:00:00');
    
    expect(component.itemForm.valid).toBeTruthy();
    expect(component.itemForm.controls['patientId'].hasError('required')).toBeFalsy();
    expect(component.itemForm.controls['doctorId'].hasError('required')).toBeFalsy();
    expect(component.itemForm.controls['time'].hasError('required')).toBeFalsy();
  });
});
