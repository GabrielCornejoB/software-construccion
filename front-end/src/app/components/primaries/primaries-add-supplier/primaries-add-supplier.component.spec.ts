import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimariesAddSupplierComponent } from './primaries-add-supplier.component';

describe('PrimariesAddSupplierComponent', () => {
  let component: PrimariesAddSupplierComponent;
  let fixture: ComponentFixture<PrimariesAddSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimariesAddSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimariesAddSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
