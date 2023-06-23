import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Category, Content } from '../shared/content.model';

import { contentService } from '../shared/content.service';

import { Router, ActivatedRoute } from '@angular/router';

import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/shared/user.service';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';




@Component({

  selector: 'app-addfile',

  templateUrl: './addfile.component.html',

  styleUrls: ['./addfile.component.css']

})

export class AddfileComponent implements OnInit, AfterViewInit {

  contents: Content[] | undefined;

  categorylist: Category[] = [];

  contentData: Content = new Content();

  sideNavStatus: boolean = false;

  hideUserID: boolean = true;




  userID: number = 0;

  editMode: boolean = false; // Add an edit mode flag

  contentId: number = 0; // Add a content ID for editing




  user: any;

  userI!: number;




  constructor(

    public contentService: contentService,

    private router: Router,

    private toastr: ToastrService,

    private userService: UserService,

    private route: ActivatedRoute,

    private sanitizer: DomSanitizer // Inject DomSanitizer module

  ) {}




  ngOnInit(): void {

    console.log('inside init');

    this.route.params.subscribe((params) => {

      this.userService.user$.subscribe((user) => {

        this.user = user;

      });

      const storedUser = localStorage.getItem('user');

      if (storedUser) {

        this.user = JSON.parse(storedUser);

        console.log(this.userI);

      }




      this.contentId = +params['id']; // Retrieve the content ID from the route parameters

      this.editMode = params['id'] != null; // Set the edit mode based on whether a content ID is present

      if (this.editMode) {

        // Fetch the existing content for editing

        this.contentService.getContentById(this.contentId).subscribe(

          (response) => {

            this.contentData = response;

          },

          (error) => {

            // Handle error response

            this.toastr.error('Failed to fetch content', 'Error');

          }

        );

      }

    });

  }




  ngAfterViewInit(): void {

    console.log('inside after init');

    const userIt: number = this.user[0].userID;

    console.log(this.userI);

  }




  submit(form: NgForm) {

    if (form.valid) {

      // Extract file type from the file URL

      const fileExtension = this.getFileExtension(this.contentData.fileURL);




      // Update the contentData file type

      this.contentData.fileType = fileExtension;




      if (this.editMode) {

        this.contentData.category = ' ';

        console.log('ContentData before update:', this.contentData);

        // If in edit mode, update the existing content using the PUT method

        this.contentService.updateContent(this.contentData).subscribe(

          (response) => {

            // Handle success response

            this.toastr.success('Content updated successfully', 'Success');

            console.log('ContentData after update:', this.contentData);

            form.reset();

            this.router.navigate(['/mycontent']);

          },

          (error) => {

            // Handle error response

            this.toastr.error('Failed to update content', 'Error');

          }

        );

      } else {

        this.contentData.userID = this.user[0].userID;

        // If not in edit mode, create a new content using the POST method

        this.contentService.createContent(this.contentData).subscribe(

          (response) => {

            // Handle success response

            this.toastr.success('Content created successfully', 'Success');

            form.reset();

            this.router.navigate(['/mycontent']);

          },

          (error) => {

            // Handle error response

            this.toastr.error('Failed to create content', 'Error');

          }

        );

      }

    }

  }




  getFileExtension(fileURL: string): string {

    // Extract file extension from the file URL

    const parts = fileURL.split('.');

    const fileExtension = parts[parts.length - 1].toLowerCase();

    return fileExtension;

  }

}