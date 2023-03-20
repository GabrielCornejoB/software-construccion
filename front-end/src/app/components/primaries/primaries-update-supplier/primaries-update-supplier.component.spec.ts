import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimariesUpdateSupplierComponent } from './primaries-update-supplier.component';

describe('PrimariesUpdateSupplierComponent', () => {
  let component: PrimariesUpdateSupplierComponent;
  let fixture: ComponentFixture<PrimariesUpdateSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimariesUpdateSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimariesUpdateSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
