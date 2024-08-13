import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | null = null;
  private isLoggedIn: boolean = false;
  id: string | null | undefined;

  constructor() {}

  // Method to save token received from login
  saveToken(token: string) {
    this.token = token;
    this.isLoggedIn = true;
    // Optionally, you can save the token to local storage or a cookie for persistence
    localStorage.setItem('token', token);
  }

   SetRole(role:any)
  {
    localStorage.setItem('role',role);
  }
<<<<<<< HEAD
  get getRole ():string|null
=======
  getRole ():string|null
>>>>>>> 653baa45948800887c541d3e3f8bb3fced9d5c2b
  {
    return localStorage.getItem('role');
  }
  // Method to retrieve login status
<<<<<<< HEAD
  get getLoginStatus(): boolean {
=======
  getLoginStatus(): boolean {
>>>>>>> 653baa45948800887c541d3e3f8bb3fced9d5c2b
  
      return !!localStorage.getItem('token');
   
  }
  getToken(): string | null {
   this.token= localStorage.getItem('token');
    return this.token;
  }
 
<<<<<<< HEAD
  logout(){
=======
   logout(){
>>>>>>> 653baa45948800887c541d3e3f8bb3fced9d5c2b
    localStorage.removeItem('token');
    localStorage.removeItem('role');
     this.token=null;
     this.isLoggedIn=false
   }
   saveUserId(userid: string) {
  
    localStorage.setItem('userId',userid);
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 653baa45948800887c541d3e3f8bb3fced9d5c2b
