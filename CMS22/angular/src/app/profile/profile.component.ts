import { Component } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

constructor(private userService:UserService,private route:Router){}
isDisabled: boolean = true;
user: any; 
ngOnInit(): void {
  this.userService.user$.subscribe(user => {
    this.user = user;
    console.log(this.user);
  });

 const storedUser = localStorage.getItem('user');
 if (storedUser) {
   this.user = JSON.parse(storedUser);
 }
}
back(){
  this.route.navigate(['dashboard']);
}
}
