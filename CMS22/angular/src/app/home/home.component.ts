import { Component,OnInit } from '@angular/core';
import { FormResponses } from '../shared/user.model';
import { CMSService } from '../cms.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormResponses = {
    id:0,
    name:'',
    email:'',
    message:''
    
  };
  constructor(private cmsService: CMSService,private router:Router ,private toastr :ToastrService) { }

  ngOnInit(): void {
    
  }
  addquery() {
  this.cmsService.addQuery(this.form)
  .subscribe({
    next: (form) => {
      this.router.navigate(['']);
      this.toastr.success('query submited succesfully');

    }
  });
  }
}
