import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimariesCreateComponent } from './primaries-create.component';

describe('PrimariesCreateComponent', () => {
  let component: PrimariesCreateComponent;
  let fixture: ComponentFixture<PrimariesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimariesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimariesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
