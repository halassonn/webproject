import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorprodukComponent } from './simulatorproduk.component';

describe('SimulatorprodukComponent', () => {
  let component: SimulatorprodukComponent;
  let fixture: ComponentFixture<SimulatorprodukComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulatorprodukComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorprodukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
