import { Component, OnInit } from '@angular/core';
import { Comment } from './comment.model';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  comment: Comment = {
    id: 0,
    name: '',
    email: '',
    content: ''
  };

  comments: Comment[] = [];

  constructor() { }

  ngOnInit() {
    this.loadComments();
  }

  submitComment() {
    // Assign a unique ID to the comment
    this.comment.id = this.generateUniqueId();

    // Add the comment to the comments array
    this.comments.push(this.comment);

    // Save the comments to local storage
    this.saveComments();

    // Reset the form
    this.comment = {
      id: 0,
      name: '',
      email: '',
      content: ''
    };
  }

  generateUniqueId(): number {
    // Generate a unique ID using the current timestamp
    return Date.now();
  }

  saveComments() {
    // Save the comments array to local storage
    localStorage.setItem('comments', JSON.stringify(this.comments));
  }

  loadComments() {
    // Load the comments array from local storage
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      this.comments = JSON.parse(storedComments);
    }
  }
  deleteComment(comment: Comment) {
    const index = this.comments.indexOf(comment);
    if (index !== -1) {
      this.comments.splice(index, 1);
    }
  }
  handleFileInput(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.comment.file = file;
      this.comment.fileURL = URL.createObjectURL(file);
    }
  }
}

