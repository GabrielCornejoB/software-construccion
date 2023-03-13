import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimariesUpdateComponent } from './primaries-update.component';

describe('PrimariesUpdateComponent', () => {
  let component: PrimariesUpdateComponent;
  let fixture: ComponentFixture<PrimariesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimariesUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimariesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
