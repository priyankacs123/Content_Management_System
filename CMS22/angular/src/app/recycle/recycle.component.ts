import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { contentService } from '../shared/content.service';
import { Content } from '../shared/content.model';

@Component({
  selector: 'app-recycle',
  templateUrl: './recycle.component.html',
  styleUrls: ['./recycle.component.css']
})
export class RecycleComponent {
  contents: any[] = [];
  userID: number = 0;
  hideExpired:boolean = true;
  sideNavStatus: boolean = false;
  showExpiredContent: boolean = false;
  user: any;

  constructor(private http: HttpClient,private userService:UserService,private router:Router,private contentService:contentService,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user;
      console.log(this.user);
      this.userID=this.user[0].userID;
    });
    
    this.route.queryParams.subscribe(params => {
      this.userID = params['userId'];
      // Fetch and display the expired contents of this.userId
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
  }

  hideExpiredContent(): void {
    const currentDate = new Date().toISOString().split('T')[0];
    this.contents = this.contents.filter((content) => {
      return content.retentionPeriod < currentDate;
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
    this.router.navigate(['/addfiles', { id: content.contentID }]);
  }

  

}
