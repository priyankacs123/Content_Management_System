import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cat3',
  templateUrl: './cat3.component.html',
  styleUrls: ['./cat3.component.css']
})
export class Cat3Component implements OnInit {
  contents: any[] = [];
  categoryID: number = 3;
  hideExpired: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
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
}

