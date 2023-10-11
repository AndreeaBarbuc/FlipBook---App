import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user';
 
@Component({
 selector: 'app-user-form',
 template: `
   <form class="user-form" autocomplete="off" [formGroup]="userForm" (ngSubmit)="submitForm()">
     <div class="form-floating mb-3">
       <input class="form-control" type="text" id="name" formControlName="name" placeholder="Name" required>
       <label for="name">Name</label>
     </div>
 
     <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
       <div *ngIf="name.errors?.['required']">
         Name is required.
       </div>
       <div *ngIf="name.errors?.['minlength']">
         Name must be at least 3 characters long.
       </div>
     </div>
 
     <div class="mb-3">
       <div class="form-check">
         <input class="form-check-input" type="radio" formControlName="role" name="role" id="role-adminr" value="admin" required>
         <label class="form-check-label" for="role-admin">Admin</label>
       </div>
       <div class="form-check">
         <input class="form-check-input" type="radio" formControlName="role" name="role" id="role-agent" value="agent">
         <label class="form-check-label" for="role-agent">Agent</label>
       </div>
       <div class="form-check">
         <input class="form-check-input" type="radio" formControlName="role" name="role" id="role-user"
           value="user">
         <label class="form-check-label" for="role-user">User</label>
       </div>
     </div>
 
     <button class="btn btn-primary" type="submit" [disabled]="userForm.invalid">Add</button>
   </form>
 `,
 styles: [
   `.user-form {
     max-width: 560px;
     margin-left: auto;
     margin-right: auto;
   }`
 ]
})


export class UserFormComponent implements OnInit {
 @Input()
 initialState: BehaviorSubject<User> = new BehaviorSubject({});
 
 @Output()
 formValuesChanged = new EventEmitter<User>();
 
 @Output()
 formSubmitted = new EventEmitter<User>();
 
 userForm: FormGroup = new FormGroup({});
 
 constructor(private fb: FormBuilder) { }
 
 get name() { return this.userForm.get('name')!; }
 get role() { return this.userForm.get('role')!; }
 
 ngOnInit() {
   this.initialState.subscribe(user => {
     this.userForm = this.fb.group({
       name: [ user.name, [Validators.required] ],
       role: [ user.role, [Validators.required] ]
     });
   });
 
   this.userForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
 }
 
 submitForm() {
   this.formSubmitted.emit(this.userForm.value);
 }
}