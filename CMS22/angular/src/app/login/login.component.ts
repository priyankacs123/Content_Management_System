import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public userService: UserService, public router: Router, public toastr: ToastrService) { }
  user: any[] = [];
  logincred:any[]=[]

  submit(form: any) {
    if (form.valid) {
      const { Username, Password } = this.userService.userData;

      this.userService.authenticateUser(Username, Password).subscribe(
        (response) => {
          this.toastr.success('Login successful!'); // Display success toast message
          // Retrieve data of a single user
          this.userService.GetUserByUsername(Username).subscribe(res => {
            this.user = res as any;
            console.log(this.user);
            this.userService.setUser(this.user); // Emit the updated user value
            console.log(this.userService.user$);
          });
         

         const storedUser = localStorage.getItem('user');

         if (storedUser) {  
         this.logincred = JSON.parse(storedUser);
         }
         
         if (this.logincred.length > 0) {
           if (this.logincred[0].jobID === 3) {
             this.router.navigate(['dashboard']);
             form.reset();
           } else {
             this.router.navigate(['usercrud']);
             form.reset();
           }
         }
         else {
           console.log('User not found');
           // Handle user not found scenario
         }
     },
        (error) => {
          this.toastr.error('Login failed:', "invalid username  or password" ); // Display error toast message
          console.log('Login failed:', error);
          // Handle error message display or any other actions
        }
      );
    }
  }
  back(){
   this.router.navigate(['home']);
  }
}
