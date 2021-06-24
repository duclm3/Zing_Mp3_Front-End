import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourPlaylistComponent } from './your-playlist.component';

describe('YourPlaylistComponent', () => {
  let component: YourPlaylistComponent;
  let fixture: ComponentFixture<YourPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
