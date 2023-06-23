import { Component,Input,OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-usersidenav',
  templateUrl: './usersidenav.component.html',
  styleUrls: ['./usersidenav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersidenavComponent implements OnInit{
  @Input() sideNavStatus:boolean=false;
  constructor(private route:Router){}
  ngOnInit(): void { 
  }
  home(){
  this.route.navigate(['home']);
  }
  list(){
    this.route.navigate(['list']);
  }
}
