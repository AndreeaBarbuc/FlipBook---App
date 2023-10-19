// This code defines a routing configuration for the Angular application. 
// It sets up routes that determine which component should be displayed for different URLs 
// /within the application. Each route is associated with a specific component, 
// and some routes also accept dynamic parameters (e.g., :id) for more dynamic behavior. 
// The ImageService is provided as a service available to components throughout the application.



// Import necessary modules and components from Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import the ImageService from application
import { ImageService } from './image.service';

// Import various components for routing
import { ContentsListComponent } from './contents-list/contents-list.component';
import { AddContentComponent } from './add-content/add-content.component'; 
import { EditContentComponent } from './edit-content/edit-content.component';
import { GalleryDetailsComponent } from './gallery-details/gallery-details.component';
import { GalleryComponent } from './gallery/gallery.component'; 

// Define an array of route configurations
const routes: Routes = [
  // Redirect the root URL to the 'gallery' route
  { path: '', redirectTo: '/gallery', pathMatch: 'full' },
  // Define a route for the 'gallery' component
  { path: 'gallery', component: GalleryComponent },
  // Define a route for displaying details of a gallery item with a dynamic ID
  { path: 'gallery-details/:id', component: GalleryDetailsComponent },
  // Define a route for the 'contents-list' component
  { path: 'content', component: ContentsListComponent },
  // Define a route for creating a new content
  { path: 'content/new', component: AddContentComponent }, 
  // Define a route for editing content with a dynamic ID
  { path: 'content/edit/:id', component: EditContentComponent },
];

// Create an NgModule to configure and manage routing
@NgModule({
  // Import the defined route configurations
  imports: [RouterModule.forRoot(routes)],
  // Export the RouterModule for use in the application
  exports: [RouterModule],
  // Provide the ImageService to be available to components
  providers: [ImageService],
})
export class AppRoutingModule { }

