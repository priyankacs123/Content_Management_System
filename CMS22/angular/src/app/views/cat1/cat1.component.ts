import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Content } from 'src/app/shared/content.model';
import { contentService } from 'src/app/shared/content.service';

@Component({
  selector: 'app-cat1',
  templateUrl: './cat1.component.html',
  styleUrls: ['./cat1.component.css']
})
export class Cat1Component implements OnInit {
  contents: any[] = [];
  hideExpired: boolean = false;
  categorydetails:any
  categoryid: any;

  constructor(private http: HttpClient,private contentService:contentService,private router:Router) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('category');

         if (storedUser) {  
         this.categorydetails = JSON.parse(storedUser);
         }
         this.categoryid = this.categorydetails.categoryID;
         console.log(this.categoryid);

  }
  title = 'CMS';
  sideNavStatus: boolean = false;
  getContentByCategory(): void {
    const url = `https://localhost:7250/api/Contents/category/${this.categoryid}`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.contents = response;
        if (this.hideExpired) {
          this.hideExpiredContent();
        }
      },
      (error) => {
        console.error('Error retrieving content by category:', error);
      }
    );
  }

  sortContents(sortBy: string): void {
    // Sort the contents based on the specified criteria
    switch (sortBy) {
      case 'retentionPeriodAsc':
        this.contents.sort((a, b) => a.retentionPeriod.localeCompare(b.retentionPeriod));
        break;
      case 'retentionPeriodDesc':
        this.contents.sort((a, b) => b.retentionPeriod.localeCompare(a.retentionPeriod));
        break;
      case 'fileTypeAsc':
        this.contents.sort((a, b) => a.fileType.localeCompare(b.fileType));
        break;
      case 'fileTypeDesc':
        this.contents.sort((a, b) => b.fileType.localeCompare(a.fileType));
        break;
      default:
        // Default sorting: retentionPeriodAsc
        this.contents.sort((a, b) => a.retentionPeriod.localeCompare(b.retentionPeriod));
        break;
    }
  }

  hideExpiredContent(): void {
    const currentDate = new Date().toISOString().split('T')[0];
    this.contents = this.contents.filter((content) => {
      return content.retentionPeriod >= currentDate;
    });
  }

  
deleteContent(contentId: number): void {
  if (confirm('Are you sure you want to delete this content?')) {
    this.contentService.deleteContent(contentId).subscribe(
      () => {
        this.contents = this.contents.filter(content => content.contentID !== contentId);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
}

populateContent(content: Content): void {
  // Code to populate the content for editing
}
back(){
  this.router.navigate(['categories']);
}
}
