import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  itemForm: FormGroup;
  formModel: any = {};
  showError: boolean = false;
  errorMessage: any;

  constructor(
    public router: Router,
    public httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.itemForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Additional setup can be done here if needed
  }

  onLogin(): void {
    
    if (this.itemForm.valid) {
      
      const { username, password } = this.itemForm.value;
      this.httpService.Login({ username, password }).subscribe({
        next: (response: any) => {
          this.authService.saveToken(response.token);
          this.authService.SetRole(response.role);
          localStorage.setItem('userId', response.userId);
          alert("Hai")
          this.router.navigate(['/dashboard']).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          this.showError = true;
          this.errorMessage = 'Invalid username or password';
          // console.error('Login error', error);
        }
      });
    }
  }
  

  registration() {
    this.router.navigateByUrl('/registration');
  }
}

