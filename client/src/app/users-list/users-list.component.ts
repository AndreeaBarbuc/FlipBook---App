import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';
 
@Component({
 selector: 'app-users-list',
 template: `
 <ul class="nav">
 <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="users">Users</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href='contents'>Contents</a>
  </li>
</ul>
   <h2 class="text-center m-5">Users List</h2>
 
   <table class="table table-striped table-bordered">
       <thead>
           <tr>
               <th>Name</th>
               <th>Role</th>
               <th>Action</th>
           </tr>
       </thead>
 
       <tbody>
           <tr *ngFor="let user of users$ | async">
               <td>{{user.name}}</td>
               <td>{{user.role}}</td>
               <td>
                   <button class="btn btn-primary me-1" [routerLink]="['edit/', user._id]">Edit</button>
                   <button class="btn btn-danger" (click)="deleteUser(user._id || '')">Delete</button>
               </td>
           </tr>
       </tbody>
   </table>
 
   <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New User</button>
 `
})

export class UsersListComponent implements OnInit {

 users$: Observable<User[]> = new Observable();
 
 constructor(private usersService: UserService) { }
 
 ngOnInit(): void {
   this.fetchUsers();
 }
 
 deleteUser(id: string): void {
   this.usersService.deleteUser(id).subscribe({
     next: () => this.fetchUsers()
   });
 }
 
 private fetchUsers(): void {
   this.users$ = this.usersService.getUsers();
 }
}