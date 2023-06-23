import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ElementRef} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { Users } from 'src/app/shared/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
users: any;
userData: any;
  constructor(private http: HttpClient,public userService: UserService, private toastr: ToastrService,private router:Router) { }

  

  ngOnInit() {
    this.userService.getJobs().subscribe(data => {
      this.userService.jobList = data;
    });
  }

  submit(form: NgForm) {
    if (form.valid) {
      if (this.userService.userData.UserID === 0) {
        this.insertUser(form);
      } else {
        this.updateUser(form);
      }
    }
  }

  insertUser(form: NgForm) {
    const username = form.value.username; // Get the username from the form
    const apiUrl = `https://localhost:7250/api/user/${username}`;
    
    // Make a GET request to the API URL to check if the username exists
    this.http.get<any[]>(apiUrl).subscribe(
      (data: any[]) => {
        console.log(apiUrl);
        if (data.length > 0) {
          // Username already exists
          this.toastr.warning('Username already exists', 'Warning');
        } else {
          // Username doesn't exist, proceed with inserting the records
          this.userService.saveUser().subscribe(
            () => {
              this.resetForm(form);
              this.refreshData();
              this.toastr.success('Record Saved', 'Success');
              this.router.navigate(['login'])
              form.reset();
            },
            () => {
              this.toastr.error('An error occurred', 'Error');
            }
          );
        }
      },
      () => {
        this.toastr.error('An error occurred while checking username', 'Error');
      }
    );
  }
  

  
  

  updateUser(form: NgForm) {
    this.userService.updateUser().subscribe(() => {
      this.resetForm(form);
      this.refreshData();
      this.toastr.info('Record Updated', 'Success');
    }, () => {
      this.toastr.error('An error occurred', 'Error');
    });
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.userService.userData = new Users();
  }

  refreshData() {
    this.userService.getUsers().subscribe(res => {
      this.userService.userList = res;
    });
  }
  showSignup = true;

  hideComponent() {
    this.showSignup = false;
  }
  back(){
    this.router.navigate(['home']);
   }
}
