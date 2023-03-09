import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimariesMainComponent } from './primaries-main.component';

describe('PrimariesMainComponent', () => {
  let component: PrimariesMainComponent;
  let fixture: ComponentFixture<PrimariesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimariesMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimariesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
