// Image service for manipulating the images and texts in a static way, 
//by declaring them in an array here and sending and accessing the data through index array

import { Injectable } from '@angular/core'; // Import the Injectable decorator from Angular core
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module for making HTTP requests

@Injectable({
  providedIn: 'root' // Specify that this service should be available at the root level
})
export class ImageService {
  private apiUrl = 'http://localhost:3000'; // Define the backend API URL

  constructor(private http: HttpClient) { } // Inject the HttpClient service into the constructor

  private images: string[] = [ // Define an array of image URLs
    'assets/images/9.jpg',
    'assets/images/10.jpg',
    'assets/images/11.jpg',
    'assets/images/12.jpg',
    'assets/images/13.jpg',
    'assets/images/14.jpg'
  ];

  private texts: string[] = [ // Define an array of texts
    'assets/images/9.jpg',
    'Have a',
    'WONderFUL',
    'assets/images/12.jpg',
    'DAY',
    'assets/images/14.jpg'
  ];

  getImages(): string[] { // Define a method to retrieve the image URLs
    return this.images; // Return the array of image URLs
  }

  getTexts(): string[] { // Define a method to retrieve the texts
    return this.texts; // Return the array of texts
  }

  getPhotos() { // Define a method to retrieve photos from the backend
    return this.http.get<any[]>(`${this.apiUrl}`); // Use HttpClient to make a GET request to the backend API
  }
}

