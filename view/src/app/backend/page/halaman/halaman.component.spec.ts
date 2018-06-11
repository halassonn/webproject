import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HalamanComponent } from './halaman.component';

describe('HalamanComponent', () => {
  let component: HalamanComponent;
  let fixture: ComponentFixture<HalamanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HalamanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HalamanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
