import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CategoriesComponent {
  title = 'CMS';
  sideNavStatus: boolean = false;
  catlist:any[]=[];

  constructor(public service:UserService,private router:Router){}

  ngOnInit(): void {
    this.getAllcat();
    }
    getAllcat():void{
      this.service.getcat().subscribe(res=>{
        this.catlist=res as any[];
        console.log(this.catlist);
      })
    }
    cat(category:any){
      localStorage.setItem('category', JSON.stringify(category));
      this.router.navigate(['cat1']);
    }
}
