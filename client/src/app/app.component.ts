import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
<<<<<<< HEAD
  IsLoggin:any=false;
  roleName: string | null;
  constructor(private authService: AuthService, private router:Router)
  {
   
    this.IsLoggin=authService.getLoginStatus;
    this.roleName=authService.getRole;
    if(this.IsLoggin==false)
    {
      this.router.navigateByUrl('/login'); 
    
    }
  }
  logout()
{
  this.authService.logout();
  window.location.reload();
}

}
=======
  IsLoggin : boolean = false;
  roleName: string | null;

  constructor(private authService: AuthService, private router: Router) {
    this.IsLoggin = this.authService.getLoginStatus();
    this.roleName = this.authService.getRole();
    if (!this.IsLoggin) {
      this.router.navigateByUrl('/login');
    }
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
>>>>>>> 653baa45948800887c541d3e3f8bb3fced9d5c2b
