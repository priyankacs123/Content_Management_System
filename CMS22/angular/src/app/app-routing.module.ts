import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { CategoriesComponent } from './categories/categories.component';
import { NavdemoComponent } from './navdemo/navdemo.component';
import { UsercrudComponent } from './usercrud/usercrud.component';
import { ContentByCategoryComponent } from './views/content-by-category/content-by-category.component';
import { Cat1Component } from './views/cat1/cat1.component';
import { Cat2Component } from './views/cat2/cat2.component';
import { Cat3Component } from './views/cat3/cat3.component';
import { Cat4Component } from './views/cat4/cat4.component';
import { Cat5Component } from './views/cat5/cat5.component';
import { Cat6Component } from './views/cat6/cat6.component';
import { Cat7Component } from './views/cat7/cat7.component';
import { Cat8Component } from './views/cat8/cat8.component';
import { ProfileComponent } from './profile/profile.component';
import { AddfileComponent } from './addfile/addfile.component';
import { FormresponsesComponent } from './formresponses/formresponses.component';
import { MycontentComponent } from './userview/mycontent/mycontent.component';
import { EditusersComponent } from './editusers/editusers.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { ContentsComponent } from './contents/contents.component';
import { RecycleComponent } from './recycle/recycle.component';
import { UserportalComponent } from './userportal/userportal.component';



const routes: Routes = [
  {
    component:HomeComponent,
    path:''
  },
  {
    component:UsercrudComponent,
    path:'usercrud'
  },
  { path: 'content-by-category',
   component: ContentByCategoryComponent },
  {
    component:HomeComponent,
    path:'home'
  },
  { path: 'dashboard', 
  component: DashboardComponent 
  },
  { path: 'categories', 
  component: CategoriesComponent 
  },
  { path: 'cat1', component: Cat1Component },
  { path: 'cat2', component: Cat2Component },
  { path: 'cat3', component: Cat3Component },
  { path: 'cat4', component: Cat4Component },
  { path: 'cat5', component: Cat5Component },
  { path: 'cat6', component: Cat6Component },
  { path: 'cat7', component: Cat7Component },
  { path: 'cat8', component: Cat8Component },
  {path:'mycontent',component: MycontentComponent },
  {path:'recycle',component: RecycleComponent},
  {path:'userportal',component:UserportalComponent},

 



  {  
    component:LoginComponent,
    path:'login'
  },
    {
      component:SignUpComponent,
      path:'signup'
    },
    {
      component:ListComponent,
      path:'list'
    },
    {
      component:NavdemoComponent,
      path:'navdemo'
    },
    {
      component:ProfileComponent,
      path:'profile'
    },
    {
      path:'addfiles',
      component:AddfileComponent
    },
  
    {
      path:'formresponses',
      component:FormresponsesComponent
    },
    {
      component:EditusersComponent,
      path:'editusers'
    },
    {
      path:'comment',
      component:CommentFormComponent
    },
    {
      path:'contents',
      component:ContentsComponent
    },
    {
      component:CommentFormComponent,
      path:'comment-form'
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
