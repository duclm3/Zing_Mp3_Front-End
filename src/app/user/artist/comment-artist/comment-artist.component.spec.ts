import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentArtistComponent } from './comment-artist.component';

describe('CommentArtistComponent', () => {
  let component: CommentArtistComponent;
  let fixture: ComponentFixture<CommentArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
