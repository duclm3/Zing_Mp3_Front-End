import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenMusicComponent } from './listen-music.component';

describe('ListenMusicComponent', () => {
  let component: ListenMusicComponent;
  let fixture: ComponentFixture<ListenMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListenMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
