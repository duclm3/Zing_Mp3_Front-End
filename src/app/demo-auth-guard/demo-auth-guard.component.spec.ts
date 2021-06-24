import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAuthGuardComponent } from './demo-auth-guard.component';

describe('DemoAuthGuardComponent', () => {
  let component: DemoAuthGuardComponent;
  let fixture: ComponentFixture<DemoAuthGuardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoAuthGuardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoAuthGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
