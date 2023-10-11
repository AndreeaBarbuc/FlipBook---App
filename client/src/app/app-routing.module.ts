import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component'; 
import { EditUserComponent } from './edit-user/edit-user.component'; 
import { ContentsListComponent } from './contents-list/contents-list.component';
import { AddContentComponent } from './add-content/add-content.component'; 
import { EditContentComponent } from './edit-content/edit-content.component'; 

const routes: Routes = [
 { path: '', redirectTo: 'contents', pathMatch: 'full' },
 { path: 'users', component: UsersListComponent },
 { path: 'users/new', component: AddUserComponent }, 
 { path: 'users/edit/:id', component: EditUserComponent },
 { path: 'contents', component: ContentsListComponent },
 { path: 'contents/new', component: AddContentComponent }, 
 { path: 'contents/edit/:id', component: EditContentComponent }
];
 
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }