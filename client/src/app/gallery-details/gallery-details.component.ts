// This component is responsible for displaying the details of a gallery. 
// It retrieves the gallery details using an API call based on the 'id' route parameter 
// and sets up the 'gallery' object to hold the details. 
// The 'isLoadingResults' flag is used to indicate whether the page is still loading, 
// and the 'showAddContent' flag controls the display of an "Add Content" section,
//  which can be hidden if needed.


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Gallery } from './../gallery';

@Component({
  selector: 'app-gallery-details',
  templateUrl: './gallery-details.component.html',
  styleUrls: ['./gallery-details.component.css']
})
export class GalleryDetailsComponent implements OnInit {
  // Initialize a Gallery object to hold the gallery details
  gallery: Gallery = { _id: '', imageUrl: '', imageDesc: '', uploaded: new Date() };
  
  // A flag to indicate whether the page is still loading
  isLoadingResults = true;

  // A flag to control the display of the "Add Content" section
  showAddContent: boolean = true;

  constructor(
    private route: ActivatedRoute, // Used to retrieve route parameters
    private api: ApiService, // Provides methods for API communication
    // private sharedApiService: ApiService
  ) { }

  ngOnInit(): void {
    // Retrieve the 'id' route parameter from the URL
    const id = this.route.snapshot.paramMap.get('id');
    
    // Alternatively, you might use a shared service to get the 'id'
    // const id = this.sharedApiService.getSharedId();

    if (id !== null) {
      // If 'id' exists, load gallery details
      this.getGalleryDetails(id);
    }
  }

  // Function to retrieve and display gallery details
  getGalleryDetails(id: string): void {
    this.api.getGalleryById(id)
      .subscribe((data: any) => {
        // Assign the received gallery data to the 'gallery' object
        this.gallery = data;

        // Output the 'gallery' data to the console (for debugging)
        console.log(this.gallery);

        // The page is no longer loading
        this.isLoadingResults = false;
        
        // Optionally, you can hide the "Add Content" section
        // this.showAddContent = false;
      });
  }
}
