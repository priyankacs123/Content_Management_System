import { Component,OnInit } from '@angular/core';
import { FormResponses } from '../shared/user.model';
import { CMSService } from '../cms.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-formresponses',
  templateUrl: './formresponses.component.html',
  styleUrls: ['./formresponses.component.css']
})
export class FormresponsesComponent implements OnInit{

  formresponses:FormResponses[]=[];
  
  constructor(private route: ActivatedRoute,private router: Router, private cmsService:CMSService ) { }
  ngOnInit(): void {
    this.cmsService.getallqueries()
    .subscribe({
      next: (formresponses) => {
          this.formresponses = formresponses;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  Deletequery(id: number){
    this.cmsService.deletequery(id)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/dashboard']);
        }
      })
  }
}

