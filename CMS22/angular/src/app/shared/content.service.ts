import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Content } from './content.model';

@Injectable({
  providedIn: 'root'
})
export class contentService {
  private apiUrl = 'https://localhost:7250/api/Contents';
  listContent: Content[] = [];
  constructor(private http: HttpClient) {}

  // Retrieve all contents
  getAllContents() {
    return this.http.get<Content[]>(this.apiUrl)
      .pipe(
        map((response: any) => response as Content[])
      );
  }

  // Retrieve a specific content by ID
  getContentById(contentId: number): Observable<Content> {
    const url = `${this.apiUrl}/${contentId}`;
    return this.http.get<Content>(url);
  }

  // Create a new content
  createContent(content: Content): Observable<Content> {
    return this.http.post<Content>(this.apiUrl, content);
  }

  // Update an existing content
  updateContent(content: Content): Observable<Content> {
    const url = `${this.apiUrl}/${content.contentID}`;
    return this.http.put<Content>(url, content);
  }

  // Delete a content by ID
  deleteContent(contentId: number): Observable<void> {
    const url = `${this.apiUrl}/${contentId}`;
    return this.http.delete<void>(url);
  }
}
