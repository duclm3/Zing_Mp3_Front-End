import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongUserComponent } from './song-user.component';

describe('SongUserComponent', () => {
  let component: SongUserComponent;
  let fixture: ComponentFixture<SongUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
