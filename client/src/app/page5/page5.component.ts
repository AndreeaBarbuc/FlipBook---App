import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentService } from '../database/content.service';
import { Router } from '@angular/router';
import { Content } from '../content';

@Component({
 selector: 'app-page5',
 template: `

  <ng-container *ngIf="showAddContent; else contentList">
    <app-add-content></app-add-content>
  </ng-container>

  <ng-template #contentList>

    <h2 class="text-center m-5">Contents List</h2>
   <table class="table table-striped table-bordered">
       <thead>
           <tr>               
               <th>Text Content</th>
               <th>Action</th>
           </tr>
       </thead>
 
       <tbody>
           <tr *ngFor="let content of contents$ | async">
               <td>{{content.text}}</td>
               <td>
                   <!-- <button class="btn btn-primary me-1" [routerLink]="['edit/', content._id]" (click)="showEditContent = true">Edit</button> -->
                   <!-- <button class="btn btn-primary me-1" (click)="showEditContent = true">Edit</button> -->
                   <button class="btn btn-primary me-1" (click)="content._id ? editContent(content._id) : null">Edit</button>
                   <button class="btn btn-danger" (click)="deleteContent(content._id || '')">Delete</button>
               </td>
           </tr>
       </tbody>
   </table>
 
   <!-- <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Content</button> -->
    <button class="btn btn-primary mt-3" (click)="showAddContent = true">Add a New Content</button>
  </ng-template>
 `
})

export class Page5Component implements OnInit {

  showAddContent: boolean = false;
  showEditContent: boolean = false;
  // showAddContent: boolean = true;
  contents$: Observable<Content[]> = new Observable();
  
  constructor(private contentsService: ContentService, private router: Router) { }
  
  ngOnInit(): void {
    this.fetchContents();
  }

  // editContent(contentId: string) {
  //   this.router.navigate(['edit/', contentId]);
  // }
  editContent(contentId: string) {
    this.showEditContent = true;
  }

  deleteContent(id: string): void {
    this.contentsService.deleteContent(id).subscribe({
      next: () => this.fetchContents()
    });
  }
  
  private fetchContents(): void {
    this.contents$ = this.contentsService.getContents();
  }
}