import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AblumComponent } from './ablum.component';

describe('AblumComponent', () => {
  let component: AblumComponent;
  let fixture: ComponentFixture<AblumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AblumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AblumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
