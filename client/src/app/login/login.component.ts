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
<<<<<<< HEAD
  itemForm: FormGroup;
  formModel:any={};
  showError:boolean=false;
  errorMessage:any;
  constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService) 
    {
      this.itemForm = this.formBuilder.group({
        username: [this.formModel.username,[ Validators.required]],
        password: [this.formModel.password,[ Validators.required]],
       
=======

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
>>>>>>> 653baa45948800887c541d3e3f8bb3fced9d5c2b
    });
  }

  ngOnInit(): void {
<<<<<<< HEAD
  }
  onLogin() {
  if (this.itemForm.valid) {
    this.showError = false;
    this.httpService.Login(this.itemForm.value).subscribe((data: any) => {
      if (data.userNo != 0) {
        debugger;
    
        // localStorage.setItem('role', data.role);
        this.authService.SetRole(data.role);
        this.authService.saveToken(data.token)
        this.authService.saveUserId(data.userId)
        this.router.navigateByUrl('/dashboard');
      
        
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        this.showError = true;
        this.errorMessage = "Wrong User or Password";
      }
    }, error => {
      // Handle error
      this.showError = true;
      this.errorMessage = "An error occurred while logging in. Please try again later.";
      console.error('Login error:', error);
    });;
  } else {
    this.itemForm.markAllAsTouched();
  }
}

registration()
  {
    this.router.navigateByUrl('/registration');
  }
}
=======
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

>>>>>>> 653baa45948800887c541d3e3f8bb3fced9d5c2b
