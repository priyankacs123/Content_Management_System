import { Component } from '@angular/core';

@Component({
  selector: 'app-navdemo',
  templateUrl: './navdemo.component.html',
  styleUrls: ['./navdemo.component.css']
})
export class NavdemoComponent {
  title = 'CMS';
  sideNavStatus: boolean = false;
}
