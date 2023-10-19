// this code represent the logic component of the image switched with the video  

import { Component } from '@angular/core';

@Component({
  selector: 'app-image-video-switcher',
  templateUrl: './image-video-switcher.component.html',
  styleUrls: ['./image-video-switcher.component.css']
})
export class ImageVideoSwitcherComponent {
  showImage = true;

  toggleVideo() {
    this.showImage = false;
  }

  toggleImage() {
    this.showImage = true;
  }

}
