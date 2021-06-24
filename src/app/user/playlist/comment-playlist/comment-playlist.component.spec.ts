import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentPlaylistComponent } from './comment-playlist.component';

describe('CommentPlaylistComponent', () => {
  let component: CommentPlaylistComponent;
  let fixture: ComponentFixture<CommentPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
