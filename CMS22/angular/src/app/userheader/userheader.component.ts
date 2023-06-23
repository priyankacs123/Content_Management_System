import { Component,EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Output } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserheaderComponent implements OnInit{
@Output() sideNavToggled=new EventEmitter<boolean>();

menuStatus:boolean=false;

constructor(private route:Router,private userService:UserService){}

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

SideNavToggle(){
  this.menuStatus=!this.menuStatus;
  this.sideNavToggled.emit(this.menuStatus);
}
logout(){
  this.route.navigate(['login']);
  localStorage.removeItem('user');
}
}
