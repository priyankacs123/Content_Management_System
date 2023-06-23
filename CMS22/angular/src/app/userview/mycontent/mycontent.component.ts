import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Content } from 'src/app/shared/content.model';
import { contentService } from 'src/app/shared/content.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mycontent',
  templateUrl: './mycontent.component.html',
  styleUrls: ['./mycontent.component.css']
})
export class MycontentComponent implements OnInit {
  contents: any[] = [];
  userID: number = 0;
  hideExpired: boolean = false;
  sideNavStatus: boolean = false;
  showExpiredContent: boolean = false;
  toastr: any;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private contentService: contentService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  isDisabled: boolean = true;
  user: any;

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user;
      console.log(this.user);
      this.userID = this.user[0].userID;
      this.getContentByUser();
    });

    this.route.queryParams.subscribe(params => {
      const userId = params['userId'];
      if (userId) {
        this.userID = +userId; // Convert the userId to a number if necessary
        this.getContentByUser();
      }
    });

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
    this.getContentByUser();
  }

  toggleExpiredContent(): void {
    this.showExpiredContent = !this.showExpiredContent;
    if (this.showExpiredContent) {
      this.showAllContent();
    } 
  }

  showAllContent(): void {
    const url = `https://localhost:7250/api/Contents/user/${this.user[0].userID}/expired`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.contents = response;
      },
      (error) => {
        console.error('Error retrieving expired content:', error);
      }
    );
  }

  getContentByUser(): void {
    const url = `https://localhost:7250/api/Contents/user/${this.user[0].userID}`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.contents = response;
        if (this.hideExpired) {
          this.hideExpiredContent();
        }
      },
      (error) => {
        console.error('Error retrieving content by user:', error);
      }
    );
    this.showExpiredContent = false;
    this.hideExpired = false;
  }

  sortContents(sortBy: string): void {
    // Sort the contents based on the specified criteria
    switch (sortBy) {
      case 'retentionPeriodAsc':
        this.contents.sort((a, b) =>
          a.retentionPeriod.localeCompare(b.retentionPeriod)
        );
        break;
      case 'retentionPeriodDesc':
        this.contents.sort((a, b) =>
          b.retentionPeriod.localeCompare(a.retentionPeriod)
        );
        break;
      case 'fileTypeAsc':
        this.contents.sort((a, b) => a.fileType.localeCompare(b.fileType));
        break;
      case 'fileTypeDesc':
        this.contents.sort((a, b) => b.fileType.localeCompare(a.fileType));
        break;
      default:
        // Default sorting: retentionPeriodAsc
        this.contents.sort((a, b) =>
          a.retentionPeriod.localeCompare(b.retentionPeriod)
        );
        break;
    }
  }

  openRecycleBin(): void {
    this.hideExpired=false;
    const userID = this.user[0].userID;
    this.router.navigate(['/recycle'], { queryParams: { userID: userID } });
  }
  
 
  

  hideExpiredContent(): void {
    this.hideExpired=false;
    const currentDate = new Date().toISOString().split('T')[0];
    this.contents = this.contents.filter((content) => {
      return content.retentionPeriod >= currentDate;
    });
  }

  deleteContent(contentId: number): void {
    if (confirm('Are you sure you want to delete this content?')) {
      this.contentService.deleteContent(contentId).subscribe(
        () => {
          this.contents = this.contents.filter(
            (content) => content.contentID !== contentId
          );
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    }
  }

  populateContent(content: Content): void {
    this.router.navigate(['/addfiles', { id: content.contentID }]);
  }
}
