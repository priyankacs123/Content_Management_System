import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editusers',
  templateUrl: './editusers.component.html',
  styleUrls: ['./editusers.component.css']
})
export class EditusersComponent {
  user: any = {};
  userId: number | undefined;
  sideNavStatus: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe(params => {
      this.userId = +params['id']; // Retrieve the user ID from the route parameters
      console.log(this.userId);
      if (!isNaN(this.userId)) {
        // Fetch the existing user data for editing
        this.getUserById(this.userId);
      } else {
        this.toastr.error('Invalid user ID', 'Error');
      }
    });
  }

  getUserById(userId: number): void {
    const url = `https://localhost:7250/api/Users/users/${userId}`;
    this.http.get(url).subscribe(
      (response) => {
        this.user = response;
        console.log("the userdata:", this.user);
      },
      (error) => {
        // Handle error response
        this.toastr.error('Failed to fetch user', 'Error');
      }
    );
  }

  submit(form: NgForm): void {
    if (form.valid) {
      this.user.jobRole = ""; // Set jobRole to an empty string
      console.log(this.user);
      const url = `https://localhost:7250/api/Users/${this.userId}`;
      this.http.put(url, this.user).subscribe(
        (response) => {
          // Handle success response
          this.toastr.success('User updated successfully', 'Success');
          this.router.navigate(['/userlist']);
        },
        (error) => {
          // Handle error response
          this.toastr.error('Failed to update user', 'Error');
        }
      );
    }
  }
}
