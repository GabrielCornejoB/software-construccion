import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubproductsMainComponent } from './subproducts-main.component';

describe('SubproductsMainComponent', () => {
  let component: SubproductsMainComponent;
  let fixture: ComponentFixture<SubproductsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubproductsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubproductsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
