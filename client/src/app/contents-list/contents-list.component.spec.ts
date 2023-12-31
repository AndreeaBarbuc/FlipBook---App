import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsListComponent } from './contents-list.component';

describe('ContentsListComponent', () => {
  let component: ContentsListComponent;
  let fixture: ComponentFixture<ContentsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentsListComponent]
    });
    fixture = TestBed.createComponent(ContentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
