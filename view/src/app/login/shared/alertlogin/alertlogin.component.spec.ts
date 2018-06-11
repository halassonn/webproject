import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertloginComponent } from './alertlogin.component';

describe('AlertloginComponent', () => {
  let component: AlertloginComponent;
  let fixture: ComponentFixture<AlertloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
