import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuicklinkComponent } from './quicklink.component';

describe('QuicklinkComponent', () => {
  let component: QuicklinkComponent;
  let fixture: ComponentFixture<QuicklinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuicklinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuicklinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
