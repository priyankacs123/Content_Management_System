import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface content {
  contentID: number;
  title: string ;
  description: string ;
  fileType: string ;
  fileURL: string ;
  retentionPeriod: Date ;
  categoryID: number;
  categoryName: string ;
  userID: number ;
}

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent implements OnInit {
  Contents: content[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getContentsByRetentionPeriod();
  }

  getContentsByRetentionPeriod() {
    this.http.get<content[]>('https://localhost:7250/api/Contents2/RetentionPeriod')
      .subscribe(
        data => {
          this.Contents = data;
        },
        error => {
          console.log('Error fetching contents:', error);
        }
      );
  }

  edit(Contents: content) {
    // Handle the content here based on your requirements
    console.log('Handling Contents:', Contents);
  }
  delete(Contents: content) {
    // Handle the content here based on your requirements
    console.log('Handling Contents:', Contents);
  }
}