import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Content } from '../content';
 
@Component({
 selector: 'app-content-form',
 template: `
   <form class="content-form" autocomplete="off" [formGroup]="contentForm" (ngSubmit)="submitForm()">
     <div class="form-floating mb-3">
       <input class="form-control" type="text" id="title" formControlName="title" placeholder="Title" required>
       <label for="title">Title</label>
     </div>
 
     <!-- <div *ngIf="title.invalid && (title.dirty || title.touched)" class="alert alert-danger">
       <div *ngIf="title.errors?.['required']">
         Title is required.
       </div>
       <div *ngIf="title.errors?.['minlength']">
         Title must be at least 3 characters long.
       </div>
     </div>
  -->
     <div class="form-floating mb-3">
       <input class="form-control" type="text" id="description" formControlName="description" placeholder="Description" required>
       <label for="description">Description</label>
     </div>

     <div class="form-floating">
     <!-- <div>
          <label for="image">Upload Image</label>
          <input type="file" id="image" name="image" value="" required />
        </div> -->
       <input class="form-control" type="file" id="image" formControlName="image" placeholder="Image" required>
       <label for="image">Image</label>
     </div>
 
     <button class="btn btn-primary" type="submit" [disabled]="contentForm.invalid">Add</button>
   </form>
 `,
 styles: [
   `.content-form {
     max-width: 560px;
     margin-left: auto;
     margin-right: auto;
   }`
 ]
})


export class ContentFormComponent implements OnInit {
 @Input()
 initialState: BehaviorSubject<Content> = new BehaviorSubject({});
 
 @Output()
 formValuesChanged = new EventEmitter<Content>();
 
 @Output()
 formSubmitted = new EventEmitter<Content>();
 
 contentForm: FormGroup = new FormGroup({});
 
 constructor(private fb: FormBuilder) { }
 
 get title() { return this.contentForm.get('title')!; }
 get description() { return this.contentForm.get('description')!; }
 get image() { return this.contentForm.get('image')!; }
 
 ngOnInit() {
   this.initialState.subscribe(content => {
     this.contentForm = this.fb.group({
       title: [ content.title],
       description: [ content.description],
       image: [content.img]
     });
   });
 
   this.contentForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
 }
 
 submitForm() {
   this.formSubmitted.emit(this.contentForm.value);
 }
}