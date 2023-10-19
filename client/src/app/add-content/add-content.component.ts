// This code defines an Angular component called AddContentComponent,
//  which is responsible for adding new content. The component includes logic to display a form 
// for adding content and also allows users to cancel the addition. 
// It communicates with a ContentService to create content by making an HTTP request. 
// If content creation is successful, it redirects to a content list page; 
// otherwise, it displays an error alert. T
// he showAddContent flag is used to control the visibility of the "Add a New Content" section.

// Import necessary modules and components from Angular
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../database/content.service';
import { Content } from '../content';

@Component({
  selector: 'app-add-content',
  template: `
  <!-- Display a new content form or a list of content -->
  <ng-container *ngIf="showAddContent; else contentList">
     <h2 class="text-center m-5">Add a New Content</h2>
     <!-- Render the content form component and listen for form submission -->
     <app-content-form (formSubmitted)="addContent($event)"></app-content-form>
     <button class="btn btn-primary mt-3" (click)="showAddContent = false">Cancel</button>   
   </ng-container>
   <ng-template #contentList>
     <!-- If not adding content, display a different component (app-page5 in this case) -->
     <app-page5></app-page5>
   </ng-template>
  `
})
export class AddContentComponent {
  constructor(
    private router: Router,
    private contentService: ContentService
  ) { }

  // Flag to control whether to show the "Add a New Content" section
  showAddContent: boolean = true;

  // Function to add new content
  addContent(content: Content) {
    // Use the ContentService to create content by making an HTTP request
    this.contentService.createContent(content)
      .subscribe({
        next: () => {
          // Redirect to the content list page after successfully creating content
          this.router.navigate(['/content']);
        },
        error: (error) => {
          // Display an alert and log the error if content creation fails
          alert("Failed to create content");
          console.error(error);
        }
      });

    // Hide the "Add a New Content" section after adding content
    this.showAddContent = false;
  }
}
