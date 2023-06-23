import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgChartsModule } from 'ng2-charts';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import{DatePipe} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { UsercrudComponent } from './usercrud/usercrud.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersidenavComponent } from './usersidenav/usersidenav.component';
import { UserheaderComponent } from './userheader/userheader.component';
import { NavdemoComponent } from './navdemo/navdemo.component';
import { ContentByCategoryComponent } from './views/content-by-category/content-by-category.component';
import { Cat1Component } from './views/cat1/cat1.component';
import { Cat2Component } from './views/cat2/cat2.component';
import { Cat3Component } from './views/cat3/cat3.component';
import { Cat4Component } from './views/cat4/cat4.component';
import { Cat5Component } from './views/cat5/cat5.component';
import { Cat6Component } from './views/cat6/cat6.component';
import { Cat7Component } from './views/cat7/cat7.component';
import { Cat8Component } from './views/cat8/cat8.component';
import { AddfileComponent } from './addfile/addfile.component';
import { FormresponsesComponent } from './formresponses/formresponses.component';
import { MycontentComponent } from './userview/mycontent/mycontent.component';
import { ToastrService } from 'ngx-toastr';
import { EditusersComponent } from './editusers/editusers.component';
import { ContentsComponent } from './contents/contents.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { RecycleComponent } from './recycle/recycle.component';
import { UserportalComponent } from './userportal/userportal.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    ListComponent,
    UsercrudComponent,
    CategoriesComponent,
    UsersidenavComponent,
    UserheaderComponent,
    NavdemoComponent,
    EditusersComponent,
    
    ContentByCategoryComponent,
    Cat1Component,
    Cat2Component,
    Cat3Component,
    Cat4Component,
    Cat5Component,
    Cat6Component,
    Cat7Component,
    Cat8Component,
    AddfileComponent,
    FormresponsesComponent,
    MycontentComponent,
    ContentsComponent,
    CommentFormComponent,
    RecycleComponent,
    UserportalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [DatePipe, ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
