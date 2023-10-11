import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { UsersListComponent } from './users-list/users-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ContentsListComponent } from './contents-list/contents-list.component';
import { ContentFormComponent } from './content-form/content-form.component';
import { AddContentComponent } from './add-content/add-content.component';
import { EditContentComponent } from './edit-content/edit-content.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserFormComponent,
    AddUserComponent,
    EditUserComponent,
    ContentsListComponent,
    ContentFormComponent,
    AddContentComponent,
    EditContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
