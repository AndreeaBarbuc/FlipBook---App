// this component handles the form submission for adding gallery images. 
// It initializes the form, including form controls and validation rules, and on submission, 
// it sends a POST request with the form data and image file to the API service. 
// When the operation is successful, it navigates to the gallery details page 
// for the newly added gallery image.


import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when an invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  galleryForm!: FormGroup;
  imageFile!: File;
  imageTitle = '';
  imageDesc = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  showAddContent: boolean = true;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedApiService: ApiService
  ) { }

  ngOnInit(): void {
    // Initialize the form with form controls and validation rules
    this.galleryForm = this.formBuilder.group({
      imageFile: [null, Validators.required], // Image file control
      imageTitle: [null, Validators.required], // Image title control
      imageDesc: [null, Validators.required]   // Image description control
    });
  }

  onFormSubmit(): void {
    this.isLoadingResults = true;
    const imageFile = this.galleryForm.get('imageFile');

    if (imageFile && imageFile.value && imageFile.value._files[0]) {
      // Call the API service to add the gallery with the form data and image file
      this.api.addGallery(this.galleryForm.value, imageFile.value._files[0])
        .subscribe((res: any) => {
          this.isLoadingResults = false;
          this.showAddContent = false;

          if (res.body && res.body._id) {
            // Set the shared ID (used for sharing data across components)
            this.sharedApiService.setSharedId(res.body._id);
          }

          if (res.body) {
            // Navigate to the gallery details page for the newly added gallery image
            this.router.navigate(['/gallery-details', res.body._id]);
          }
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
    }
  }
}
