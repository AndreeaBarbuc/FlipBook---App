// This code defines an Angular component called ContentFormComponent, 
// which is responsible for rendering a form for adding content (and also in the view case of editing). 
// It features the ability to handle and emit form changes and submissions. 
// The form contains a single input field for entering text content and a submit button, 
// which is disabled when the form is invalid. The component also has a flag 
// to control the visibility of the form and initializes the form with an initial content state.



// Import necessary modules and components from Angular and other libraries
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Content } from '../content';

@Component({
  selector: 'app-content-form',
  template: `
    <!-- Display the content form if showAddContent is true, otherwise display a different component -->
    <ng-container *ngIf="showAddContent; else contentList">
      <app-page5></app-page5>
    </ng-container>

    <!-- Define the content form using a template if showAddContent is false -->
    <ng-template #contentList>
      <form class="content-form" autocomplete="off" [formGroup]="contentForm" (ngSubmit)="submitForm()">
        <!-- Create a form input field for entering text content -->
        <div class="form-floating mb-3">
          <label for="text">Text content</label>
          <input class="form-control" type="text" id="text" formControlName="text" placeholder="Text" required>
        </div>

        <!-- Add a submit button that is disabled if the form is invalid -->
        <button class="btn btn-primary" type="submit" [disabled]="contentForm.invalid">Add</button>
      </form>
    </ng-template>
  `,
  styles: [
    // Define styles for the content form
    `.content-form {
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }`
  ]
})
export class ContentFormComponent implements OnInit {
  showAddContent: boolean = false; // Flag to control the visibility of the content form

  // Input property to receive an initial content state
  @Input()
  initialState: BehaviorSubject<Content> = new BehaviorSubject({});

  // Output events to emit form changes and form submissions
  @Output()
  formValuesChanged = new EventEmitter<Content>();
  @Output()
  formSubmitted = new EventEmitter<Content>();

  contentForm: FormGroup = new FormGroup({}); // Define an empty form group

  constructor(private fb: FormBuilder) { }

  // Create a getter for the text form control
  get text() { return this.contentForm.get('text')!; }

  ngOnInit() {
    this.initialState.subscribe(content => {
      // Initialize the form with the initial content state
      this.contentForm = this.fb.group({
        text: [content.text]
      });
    });

    // Subscribe to form value changes and emit them through formValuesChanged
    this.contentForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    // Emit the form value when the form is submitted
    this.formSubmitted.emit(this.contentForm.value);
  }
}
