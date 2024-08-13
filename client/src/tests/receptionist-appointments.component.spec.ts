import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReceptionistAppointmentsComponent } from '../app/receptionist-appointments/receptionist-appointments.component';
import { HttpService } from '../services/http.service';
import { DatePipe } from '@angular/common';

describe('ReceptionistAppointmentsComponent', () => {
  let component: ReceptionistAppointmentsComponent;
  let fixture: ComponentFixture<ReceptionistAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ReceptionistAppointmentsComponent],
      providers: [
        HttpService,
        DatePipe
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.itemForm.valid).toBeFalsy();
    expect(component.itemForm.controls['id'].hasError('required')).toBeTruthy();
    expect(component.itemForm.controls['time'].hasError('required')).toBeTruthy();
  });

  it('should validate form when id and time are provided', () => {
    component.itemForm.controls['id'].setValue('123');
    component.itemForm.controls['time'].setValue('2024-08-10T10:00:00');
    
    expect(component.itemForm.valid).toBeTruthy();
    expect(component.itemForm.controls['id'].hasError('required')).toBeFalsy();
    expect(component.itemForm.controls['time'].hasError('required')).toBeFalsy();
  });
});
