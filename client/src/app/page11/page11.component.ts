import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page11',
  templateUrl: './page11.component.html',
  styleUrls: ['./page11.component.css']
})
export class Page11Component implements OnInit {
  images: string[] = [];
  texts: string[] = [];
  showAddContent: boolean = false;
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.images = this.imageService.getImages();
    this.texts = this.imageService.getTexts();
  }
}
