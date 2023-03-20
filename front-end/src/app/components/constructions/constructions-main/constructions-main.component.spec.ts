import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionsMainComponent } from './constructions-main.component';

describe('ConstructionsMainComponent', () => {
  let component: ConstructionsMainComponent;
  let fixture: ComponentFixture<ConstructionsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructionsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructionsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
