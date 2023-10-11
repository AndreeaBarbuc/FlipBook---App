import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from '../content';
import { ContentService } from '../content.service';
 
@Component({
 selector: 'app-contents-list',
 template: `
 <ul class="nav">
  <li class="nav-item">
    <a class="nav-link" href='users'>Users</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="contents">Contents</a>
  </li>
</ul>
   <h2 class="text-center m-5">Contents List</h2>
 
   <table class="table table-striped table-bordered">
       <thead>
           <tr>
               <th>Title</th>
               <th>Description</th>
               <th>Image</th>
               <th>Action</th>
           </tr>
       </thead>
 
       <tbody>
           <tr *ngFor="let content of contents$ | async">
               <td>{{content.title}}</td>
               <td>{{content.description}}</td>
               <td>
               <img [src]="content.img"/>
                {{content.img}}
               </td>
               <td>
                   <button class="btn btn-primary me-1" [routerLink]="['edit/', content._id]">Edit</button>
                   <button class="btn btn-danger" (click)="deleteContent(content._id || '')">Delete</button>
               </td>
           </tr>
       </tbody>
   </table>
 
   <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Content</button>
 `
})

export class ContentsListComponent implements OnInit {

 contents$: Observable<Content[]> = new Observable();
 
 constructor(private contentsService: ContentService) { }
 
 ngOnInit(): void {
   this.fetchContents();
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