// This code defines an Angular service named ContentService for managing content-related data. 
// It interacts with a RESTful API located at the apiUrl. The service provides methods for retrieving, 
// creating, updating, and deleting content, and it utilizes RxJS subjects for broadcasting changes 
// to subscribers. It keeps a local copy of content data within the service to efficiently 
// manage content updates and avoid unnecessary HTTP requests.


// Import necessary modules and components from Angular and other libraries
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Content } from '../content';

// Define the API URL where content-related data is served
const apiUrl = 'http://localhost:3000/content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private httpClient: HttpClient) { }

  // URL for content management
  private url = 'http://localhost:3000/content';

  // Subject for broadcasting content changes to subscribers
  private contents$: Subject<Content[]> = new Subject();

  // Helper method to refresh and update the contents list
  private refreshContents() {
    this.httpClient.get<Content[]>(`${this.url}`)
      .subscribe(contents => {
        this.contents$.next(contents);
      });
  }

  // Get a Subject containing an array of content
  getContents(): Subject<Content[]> {
    this.refreshContents(); // Refresh the contents list
    return this.contents$; // Return the Subject for subscribers to receive updates
  }

  // Get a specific content by its ID
  getContent(id: string): Observable<Content> {
    return this.httpClient.get<Content>(`${this.url}/${id}`);
  }

  // Create new content and return an Observable string response
  createContent(content: Content): Observable<string> {
    return this.httpClient.post(`${this.url}/`, content, { responseType: 'text' });
  }

  // Update an existing content by its ID and return an Observable string response
  updateContent(id: string, content: Content): Observable<string> {
    return this.httpClient.put(`${this.url}/${id}`, content, { responseType: 'text' });
  }

  // Delete a content by its ID and return an Observable string response
  deleteContent(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
