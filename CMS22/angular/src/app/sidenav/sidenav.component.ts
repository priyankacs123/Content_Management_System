import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit{
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
