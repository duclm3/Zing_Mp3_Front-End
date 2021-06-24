import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreandingSongsComponent } from './treanding-songs.component';

describe('TreandingSongsComponent', () => {
  let component: TreandingSongsComponent;
  let fixture: ComponentFixture<TreandingSongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreandingSongsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreandingSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
