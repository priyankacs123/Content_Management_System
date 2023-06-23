import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Content } from 'src/app/shared/content.model';
import { contentService } from 'src/app/shared/content.service';

@Component({
  selector: 'app-usercrud',
  templateUrl: './usercrud.component.html',
  styleUrls: ['./usercrud.component.css']
})
export class UsercrudComponent implements OnInit {
  contents: any[] = [];
  categoryID: number = 0;
  hideExpired: boolean = true;
  sideNavStatus: boolean = false;
  searchText: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private contentService: contentService
  ) {}

  ngOnInit() {
    this.getAllContents();
  }

  getContentByCategory(): void {
    const url = `https://localhost:7250/api/Contents/category/${this.categoryID}`;

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

  getAllContents() {
    this.contentService.getAllContents()
      .subscribe((response: Content[]) => {
        this.contents = response;
      });
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

  
 

  searchContent(): void {
    // Filter the contents based on the search text
    const searchText = this.searchText.toLowerCase().trim();
    this.contents = this.contents.filter((content) => {
      return (
        content.title.toLowerCase().includes(searchText) 
        // ||
        // content.description.toLowerCase().includes(searchText) ||
        // content.fileType.toLowerCase().includes(searchText)
      );
    });
  }

  handleKeyDown(event: KeyboardEvent): void {
    // Check if the pressed key is backspace (keyCode 8)
    if (event.keyCode === 8) {
      this.getContentByCategory(); // Refresh the content list
    }
  }
}
