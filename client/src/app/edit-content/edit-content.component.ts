import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Content } from '../database/content';
import { ContentService } from '../database/content.service';

@Component({
  selector: 'app-edit-content.component.ts',
  template: `
  <div *ngIf="showEditContent">
  <h2 class="text-center m-5">Edit a Content</h2>
   <app-content-form [initialState]="content" (formSubmitted)="editContent($event)" (cancel)="showEditContent = false"></app-content-form>
  </div>
 `
})

export class EditContentComponent implements OnInit {

  showEditContent: boolean = true;

  content: BehaviorSubject<Content> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contentService: ContentService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.contentService.getContent(id!).subscribe((content) => {
      this.content.next(content);
    });
  }


  editContent(content: Content) {
    this.contentService.updateContent(this.content.value._id || '', content)
      .subscribe({
        next: () => {
          this.router.navigate(['/contents']);
        },
        error: (error) => {
          alert('Failed to update content');
          console.error(error);
        }
      })
    this.showEditContent = false;
  }
}
