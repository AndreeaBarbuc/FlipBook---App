import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Content } from '../content';
import { ContentService } from '../content.service';
 
@Component({
 selector: 'app-add-content',
 template: `
   <h2 class="text-center m-5">Add a New Content</h2>
   <app-content-form (formSubmitted)="addContent($event)"></app-content-form>
 `
})
export class AddContentComponent {
 constructor(
   private router: Router,
   private contentService: ContentService
 ) { }
 
 addContent(content: Content) {
   this.contentService.createContent(content)
     .subscribe({
       next: () => {
         this.router.navigate(['/contents']);
       },
       error: (error) => {
         alert("Failed to create content");
         console.error(error);
       }
     });
 }
}