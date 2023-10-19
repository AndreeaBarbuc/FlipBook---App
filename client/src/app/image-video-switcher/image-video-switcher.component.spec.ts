import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageVideoSwitcherComponent } from './image-video-switcher.component';

describe('ImageVideoSwitcherComponent', () => {
  let component: ImageVideoSwitcherComponent;
  let fixture: ComponentFixture<ImageVideoSwitcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageVideoSwitcherComponent]
    });
    fixture = TestBed.createComponent(ImageVideoSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
