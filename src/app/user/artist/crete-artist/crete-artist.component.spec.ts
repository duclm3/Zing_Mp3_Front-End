import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreteArtistComponent } from './crete-artist.component';

describe('CreteArtistComponent', () => {
  let component: CreteArtistComponent;
  let fixture: ComponentFixture<CreteArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreteArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreteArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
