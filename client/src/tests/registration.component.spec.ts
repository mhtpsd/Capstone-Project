import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RegistrationComponent } from '../app/registration/registration.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'; 
import { HttpService } from '../services/http.service';
import { AuthService } from '../services/auth.service';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [HttpService, AuthService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    // Create a FormGroup with the form controls defined in your component
    component.itemForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [null, Validators.required],
      username: ['', Validators.required],
      specialty: [''],
      availability: ['']
    });

    fixture.detectChanges();
  });

  it('should have invalid form if any field is empty', () => {
    const form = component.itemForm;
    expect(form.valid).toBeFalsy();

    const emailControl = form.controls['email'];
    expect(emailControl.valid).toBeFalsy();

    const passwordControl = form.controls['password'];
    expect(passwordControl.valid).toBeFalsy();

    const roleControl = form.controls['role'];
    expect(roleControl.valid).toBeFalsy();

    const usernameControl = form.controls['username'];
    expect(usernameControl.valid).toBeFalsy();
  });

  it('should have invalid form if email is invalid', () => {
    const form = component.itemForm;
    const emailControl = form.controls['email'];

    // Set invalid email
    emailControl.setValue('invalid_email');

    expect(emailControl.valid).toBeFalsy();
    expect(emailControl.errors).toEqual({ email: true });
  });

  it('should have valid form if all fields are filled correctly', () => {
    const form = component.itemForm;
    const emailControl = form.controls['email'];
    const passwordControl = form.controls['password'];
    const roleControl = form.controls['role'];
    const usernameControl = form.controls['username'];

    // Set valid values
    emailControl.setValue('test@example.com');
    passwordControl.setValue('password');
    roleControl.setValue('user');
    usernameControl.setValue('testuser');

    expect(form.valid).toBeTruthy();
  });

  it('should set specialty and availability validators when role is DOCTOR', () => {
    const form = component.itemForm;
    const roleControl = form.controls['role'];
    const specialtyControl = form.controls['specialty'];
    const availabilityControl = form.controls['availability'];

    roleControl.setValue('DOCTOR');

    expect(specialtyControl.validator).toBeTruthy();
    expect(availabilityControl.validator).toBeTruthy();
  });

  it('should clear specialty and availability validators when role is not DOCTOR', () => {
    const form = component.itemForm;
    const roleControl = form.controls['role'];
    const specialtyControl = form.controls['specialty'];
    const availabilityControl = form.controls['availability'];

    roleControl.setValue('PATIENT');

    expect(specialtyControl.validator).toBeNull();
    expect(availabilityControl.validator).toBeNull();
  });
});
