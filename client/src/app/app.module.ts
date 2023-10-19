//This code defines the Angular application module (AppModule) and 
//provides a list of components, modules, and services that are used in the application.

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import { ImageVideoSwitcherComponent } from './image-video-switcher/image-video-switcher.component';
import { Page10Component } from './page10/page10.component';
import { Page11Component } from './page11/page11.component';
import { Page5Component } from './page5/page5.component';
import { AddContentComponent } from './add-content/add-content.component';
import { ContentFormComponent } from './content-form/content-form.component';
import { ContentsListComponent } from './contents-list/contents-list.component';
import { EditContentComponent } from './edit-content/edit-content.component';
import { Page2Component } from './page2/page2.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryDetailsComponent } from './gallery-details/gallery-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    ImageVideoSwitcherComponent,
    Page10Component,
    Page11Component,
    Page5Component,
    AddContentComponent,
    ContentFormComponent,
    ContentsListComponent,
    EditContentComponent,
    Page2Component,
    GalleryComponent,
    GalleryDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MaterialFileInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



