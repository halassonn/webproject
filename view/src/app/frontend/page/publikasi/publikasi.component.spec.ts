import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublikasiComponent } from './publikasi.component';

describe('PublikasiComponent', () => {
  let component: PublikasiComponent;
  let fixture: ComponentFixture<PublikasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublikasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublikasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
