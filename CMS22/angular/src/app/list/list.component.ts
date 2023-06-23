import { Component, OnInit } from '@angular/core';
import { CMSService } from '../cms.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ViewEncapsulation } from '@angular/core';
import { Users } from '../shared/user.model';
Users

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit{

  constructor(public service:CMSService,public service2:UserService,public router:Router){}
  
  title = 'CMS';
  sideNavStatus: boolean = false;

  Userlist:any[]=[]
  list: Users = new Users();
  ngOnInit(): void {
    this.getAllUsers();
    }
    getAllUsers():void{
      this.service.getUsers().subscribe(res=>{
        console.log(res)
        this.Userlist=res as any[];

        this.list=res as Users;

        console.log(this.Userlist)
        console.log(this.list)
      })
    }
    deleted(users : any){
      this.service.deleteUsers(users.userID).subscribe(res=>{
        alert("employee Deleted");
        this.getAllUsers()
      })
    }
    edit(user:any){
      this.router.navigate(['signup']);
      this.service2.userData=Object.assign({},user);
    }
    adduser(){
      this.router.navigate(['signup']);
    }
    populateContent(user: any): void {
      this.router.navigate(['/editusers', { id: user.userID }]);
      this.getAllUsers();
    }
}