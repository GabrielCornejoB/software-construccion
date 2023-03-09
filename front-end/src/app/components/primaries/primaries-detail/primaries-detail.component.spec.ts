import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimariesDetailComponent } from './primaries-detail.component';

describe('PrimariesDetailComponent', () => {
  let component: PrimariesDetailComponent;
  let fixture: ComponentFixture<PrimariesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimariesDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimariesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
