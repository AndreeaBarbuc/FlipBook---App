//  Angular logic component where client can upload texts and images
          // in a static way and also to upload image in a dynamic way
        // P.S. WORK IN PROGRESS -> IT IS USED THE ROUTER HERE 

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from '../database/content';
import { ContentService } from '../database/content.service';
import { Router } from '@angular/router';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
  // styleUrls: ['./page2.component.css']
})

export class Page2Component implements OnInit {

  showAddContent: boolean = false;
  showEditContent: boolean = false;
  // showAddContent: boolean = true;
  contents$: Observable<Content[]> = new Observable();
  
  constructor(private contentsService: ContentService, private router: Router, private imageService: ImageService) { }
  images: string[] = [];
  texts: string[] = [];
  
  ngOnInit(): void {
    this.fetchContents();
    this.contents$ = this.contentsService.getContents();
    this.images = this.imageService.getImages();
    this.texts = this.imageService.getTexts();
  }

  // editContent(contentId: string) {
  //   this.router.navigate(['edit/', contentId]);
  // }
  editContent(contentId: string) {
    this.showEditContent = true;
  }

  deleteContent(id: string): void {
    this.contentsService.deleteContent(id).subscribe({
      next: () => this.fetchContents()
    });
  }
  
  private fetchContents(): void {
    this.contents$ = this.contentsService.getContents();
  }
}